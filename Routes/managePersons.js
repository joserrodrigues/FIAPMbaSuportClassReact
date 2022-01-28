const express = require('express');

const booksController = require('../Controllers/Persons');
const { body } = require('express-validator');

const router = express.Router();

// GET /manageProducts/products
router.get('/getPersons', booksController.getPersons)
router.get('/getPersons/:prodID', booksController.getPersons)
router.post('/getPersons', booksController.getPersons)


router.get('/', booksController.getAllPersons)
router.get('/person/:personID', booksController.getPerson)
router.post('/person', [
    body('firstName').trim().isLength({ min: 1 }),
    body('lastName').trim().isLength({ min: 2 }),
    body('phone').trim().isLength({ min: 10 }),
    body('address').trim().isLength({ min: 8 }),
    body('zipCode').trim().optional().isPostalCode('BR'),
    body('latitude').trim().isFloat({ min: -90, max: 90 }),
    body('longitude').trim().isFloat({ min: -180, max: 180 }),
    body('image').trim().optional().isURL({ min: 5 }),
], booksController.addPerson)
router.put('/person/:personID',[
    body('firstName').trim().isLength({ min: 1 }),
    body('lastName').trim().isLength({ min: 2 }),
    body('phone').trim().isLength({ min: 10 }),
    body('address').trim().isLength({ min: 8 }),
    body('zipCode').trim().optional().isPostalCode('BR'),
    body('latitude').trim().isFloat({ min: -90, max: 90 }),
    body('longitude').trim().isFloat({ min: -180, max: 180 }),
    body('image').trim().optional().isURL({ min: 5 }),
], booksController.updatePerson)
router.delete('/person/:personID', booksController.deletePerson)

module.exports = router;