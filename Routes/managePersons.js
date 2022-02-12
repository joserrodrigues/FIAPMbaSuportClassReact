const express = require('express');

const booksController = require('../Controllers/Persons');
const { body } = require('express-validator');

const router = express.Router();

/**
 * @swagger
 *  /persons/getPersons:
 *   get:
 *     tags:
 *       - "Aula React: MBA Presencial - Exercício Buscando informações "
 *     summary: "Busca todas as pessoas Fake"
 *     description: "Aula React: Exercício em aula - Busca todas as pessoas fake"
 *     operationId: "getPersons"
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Sucesso na requisição
 *         content:
 *           application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      persons:
 *                          type: array
 *                          description: Informações das pessoas
 *                          items:
 *                              type: object
 *                              properties:
 *                                 _id:
 *                                   type: integer
 *                                   description: indice do item
 *                                 prodID:
 *                                   type: integer
 *                                   description: ID da pessoa
 *                                 title:
 *                                   type: integer
 *                                   description: titulo
 *                                 firstName:
 *                                   type: string
 *                                   description: Primeiro nome da pessoa
 *                                 lastName:
 *                                   type: string
 *                                   description: Último nome da pessoa
 *                                 jobTitle:
 *                                   type: string
 *                                   description: Título do emprego
 *                                 jobArea:
 *                                   type: string
 *                                   description: Área do emprego
 *                                 jobDescriptor:
 *                                   type: string
 *                                   description: Descrição do emprego
 *                                 jobType:
 *                                   type: string
 *                                   description: Tipo do emprego
 *                                 address:
 *                                   type: string
 *                                   description: Endereço da pessoa
 *                                 zipCode:
 *                                   type: string
 *                                   description: CEP da pessoa
 *                                 city:
 *                                   type: string
 *                                   description: cidade da pessoa
 *                                 state:
 *                                   type: string
 *                                   description: estado da pessoa
 *                                 coutry:
 *                                   type: string
 *                                   description: país da pessoa
 *                                 phone:
 *                                   type: integer
 *                                   description: Telefone da pessoa
 *                                 CPF:
 *                                   type: string
 *                                   description: CPF da pessoa
 *                                 latitude:
 *                                   type: double
 *                                   description: Latitude da pessoa
 *                                 longitude:
 *                                   type: double
 *                                   description: Longitude da pessoa
 *                                 image:
 *                                   type: string
 *                                   description: URL com a imagem da pessoa
 */
router.get('/getPersons', booksController.getPersons)

/**
 * @swagger
 *  /persons/getPersons/:prodID:
 *   get:
 *     tags:
 *       - "Aula React: MBA Presencial - Exercício Buscando informações "
 *     summary: "Busca todas as pessoas Fake"
 *     description: "Aula React: Exercício em aula - Busca todas as pessoas fake"
 *     operationId: "getPersonsID"
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - application/json
 *     parameters:
 *     - name: "personID"
 *       in: "path"
 *       description: "Número da pessoa"
 *       required: true
 *       default: 0
 *       type: integer
 *     responses:
 *       200:
 *         description: Sucesso na requisição
 *         content:
 *           application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      persons:
 *                          type: array
 *                          description: Informações das pessoas
 *                          items:
 *                              type: object
 *                              properties:
 *                                 _id:
 *                                   type: integer
 *                                   description: indice do item
 *                                 prodID:
 *                                   type: integer
 *                                   description: ID da pessoa
 *                                 title:
 *                                   type: integer
 *                                   description: titulo
 *                                 firstName:
 *                                   type: string
 *                                   description: Primeiro nome da pessoa
 *                                 lastName:
 *                                   type: string
 *                                   description: Último nome da pessoa
 *                                 jobTitle:
 *                                   type: string
 *                                   description: Título do emprego
 *                                 jobArea:
 *                                   type: string
 *                                   description: Área do emprego
 *                                 jobDescriptor:
 *                                   type: string
 *                                   description: Descrição do emprego
 *                                 jobType:
 *                                   type: string
 *                                   description: Tipo do emprego
 *                                 address:
 *                                   type: string
 *                                   description: Endereço da pessoa
 *                                 zipCode:
 *                                   type: string
 *                                   description: CEP da pessoa
 *                                 city:
 *                                   type: string
 *                                   description: cidade da pessoa
 *                                 state:
 *                                   type: string
 *                                   description: estado da pessoa
 *                                 coutry:
 *                                   type: string
 *                                   description: país da pessoa
 *                                 phone:
 *                                   type: integer
 *                                   description: Telefone da pessoa
 *                                 CPF:
 *                                   type: string
 *                                   description: CPF da pessoa
 *                                 latitude:
 *                                   type: double
 *                                   description: Latitude da pessoa
 *                                 longitude:
 *                                   type: double
 *                                   description: Longitude da pessoa
 *                                 image:
 *                                   type: string
 *                                   description: URL com a imagem da pessoa
 */
router.get('/getPersons/:prodID', booksController.getPersons)

/**
 * @swagger
 *  /persons/getPersons:
 *   post:
 *     tags:
 *       - "Aula React: MBA Presencial - Exercício Buscando informações "
 *     summary: "Busca todas as pessoas Fake"
 *     description: "Aula React: Exercício em aula - Busca todas as pessoas fake"
 *     operationId: "getPersonsPost"
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
 *                title:
 *                  type: string
 *                  description: Título da pessoa
 *     responses:
 *       200:
 *         description: Sucesso na requisição
 *         content:
 *           application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      persons:
 *                          type: array
 *                          description: Informações das pessoas
 *                          items:
 *                              type: object
 *                              properties:
 *                                 _id:
 *                                   type: integer
 *                                   description: indice do item
 *                                 prodID:
 *                                   type: integer
 *                                   description: ID da pessoa
 *                                 title:
 *                                   type: integer
 *                                   description: titulo
 *                                 firstName:
 *                                   type: string
 *                                   description: Primeiro nome da pessoa
 *                                 lastName:
 *                                   type: string
 *                                   description: Último nome da pessoa
 *                                 jobTitle:
 *                                   type: string
 *                                   description: Título do emprego
 *                                 jobArea:
 *                                   type: string
 *                                   description: Área do emprego
 *                                 jobDescriptor:
 *                                   type: string
 *                                   description: Descrição do emprego
 *                                 jobType:
 *                                   type: string
 *                                   description: Tipo do emprego
 *                                 address:
 *                                   type: string
 *                                   description: Endereço da pessoa
 *                                 zipCode:
 *                                   type: string
 *                                   description: CEP da pessoa
 *                                 city:
 *                                   type: string
 *                                   description: cidade da pessoa
 *                                 state:
 *                                   type: string
 *                                   description: estado da pessoa
 *                                 coutry:
 *                                   type: string
 *                                   description: país da pessoa
 *                                 phone:
 *                                   type: integer
 *                                   description: Telefone da pessoa
 *                                 CPF:
 *                                   type: string
 *                                   description: CPF da pessoa
 *                                 latitude:
 *                                   type: double
 *                                   description: Latitude da pessoa
 *                                 longitude:
 *                                   type: double
 *                                   description: Longitude da pessoa
 *                                 image:
 *                                   type: string
 *                                   description: URL com a imagem da pessoa
 */
router.post('/getPersons', booksController.getPersons)

/**
 * @swagger
 *  /persons/:
 *   get:
 *     tags:
 *       - "Aula React: MBA Presencial - Exercício Buscando informações "
 *     summary: "Busca todas as pessoas"
 *     description: "Aula React: Exercício em aula - Busca todas as pessoas"
 *     operationId: "getAllPersons"
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - application/json
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
router.get('/', booksController.getAllPersons)
/**
 * @swagger
 *  /persons/:personID:
 *   get:
 *     tags:
 *       - "Aula React: MBA Presencial - Exercício Buscando informações "
 *     summary: "Busca informação de uma pessoa"
 *     description: "Aula React: Exercício em aula - Busca informação de uma pessoa"
 *     operationId: "getPersonsInfo"
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - application/json
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
router.get('/person/:personID', booksController.getPerson)

/**
 * @swagger
 *  /persons/person:
 *   post:
 *     tags:
 *       - "Aula React: MBA Presencial - Exercício Buscando informações "
 *     summary: "Adicionar uma pessoa"
 *     description: "Aula React: Exercício em aula - Adiciona uma pessoa"
 *     operationId: "addPerson"
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
/**
 * @swagger
 *  /persons/person:
 *   put:
 *     tags:
 *       - "Aula React: MBA Presencial - Exercício Buscando informações "
 *     summary: "Alterar uma pessoa"
 *     description: "Aula React: Exercício em aula - Alterar uma pessoa"
 *     operationId: "changePerson"
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - application/json
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

/**
 * @swagger
 *  /persons/person:
 *   delete:
 *     tags:
 *       - "Aula React: MBA Presencial - Exercício Buscando informações "
 *     summary: "Deletar uma pessoa"
 *     description: "Aula React: Exercício em aula - Deletar uma pessoa"
 *     operationId: "deletePerson"
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - application/json
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
router.delete('/person/:personID', booksController.deletePerson)

module.exports = router;