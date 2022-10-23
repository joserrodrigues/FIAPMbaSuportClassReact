
const Persons = require('../Models/SimplePersons');

const { validationResult } = require('express-validator');


exports.getPersons = (req, res, next) => {
    const faker = require('faker-br');
    console.log("aQUI");

    console.log("Getting product");
    let persons = [];

    for (let ind = 0; ind < 100; ind++){
        persons.push({
            _id: ind,
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            jobTitle: faker.name.jobTitle(),
            CPF: faker.br.cpf(),
            image: "https://random.imagecdn.app/500/200",
        })
    }

    res.status(200).json({
        persons: persons
    })
}

exports.getAllPersons = (req, res, next) => {
    console.log("Getting products");

    let currentPage = req.query.page || 1;
    if(currentPage <= 0){
        currentPage = 1;
    }
    let perPage = req.query.perPage || 5;
    if (perPage <= 0) {
        perPage = 1;
    }    

    let orderBy = req.query.orderBy || 'lastName';
    let orderDirection = req.query.orderDirection || 'asc';
    let search = req.query.search || '';

    let regex = new RegExp(search, 'i');
    let totalItems;

    Persons.find({ $or: [{ firstName: regex }, { lastName: regex }] }).countDocuments()
    .then(count => {
        totalItems = count;
        return Persons.find({ $or: [{ firstName: regex }, { lastName: regex }] })
            .sort([[orderBy, orderDirection]])
            .skip((currentPage - 1) * perPage)
            .limit(perPage)
    })
    .then(persons => {
        res.status(200).json({
            totalItems: totalItems,
            page: currentPage,
            perPage: perPage,
            persons: persons
        });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        throw err;
    });
}
exports.getPerson = (req, res, next) => {
    const personID = req.params.personID;
    console.log("Getting product" + personID);
    Persons.findById(personID)
    .then(person => {
        res.status(200).json({
            person: person
        });
    })
    .catch(err => {
        console.log(err);
    });    
}
exports.addPerson = (req, res, next) => {
    console.log("Adding Person");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: 'Validation failed',
            errors: errors.array()
        })
    }

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const CPF = req.body.CPF;
    const jobTitle = req.body.jobTitle;    
    const person = new Persons({
      firstName,
      lastName,
      CPF,
      jobTitle,
      image: "https://random.imagecdn.app/500/200",
    });

    person.save().then(result => {
        console.log(result);
        res.status(200).json({
            codeInfo: {
                id: 1,
                message: "Person create successfull",
            },
            person: person
        });
    })
    .catch(err => {
        console.log(err);
    })    
}
exports.updatePerson = (req, res, next) => {
    console.log("Adding product");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: 'Validation failed',
            errors: errors.array()
        })
    }

    const personID = req.params.personID;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const CPF = req.body.CPF;
    const jobTitle = req.body.jobTitle;    

    Persons.findById(personID)
        .then(person => {
            if (!person) {
                return res.status(422).json({
                    message: 'Person not found'
                });                
            } else {
                person.firstName = firstName;
                person.lastName = lastName;
                person.CPF = CPF;
                person.jobTitle = jobTitle;
                person.image = "https://random.imagecdn.app/500/200";
                updatedPerson = person;
                return person.save();
            }
        })
        .then(result => {
            res.status(200).json({
                codeInfo: {
                    id: 1,
                    message: "Person changed successfull",
                },                
                person: updatedPerson
            });
        })
        .catch(err => {
            console.log(err);
        });    
}
exports.deletePerson = (req, res, next) => {

    console.log("Deleting person");
    const personID = req.params.personID;
    Persons.findByIdAndRemove(personID)
        .then(result => {
            console.log('DESTROYED PRODUCT');
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