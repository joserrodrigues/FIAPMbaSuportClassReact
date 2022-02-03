const express = require('express');

const nextControllers = require('../Controllers/Next');

const router = express.Router();

// GET /manageProducts/products
router.get('/getItems', nextControllers.getItems);
router.get('/getInfo/:id', nextControllers.getUserInfo);

module.exports = router;