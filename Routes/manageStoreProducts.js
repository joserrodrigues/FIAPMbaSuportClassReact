const express = require('express');

const User = require('../Models/StoreUsers');
const StoreProduct = require('../Models/StoreProducts');

const booksController = require('../Controllers/Persons');
const storeProducsController = require('../Controllers/StoreProducts');

const { body } = require('express-validator');
const authMiddleware = require('../Middleware/Auth');


const router = express.Router();

/**
 * @swagger
 *  /storeProducts/signup:
 *   put:
 *     tags:
 *       - "Aula React: MBA Presencial - Trabalho Final "
 *     summary: "Cadastro do usuário"
 *     description: "Aula React: Trabalho Final - Realiza o cadastro do usuário"
 *     operationId: "StoreProductSignup"
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               name:      
 *                 type: string
 *                 minimum: 5
 *               phone:      
 *                 type: string
 *                 minimum: 10
 *               email:      
 *                 type: email
 *               password:
 *                 type: string
 *                 minimum: 4
 *             required:
 *               - name
 *               - phone
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Um teste Simples - Success
 *         content:
 *           application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *                          description: input message
 *                      userId:
 *                          type: integer
 *                          description: user ID
 *       422:
 *         description: Erro de validação
 *         content:
 *           application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *                          description: Menssagem de erro
 *                          default: "Validation failed"
 *                      errors:
 *                          type: string
 *                          description: Descrição dos erros 
 */
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
    body('phone').trim().isLength({ min: 10 }),
    body('name').trim().not().isEmpty(),
], storeProducsController.signUp);

/**
 * @swagger
 *  /storeProducts/login:
 *   post:
 *     tags:
 *       - "Aula React: MBA Presencial - Trabalho Final "
 *     summary: "Login do usuário"
 *     description: "Aula React: Trabalho Final - Realiza o login do usuário"
 *     operationId: "StoreProductLogin"
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               email:      
 *                 type: email
 *               password:
 *                 type: string
 *                 minimum: 4
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Sucesso na requisição
 *         content:
 *           application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      token:
 *                          type: string
 *                          description: JWT connection token
 *                      userId:
 *                          type: integer
 *                          description: user ID
 *                      name:
 *                          type: string
 *                          description: user Name
 *                      phone:
 *                          type: string
 *                          description: user phone
 *       201:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *                          description: Mensagem de erro
 *                          default: "User Not Found"
 *       422:
 *         description: Erro de validação
 *         content:
 *           application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *                          description: Menssagem de erro
 *                          default: "Validation failed"
 *                      errors:
 *                          type: string
 *                          description: Descrição dos erros
 */
router.post('/login', [
    body('email').trim().isLength({ min: 7 }),
    body('password').trim().not().isEmpty()
], storeProducsController.login);

/**
 * @swagger
 *  /storeProducts/:
 *   get:
 *     tags:
 *       - "Aula React: MBA Presencial - Trabalho Final "
 *     summary: "Busca todos os produtos"
 *     description: "Aula React: Trabalho Final - Busca todos os produtos"
 *     operationId: "storeProductsGetAllProducts"
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - application/json
 *     security:
 *      - bearerAuth: []    
 *     parameters:
 *     - name: "page"
 *       in: "query"
 *       description: "Número da página a ser exibida"
 *       required: false
 *       default: 0
 *       type: integer
 *     - name: "perPage"
 *       in: "query"
 *       description: "Número de itens na página"
 *       required: true
 *       default: 5
 *       type: integer
 *     - name: "orderBy"
 *       in: "query"
 *       description: "Campo de ordenação da consulta"
 *       required: false
 *       type: string
 *     - name: "orderDirection"
 *       in: "query"
 *       description: "Direção de ordenação da consulta"
 *       required: false
 *       default: "asc"
 *       type: string
 *     - name: "search"
 *       in: "query"
 *       description: "Campo de buscada consulta"
 *       required: false
 *       default: ""
 *       type: string
 *     responses:
 *       200:
 *         description: Sucesso na requisição
 *         content:
 *           application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      totalItems:
 *                          type: integer
 *                          description: Total de itens sem filtro
 *                      page:
 *                          type: integer
 *                          description: Pagina atual
 *                      perPage:
 *                          type: integer
 *                          description: Número de itens por página
 *                      products:
 *                          type: array
 *                          description: Informações das pessoas
 *                          items:
 *                              type: object
 *                              properties:
 *                                 _id:
 *                                   type: integer
 *                                   description: ID do produto
 *                                 name:
 *                                   type: string
 *                                   description: Nome do produto
 *                                 price:
 *                                   type: string
 *                                   description: Preço do produto
 *                                 favorite:
 *                                   type: boolean
 *                                   description: Se o produto é favorito do usuário
 */
router.get('/', authMiddleware, storeProducsController.getProducts)

/**
 * @swagger
 *  /storeProducts/product/:productID:
 *   get:
 *     tags:
 *       - "Aula React: MBA Presencial - Trabalho Final "
 *     summary: "Busca informação de um produto"
 *     description: "Aula React: Trabalho Final - Busca informação de um produto"
 *     operationId: "storeProductsGetProductDetail"
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - application/json
 *     security:
 *      - bearerAuth: []    
 *     parameters:
 *     - name: "productID"
 *       in: "path"
 *       description: "ID do produto"
 *       required: true
 *       default: 61f0b1803accbca6c4c75f5f
 *       type: string
 *     responses:
 *       200:
 *         description: Sucesso na requisição
 *         content:
 *           application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      product:
 *                          type: object
 *                          description: Informações das pessoas
 *                          properties:
 *                                 _id:
 *                                   type: integer
 *                                   description: ID do produto
 *                                 name:
 *                                   type: string
 *                                   description: Nome do produto
 *                                 price:
 *                                   type: string
 *                                   description: Preço do produto
 *                                 favorite:
 *                                   type: boolean
 *                                   description: Se o produto é favorito do usuário
 *                                 stores:
 *                                   type: array
 *                                   description: Array com as lojas
 *                                   items:
 *                                      type: object
 *                                      properties:
 *                                          _id:
 *                                              type: string
 *                                              description: Id da loja no array
 *                                          name:
 *                                              type: string
 *                                              description: Nome da loja
 *                                          address:
 *                                              type: string
 *                                              description: Endereço da loja
 *                                          latitude:
 *                                              type: string
 *                                              description: Latitude da loja
 *                                          longitude:
 *                                              type: string
 *                                              description: longitude da loja
 *                                 createdDate:
 *                                   type: string
 *                                   description: Data de criação
 *                                 updatedDate:
 *                                   type: string
 *                                   description: Data do último update
 *       201:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      codeInfo:
 *                          type: string
 *                          description: Informação do texto
 *                          default: "User not found"
 *       202:
 *         description: Produto não encontrado
 *         content:
 *           application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      codeInfo:
 *                          type: string
 *                          description: Informação do texto
 *                          default: "Product Not Found"
 */
router.get('/product/:productID', authMiddleware, storeProducsController.getProduct)

/**
 * @swagger
 *  /storeProducts/manageFavorite:
 *   post:
 *     tags:
 *       - "Aula React: MBA Presencial - Trabalho Final "
 *     summary: "Adicionar ou remove um produto favorito"
 *     description: "Aula React: Trabalho Final - Adicionar ou remove um produto como favorito da pessoa"
 *     operationId: "storeProductsManageFavorites"
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - application/json
 * 
 *     security:
 *      - bearerAuth: []    
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *                productID:
 *                  type: ObjectID
 *                  description: ID do produto
 *             required:
 *               - productID
 *     responses:
 *       200:
 *         description: Sucesso na requisição
 *         content:
 *           application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      codeInfo:
 *                          type: string
 *                          description: Informação do texto
 *                          default: "User updated"
 *       201:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      codeInfo:
 *                          type: string
 *                          description: Informação do texto
 *                          default: "User not found"
 *       202:
 *         description: Produto não encontrado
 *         content:
 *           application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      codeInfo:
 *                          type: string
 *                          description: Informação do texto
 *                          default: "Product Not Found"
 *       422:
 *         description: Erro de validação
 *         content:
 *           application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *                          description: Menssagem de erro
 *                          default: "Validation failed"
 *                      errors:
 *                          type: string
 *                          description: Descrição dos erros
 */
router.post('/manageFavorite', authMiddleware, [    
    body('productID').trim()
], storeProducsController.manageFavorite);

/**
 * @swagger
 *  /storeProducts/getFavProducts:
 *   get:
 *     tags:
 *       - "Aula React: MBA Presencial - Trabalho Final "
 *     summary: "Busca todos os produtos favoritos"
 *     description: "Aula React: Trabalho Final - Busca todos os produtos favoritos"
 *     operationId: "storeProductsGetAllFavProducts"
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - application/json
 *     security:
 *      - bearerAuth: []    
 *     responses:
 *       200:
 *         description: Sucesso na requisição
 *         content:
 *           application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      products:
 *                          type: array
 *                          description: Informações das pessoas
 *                          items:
 *                              type: object
 *                              properties:
 *                                 _id:
 *                                   type: integer
 *                                   description: ID do produto
 *                                 name:
 *                                   type: string
 *                                   description: Nome do produto
 *                                 price:
 *                                   type: string
 *                                   description: Preço do produto
 *                                 stores:
 *                                   type: array
 *                                   description: Array com as lojas
 *                                   items:
 *                                      type: object
 *                                      properties:
 *                                          _id:
 *                                              type: string
 *                                              description: Id da loja no array
 *                                          name:
 *                                              type: string
 *                                              description: Nome da loja
 *                                          address:
 *                                              type: string
 *                                              description: Endereço da loja
 *                                          latitude:
 *                                              type: string
 *                                              description: Latitude da loja
 *                                          longitude:
 *                                              type: string
 *                                              description: longitude da loja
 *       201:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      codeInfo:
 *                          type: string
 *                          description: Informação do texto
 *                          default: "User not found"
 */
router.get('/getFavProducts', authMiddleware, storeProducsController.getFavProducts)

module.exports = router;