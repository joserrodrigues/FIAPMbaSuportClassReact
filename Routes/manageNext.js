const express = require('express');

const nextControllers = require('../Controllers/Next');

const router = express.Router();

// GET /manageProducts/products
router.get('/getItems', nextControllers.getItems);
router.get('/getInfo/:id', nextControllers.getUserInfo);
router.get('/getBBCNews', nextControllers.getBBCNews);
router.get('/getFlowPodCast', nextControllers.getFlowPodCast);
router.get('/getProdDetail/:id', nextControllers.getProdDetail);
router.get('/getMenu', nextControllers.getMenu);

module.exports = router;