const express = require('express');

const User = require('../Models/User');
const booksController = require('../Controllers/Persons');
const authController = require('../Controllers/Auth');
const { body } = require('express-validator');
const authMiddleware = require('../Middleware/Auth');


const router = express.Router();

/**
 * @swagger
 *  /authPersons/signup:
 *   put:
 *     tags:
 *       - "Aula React: MBA Presencial - Exercício com Autenticação "
 *     summary: "Cadastro do usuário"
 *     description: "Aula React: Exercício em aula - Realiza o cadastro do usuário"
 *     operationId: "authsignup"
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
 *               email:      
 *                 type: email
 *               password:
 *                 type: string
 *                 minimum: 4
 *             required:
 *               - name
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
    body('name').trim().not().isEmpty(),
], authController.signUp);

/**
 * @swagger
 *  /authPersons/login:
 *   post:
 *     tags:
 *       - "Aula React: MBA Presencial - Exercício com Autenticação "
 *     summary: "Login do usuário"
 *     description: "Aula React: Exercício em aula - Realiza o login do usuário"
 *     operationId: "authLogin"
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
 */
router.post('/login', [
    body('email').trim().isLength({ min: 7 }),
    body('password').trim().not().isEmpty()
], authController.login);

/**
 * @swagger
 *  /authPersons/loginGoogle:
 *   post:
 *     tags:
 *       - "Aula React: MBA Presencial - Exercício com Autenticação "
 *     summary: "Login do usuário pelo Google"
 *     description: "Aula React: Exercício em aula - Realiza o login do usuário pelo Google"
 *     operationId: "authLoginGoogle"
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
 *               email:      
 *                 type: email
 *               idGoogle:
 *                 type: string
 *             required:
 *               - email
 *               - name
 *               - idGoogle
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
 */
router.post('/loginGoogle', [
    body('name').trim().isLength({ min: 2 }),
    body('email').trim().isLength({ min: 7 }),
    body('idGoogle').trim().not().isEmpty()
], authController.loginGoogle);

/**
 * @swagger
 *  /authPersons/:
 *   get:
 *     tags:
 *       - "Aula React: MBA Presencial - Exercício com Autenticação "
 *     summary: "Busca todas as pessoas"
 *     description: "Aula React: Exercício em aula - Busca todas as pessoas"
 *     operationId: "authGetAllPersons"
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
 *                      persons:
 *                          type: array
 *                          description: Informações das pessoas
 *                          items:
 *                              type: object
 *                              properties:
 *                                 _id:
 *                                   type: integer
 *                                   description: ID da pessoa
 *                                 firstName:
 *                                   type: string
 *                                   description: Primeiro nome da pessoa
 *                                 lastName:
 *                                   type: string
 *                                   description: Último nome da pessoa
 *                                 phone:
 *                                   type: integer
 *                                   description: Telefone da pessoa
 *                                 address:
 *                                   type: string
 *                                   description: Endereço da pessoa
 *                                 zipCode:
 *                                   type: string
 *                                   description: CEP da pessoa
 *                                 latitude:
 *                                   type: double
 *                                   description: Latitude da pessoa
 *                                 longitude:
 *                                   type: double
 *                                   description: Longitude da pessoa
 *                                 image:
 *                                   type: string
 *                                   description: URL com a imagem da pessoa
 *                                 createdDate:
 *                                   type: string
 *                                   description: Data de criação da pessoa
 *                                 updatedDate:
 *                                   type: string
 *                                   description: Data da última alteração da pessoa
 */
router.get('/', authMiddleware, booksController.getAllPersons)
/**
 * @swagger
 *  /authPersons/:personID:
 *   get:
 *     tags:
 *       - "Aula React: MBA Presencial - Exercício com Autenticação "
 *     summary: "Busca informação de uma pessoa"
 *     description: "Aula React: Exercício em aula - Busca informação de uma pessoa"
 *     operationId: "authGetPersonsInfo"
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - application/json
 *     security:
 *      - bearerAuth: []    
 *     parameters:
 *     - name: "personID"
 *       in: "path"
 *       description: "ID da pessoa"
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
 *                      persons:
 *                          type: object
 *                          description: Informações das pessoas
 *                          properties:
 *                                 _id:
 *                                   type: integer
 *                                   description: ID da pessoa
 *                                 firstName:
 *                                   type: string
 *                                   description: Primeiro nome da pessoa
 *                                 lastName:
 *                                   type: string
 *                                   description: Último nome da pessoa
 *                                 phone:
 *                                   type: integer
 *                                   description: Telefone da pessoa
 *                                 address:
 *                                   type: string
 *                                   description: Endereço da pessoa
 *                                 zipCode:
 *                                   type: string
 *                                   description: CEP da pessoa
 *                                 latitude:
 *                                   type: double
 *                                   description: Latitude da pessoa
 *                                 longitude:
 *                                   type: double
 *                                   description: Longitude da pessoa
 *                                 image:
 *                                   type: string
 *                                   description: URL com a imagem da pessoa
 *                                 createdDate:
 *                                   type: string
 *                                   description: Data de criação da pessoa
 *                                 updatedDate:
 *                                   type: string
 *                                   description: Data da última alteração da pessoa
 */
router.get('/person/:personID', authMiddleware, booksController.getPerson)

/**
 * @swagger
 *  /authPersons/person:
 *   post:
 *     tags:
 *       - "Aula React: MBA Presencial - Exercício com Autenticação "
 *     summary: "Adicionar uma pessoa"
 *     description: "Aula React: Exercício em aula - Adiciona uma pessoa"
 *     operationId: "authAddPerson"
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
 *                firstName:
 *                  type: string
 *                  description: Primeiro nome da pessoa
 *                lastName:
 *                  type: string
 *                  description: Último nome da pessoa
 *                phone:
 *                  type: integer
 *                  description: Telefone da pessoa
 *                address:
 *                  type: string
 *                  description: Endereço da pessoa
 *                zipCode:
 *                  type: string
 *                  description: CEP da pessoa
 *                latitude:
 *                  type: double
 *                  description: Latitude da pessoa
 *                longitude:
 *                  type: double
 *                  description: Longitude da pessoa
 *                image:
 *                  type: string
 *                  description: URL com a imagem da pessoa
 *             required:
 *               - firstName
 *               - lastName
 *               - phone
 *               - address
 *               - latitude
 *               - longitude
 *               - image
 *     responses:
 *       200:
 *         description: Sucesso na requisição
 *         content:
 *           application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      codeInfo:
 *                          type: object
 *                          description: Informação do retorno
 *                          properties:
 *                            _id:
 *                               type: integer
 *                               description: ID do Retorno
 *                               default: 1
 *                            message:
 *                               type: string
 *                               description: Mensagem do Retorno
 *                               default: "Person create successfull"
 *                      persons:
 *                          type: object
 *                          description: Informações das pessoas
 *                          properties:
 *                                 _id:
 *                                   type: integer
 *                                   description: ID da pessoa
 *                                 firstName:
 *                                   type: string
 *                                   description: Primeiro nome da pessoa
 *                                 lastName:
 *                                   type: string
 *                                   description: Último nome da pessoa
 *                                 phone:
 *                                   type: integer
 *                                   description: Telefone da pessoa
 *                                 address:
 *                                   type: string
 *                                   description: Endereço da pessoa
 *                                 zipCode:
 *                                   type: string
 *                                   description: CEP da pessoa
 *                                 latitude:
 *                                   type: double
 *                                   description: Latitude da pessoa
 *                                 longitude:
 *                                   type: double
 *                                   description: Longitude da pessoa
 *                                 image:
 *                                   type: string
 *                                   description: URL com a imagem da pessoa
 *                                 createdDate:
 *                                   type: string
 *                                   description: Data de criação da pessoa
 *                                 updatedDate:
 *                                   type: string
 *                                   description: Data da última alteração da pessoa
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
 *                      errors:
 *                          type: string
 *                          description: Descrição dos erros
 */
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
/**
 * @swagger
 *  /authPersons/person:
 *   put:
 *     tags:
 *       - "Aula React: MBA Presencial - Exercício com Autenticação "
 *     summary: "Alterar uma pessoa"
 *     description: "Aula React: Exercício em aula - Alterar uma pessoa"
 *     operationId: "authChangePerson"
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - application/json  
 *     security:
 *      - bearerAuth: []    
 *     parameters:
 *     - name: "personID"
 *       in: "path"
 *       description: "ID da pessoa"
 *       required: true
 *       default: 61f0b1803accbca6c4c75f5f
 *       type: string
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *                firstName:
 *                  type: string
 *                  description: Primeiro nome da pessoa
 *                lastName:
 *                  type: string
 *                  description: Último nome da pessoa
 *                phone:
 *                  type: integer
 *                  description: Telefone da pessoa
 *                address:
 *                  type: string
 *                  description: Endereço da pessoa
 *                zipCode:
 *                  type: string
 *                  description: CEP da pessoa
 *                latitude:
 *                  type: double
 *                  description: Latitude da pessoa
 *                longitude:
 *                  type: double
 *                  description: Longitude da pessoa
 *                image:
 *                  type: string
 *                  description: URL com a imagem da pessoa
 *             required:
 *               - firstName
 *               - lastName
 *               - phone
 *               - address
 *               - latitude
 *               - longitude
 *               - image
 *     responses:
 *       200:
 *         description: Sucesso na requisição
 *         content:
 *           application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      codeInfo:
 *                          type: object
 *                          description: Informação do retorno
 *                          properties:
 *                            _id:
 *                               type: integer
 *                               description: ID do Retorno
 *                               default: 1
 *                            message:
 *                               type: string
 *                               description: Mensagem do Retorno
 *                               default: "Person changed successfull"
 *                      persons:
 *                          type: object
 *                          description: Informações das pessoas
 *                          properties:
 *                                 _id:
 *                                   type: integer
 *                                   description: ID da pessoa
 *                                 firstName:
 *                                   type: string
 *                                   description: Primeiro nome da pessoa
 *                                 lastName:
 *                                   type: string
 *                                   description: Último nome da pessoa
 *                                 phone:
 *                                   type: integer
 *                                   description: Telefone da pessoa
 *                                 address:
 *                                   type: string
 *                                   description: Endereço da pessoa
 *                                 zipCode:
 *                                   type: string
 *                                   description: CEP da pessoa
 *                                 latitude:
 *                                   type: double
 *                                   description: Latitude da pessoa
 *                                 longitude:
 *                                   type: double
 *                                   description: Longitude da pessoa
 *                                 image:
 *                                   type: string
 *                                   description: URL com a imagem da pessoa
 *                                 createdDate:
 *                                   type: string
 *                                   description: Data de criação da pessoa
 *                                 updatedDate:
 *                                   type: string
 *                                   description: Data da última alteração da pessoa
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
 *                      errors:
 *                          type: string
 *                          description: Descrição dos erros
 */
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

/**
 * @swagger
 *  /authPersons/person:
 *   delete:
 *     tags:
 *       - "Aula React: MBA Presencial - Exercício com Autenticação "
 *     summary: "Deletar uma pessoa"
 *     description: "Aula React: Exercício em aula - Deletar uma pessoa"
 *     operationId: "authDeletePerson"
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - application/json
 *     security:
 *      - bearerAuth: []    
 *     securitySchemes: 
 *           bearerAuth: 
 *               type: "http"
 *               scheme: "bearer"
 *               bearerFormat: "JWT"
 *     parameters:
 *     - name: "personID"
 *       in: "path"
 *       description: "ID da pessoa"
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
 *                      codeInfo:
 *                          type: object
 *                          description: Informação do retorno
 *                          properties:
 *                                 _id:
 *                                   type: integer
 *                                   description: ID do Retorno
 *                                   default: 1
 *                                 message:
 *                                   type: string
 *                                   description: Mensagem do Retorno
 *                                   default: "Remove Successfully"
 */
router.delete('/person/:personID', authMiddleware, booksController.deletePerson)

module.exports = router;