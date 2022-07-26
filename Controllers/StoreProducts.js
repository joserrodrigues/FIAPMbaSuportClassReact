const User = require('../Models/StoreUsers');
const Products = require('../Models/StoreProducts');
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
    const phone = req.body.phone;
    bcrypt.hash(password, 12)
        .then(hashedPw => {
            const user = new User({
                email: email,
                name: name,
                phone: phone,
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
    let newToken;

    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                res.status(201).json({
                    message: "User Not Found",
                });
                console.log("send Message");
                return;
            } else {
                loadedUser = user;
                return bcrypt.compare(password, user.password);
            }
        })
        .then(isEqual => {
            if(isEqual === undefined){
                return;
            }
            console.log("Check Equal");
            if (!isEqual) {
                res.status(201).json({
                    message: "User Not Found",
                });
                return;
            }

            newToken = jwt.sign({
                email: loadedUser.email,
                userID: loadedUser._id.toString()
            },
                'dso8icujikl12j3kl134das',
                { expiresIn: '1h' });

            loadedUser.token = newToken;
            return loadedUser.save();
        })                
        .then(isEqual => {           
            if (isEqual === undefined) {
                return;
            }             
            res.status(200).json({
                token: newToken,
                userId: loadedUser._id.toString(),
                name: loadedUser.name,
                phone: loadedUser.phone
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            throw err;
        })
}

exports.getProducts = (req, res, next) => {
    console.log("Getting products");

    let currentPage = req.query.page || 1;
    if (currentPage <= 0) {
        currentPage = 1;
    }
    let perPage = req.query.perPage || 5;
    if (perPage <= 0) {
        perPage = 1;
    }

    let orderBy = req.query.orderBy || 'name';
    let orderDirection = req.query.orderDirection || 'asc';
    if(orderBy.toLowerCase() === "undefined"){
        orderBy = "name"
    }
    if (
      orderDirection.toLowerCase() !== "asc" &&
      orderDirection.toLowerCase() !== "desc"
    ) {
      orderDirection = "asc";
    }
    let search = req.query.search || '';

    let regex = new RegExp(search, 'i');
    let totalItems;
    let loadProducts = [];
    const userID = req.userID;

    Products.find({ $or: [{ name: regex }] }).countDocuments()
        .then(count => {
            totalItems = count;
            return Products.find({ $or: [{ name: regex }] })
                .select(['name', 'price'])
                .sort([[orderBy, orderDirection]])
                .skip((currentPage - 1) * perPage)
                .limit(perPage)
        })
        .then(products => {
            loadProducts = products;
            return User.findOne({ _id: userID })
        })
        .then(user => {
            if (!user) {
                res.status(201).json({
                    message: "User Not Found",
                });
                return;
            }
            let newProducts = [];
            loadProducts.forEach(info => {

                let isFavorite = false;
                if (user.favProducts.indexOf(info._id) !== -1){
                    isFavorite = true;
                }
                
                
                let newProductInfo = { ...info };
                console.log(info);
                console.log(newProductInfo._doc);
                newProductInfo._doc.favorite = isFavorite;
                newProducts.push(newProductInfo._doc);
                // console.log(newProductInfo);
            });
            res.status(200).json({
                totalItems: totalItems,
                page: currentPage,
                perPage: perPage,
                products: newProducts
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            throw err;
        });
}

exports.getProduct = (req, res, next) => {
    console.log("Getting product");
    const productID = req.params.productID;
    const userID = req.userID;
    let findProduct = null;

    Products.findById(productID)
        .then(product => {
            if(!product){
                res.status(202).json({
                    message: "Product Not Found",
                });
                return;
            }
            findProduct = product
            return User.findOne({ _id: userID })
        })
        .then(user => {
            if (user === undefined) {
                return;
            } 
            if (!user) {
                res.status(201).json({
                    message: "User Not Found",
                });
                return;
            }       

            let newProductInfo = { ...findProduct };    

            let isFavorite = false;
            if (user.favProducts.indexOf(findProduct._id) !== -1) {
                isFavorite = true;
            }        
            newProductInfo._doc.favorite = isFavorite;    

            res.status(200).json({
                product: newProductInfo._doc
            });
        })
        .catch(err => {
            console.log(err);
        });
}

exports.manageFavorite = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }

    console.log("Getting product");
    const productID = req.body.productID;
    const userID = req.userID;
    let product;

    Products.findOne({ _id: productID })
        .then(productDoc => {
            if (!productDoc) {
                res.status(202).json({
                    message: "Product Not Found",
                });
                return;
            }
            product = productDoc;
            return User.findOne({ _id: userID })
        })    
        .then(user => {
            if (user === undefined) {
                return;
            } 
            if (!user) {
                res.status(201).json({
                    message: "User Not Found",
                });
                return;
            }
            loadedUser = user;

            let newArray = [];
            if (user.favProducts.includes(productID)){
                newArray = user.favProducts.filter(e =>{                    

                    if (e.toString() !== productID){
                        return true;
                    }
                    return false;
                })
            } else {
                newArray = [... user.favProducts];
                newArray.push(product);
            }

            user.favProducts = newArray;
            return user.save();
        })
        .then(result => {
            if (result === undefined) {
                return;
            } 
            if(result){
                res.status(200).json({
                    message: "User updated",
                });
            } else {
                res.status(201).json({
                    message: "User updated error",
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

exports.getFavProducts = (req, res, next) => {
    console.log("Getting product");
    
    const userID = req.userID;

    User.findOne({ _id: userID })
        .populate('favProducts')
        .select(['name', 'price'])
        .then(user => {
            if (!user) {
                res.status(201).json({
                    message: "User Not Found",
                });
                return;
            }

            res.status(200).json({
                products: user.favProducts,
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            throw err;
        })   
}

