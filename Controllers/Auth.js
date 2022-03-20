const User = require('../Models/User');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signUp = (req, res, next) => {
    console.log("User SignUp");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed');
        error.statusCode = 422;
        error.data = errors.array();
        console.log(errors.array());
        throw error;
    }

    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    bcrypt.hash(password, 12)
        .then(hashedPw => {
            const user = new User({
                email: email,
                name: name,
                password: hashedPw
            });
            return user.save();
        })
        .then(result => {
            res.status(200).json({
                message: "User created successfully",
                userId: result._id
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            throw err;
        })
}

exports.login = (req, res, next) => {
    console.log("Login User");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }

    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    User.findOne({ email: email })
        .then(user => {
            if (user) {
                loadedUser = user;
                return bcrypt.compare(password, user.password);
            } else {
                loadedUser = null;
                return false;
            }
        })
        .then(isEqual => {
            if(!loadedUser){
                res.status(401).json({
                    message: 'User Not Found'
                });   
            } else if (!isEqual) {
                res.status(401).json({
                    message: 'Wrong Password'
                });                   
            } else {
                const token = jwt.sign({
                    email: loadedUser.email,
                    id: loadedUser._id.toString()
                },
                    'dso8icujikl12j3kl134das',
                    { expiresIn: '1h' });
                res.status(200).json({
                    token: token,
                    userId: loadedUser._id.toString()
                });
            }            
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            throw err;
        })
}

exports.loginGoogle = (req, res, next) => {
    console.log("Login Google User");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }

    const name = req.body.name;
    const email = req.body.email;
    const idGoogle = req.body.idGoogle;
    let loadedUser;
    let hashedPassword; 

    bcrypt.hash(idGoogle, 12)
        .then(hashedPw => {
            hashedPassword = hashedPw;
            return User.findOne({ email: email });
        })
        .then(user => {
            if (user) {
                return user;
            } else {
                const user = new User({
                    email: email,
                    name: name,
                    password: hashedPassword
                });
                return user.save();
            }
        })
        .then(user => {
            if(!user){
                loadedUser = null;
                return false;
            } else {
                loadedUser = user;
                return bcrypt.compare(idGoogle, user.password);            
            }            
        })        
        .then(isEqual => {
            if (!loadedUser) {
                res.status(401).json({
                    message: 'Error generating User'
                });
            } else if (!isEqual) {
                res.status(401).json({
                    message: 'Wrong Email and Google ID'
                });
            } else {
                const token = jwt.sign({
                    email: loadedUser.email,
                    id: loadedUser._id.toString()
                },
                    'dso8icujikl12j3kl134das',
                    { expiresIn: '1h' });
                res.status(200).json({
                    token: token,
                    userId: loadedUser._id.toString()
                });
            }
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            throw err;
        })
}