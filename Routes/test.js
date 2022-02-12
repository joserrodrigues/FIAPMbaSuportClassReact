const express = require('express');

const router = express.Router();

/**
 * @swagger
 *  /:
 *   get:
 *     tags:
 *       - "Teste"
 *     description: Teste do Servidor
 *     operationId: "addPet"
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Um teste Simples - Success 
 */
router.get('/', (req, res, next) => {
    res.status(200).json({
        info: "Success",
    });
})

module.exports = router;