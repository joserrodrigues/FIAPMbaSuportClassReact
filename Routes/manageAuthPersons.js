const express = require('express');

const User = require('../Models/User');
const booksController = require('../Controllers/Persons');
const authController = require('../Controllers/Auth');
const { body } = require('express-validator');
const authMiddleware = require('../middleware/auth');


const router = express.Router();

// GET /feed/posts
router.put('/signup', [
    body('email').isEmail()
        .withMessage('Please enter a valid email')
        .custom((value, { req }) => {
            return User.findOne({ email: value }).then(userDoc => {
                if (userDoc) {
                    return Promise.reject('E-Mail address already exists!');
                }
            });
        })
        .normalizeEmail(),
    body('password').trim().isLength({ min: 5 }),
    body('name').trim().not().isEmpty(),
], authController.signUp);

router.post('/login', [
    body('email').trim().isLength({ min: 7 }),
    body('password').trim().not().isEmpty()
], authController.login);

router.get('/', authMiddleware, booksController.getAllPersons)
router.get('/person/:personID', authMiddleware, booksController.getPerson)
router.post('/person', authMiddleware, [
    body('firstName').trim().isLength({ min: 1 }),
    body('lastName').trim().isLength({ min: 2 }),
    body('phone').trim().isLength({ min: 10 }),
    body('address').trim().isLength({ min: 8 }),
    body('zipCode').trim().optional().isPostalCode('BR'),
    body('latitude').trim().isFloat({ min: -90, max: 90 }),
    body('longitude').trim().isFloat({ min: -180, max: 180 }),
    body('image').trim().optional().isURL({ min: 5 }),
], booksController.addPerson)
router.put('/person/:personID', authMiddleware, [
    body('firstName').trim().isLength({ min: 1 }),
    body('lastName').trim().isLength({ min: 2 }),
    body('phone').trim().isLength({ min: 10 }),
    body('address').trim().isLength({ min: 8 }),
    body('zipCode').trim().optional().isPostalCode('BR'),
    body('latitude').trim().isFloat({ min: -90, max: 90 }),
    body('longitude').trim().isFloat({ min: -180, max: 180 }),
    body('image').trim().optional().isURL({ min: 5 }),
], booksController.updatePerson)
router.delete('/person/:personID', authMiddleware, booksController.deletePerson)

module.exports = router;