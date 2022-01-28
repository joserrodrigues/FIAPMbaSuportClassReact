const express = require('express');

const router = express.Router();

// GET /feed/posts
router.get('/', (req, res, next) => {
    res.status(200).json({
        info: "Success",
    });
})

module.exports = router;