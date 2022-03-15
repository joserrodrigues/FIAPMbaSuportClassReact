
const Toys = require('../Models/Toys');
const { validationResult } = require('express-validator');

exports.getAllToys = (req, res, next) => {
    console.log("Getting All Toys");

    let totalItems = 0;
    Toys.find().countDocuments()
    .then(count => {
        totalItems = count;
        return Toys.find()
    })
    .then(toys => {
        res.status(200).json({
            totalItems: totalItems,
            toys: toys
        });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        throw err;
    });    
}


exports.getToys = (req, res, next) => {
    console.log("Getting Toys");

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
    let search = req.query.search || '';

    let regex = new RegExp(search, 'i');
    let totalItems;
    let loadProducts = [];
    const userID = req.userID;

    Toys.find({ $or: [{ name: regex }] }).countDocuments()
        .then(count => {
            totalItems = count;
            return Toys.find({ $or: [{ name: regex }] })
                .sort([[orderBy, orderDirection]])
                .skip((currentPage - 1) * perPage)
                .limit(perPage)
        })
        .then(toys => {
            res.status(200).json({
                totalItems: totalItems,
                page: currentPage,
                perPage: perPage,
                toys: toys
            });            
        })        
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            throw err;
        });
}


exports.getToy = (req, res, next) => {
    console.log("Getting Toy");
    const toyID = req.params.toyID;

    Toys.findById(toyID)
        .then(toy => {

            if (!toy){
                res.status(423).json({
                    message: "Toy Not Found",
                });
                return;
            }
            res.status(200).json({
                toy
            });
        })        
        .catch(err => {
            console.log(err);
        });
}

exports.addToy = (req, res, next) => {
    console.log("Adding Toy");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: 'Validation failed',
            errors: errors.array()
        })
    }

    const name = req.body.name;
    const mainImage = req.body.mainImage;
    const detailImage1 = req.body.detailImage1;
    const detailImage2 = req.body.detailImage2;
    const conditionType = req.body.conditionType;
    const code = req.body.code;
    const receiveDate = req.body.receiveDate;
    const receiveResponsable = req.body.receiveResponsable;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    const status = req.body.status;

    const toy = new Toys({
        name, mainImage, detailImage1, detailImage2, conditionType, code,
        receiveDate, receiveResponsable, latitude, longitude, status
    })

    toy.save().then(result => {
        console.log(result);
        res.status(200).json({
            codeInfo: {
                id: 1,
                message: "Toy create successfull",
            },
            toy: toy
        });
    })
    .catch(err => {
        console.log(err);
    })
}

exports.updateToy = (req, res, next) => {
    console.log("Updating toy");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: 'Validation failed',
            errors: errors.array()
        })
    }

    const toyID = req.body.toyID;
    const name = req.body.name;
    const mainImage = req.body.mainImage;
    const detailImage1 = req.body.detailImage1;
    const detailImage2 = req.body.detailImage2;
    const conditionType = req.body.conditionType;
    const code = req.body.code;
    const receiveDate = req.body.receiveDate;
    const receiveResponsable = req.body.receiveResponsable;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    const status = req.body.status;

    Toys.findById(toyID)
        .then(toy => {
            if (!toy) {
                return res.status(423).json({
                    message: 'Toy not found'
                });
            } else {
                toy.name = name;
                toy.mainImage = mainImage;
                toy.detailImage1 = detailImage1;
                toy.detailImage2 = detailImage2;
                toy.conditionType = conditionType;
                toy.code = code;
                toy.receiveDate = receiveDate;
                toy.receiveResponsable = receiveResponsable;
                toy.latitude = latitude;
                toy.longitude = longitude;
                toy.status = status;
                updatedToy = toy;
                return toy.save();
            }
        })
        .then(result => {
            res.status(200).json({
                codeInfo: {
                    id: 1,
                    message: "Person changed successfull",
                },
                toy: updatedToy
            });
        })
        .catch(err => {
            console.log(err);
        });
}

exports.deleteToy = (req, res, next) => {

    console.log("Deleting person");
    const toyID = req.params.toyID;
    Toys.findByIdAndRemove(toyID)
        .then(result => {
            console.log('DESTROYED Toy');
            res.status(200).json({
                info: {
                    code: 1,
                    message: "Remove Successfully"
                }
            });
        })
        .catch(err => {
            console.log(err);
        });
}

exports.updateStatusToy = (req, res, next) => {
    console.log("Updating toy");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: 'Validation failed',
            errors: errors.array()
        })
    }

    const toyID = req.params.toyID;
    const status = req.body.status;

    Toys.findById(toyID)
        .then(toy => {
            if (!toy) {
                return res.status(423).json({
                    message: 'Toy not found'
                });
            } else {
                toy.status = status;
                updatedToy = toy;
                return toy.save();
            }
        })
        .then(result => {
            res.status(200).json({
                codeInfo: {
                    id: 1,
                    message: "Person changed successfull",
                },
                toy: updatedToy
            });
        })
        .catch(err => {
            console.log(err);
        });
}