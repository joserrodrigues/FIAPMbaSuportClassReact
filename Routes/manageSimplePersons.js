const express = require('express');

const simplePersonsController = require("../Controllers/SimplePersons");
const { body } = require('express-validator');

const router = express.Router();

/**
 * @swagger
 *  /simplePersons/getPersons:
 *   get:
 *     tags:
 *       - "Aula React: MBA Presencial - Exercício Buscando informações - Simple Persons "
 *     summary: "Busca todas as pessoas Fake"
 *     description: "Aula React: Exercício em aula - Busca todas as pessoas fake - Simple Persons"
 *     operationId: "SimplePersonsFake"
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
 *                                 firstName:
 *                                   type: string
 *                                   description: Primeiro nome da pessoa
 *                                 lastName:
 *                                   type: string
 *                                   description: Último nome da pessoa
 *                                 jobTitle:
 *                                   type: string
 *                                   description: Profissão da pessoa
 *                                 CPF:
 *                                   type: string
 *                                   description: CPF da pessoa
 */
router.get("/getPersons", simplePersonsController.getPersons);

/**
 * @swagger
 *  /simplePersons/:
 *   get:
 *     tags:
 *       - "Aula React: MBA Presencial - Exercício Buscando informações - Simple Persons "
 *     summary: "Busca todas as pessoas Cadastradas"
 *     description: "Aula React: Exercício em aula - Busca todas as pessoas - Simple Persons"
 *     operationId: "SimplePersons"
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
 *                                 firstName:
 *                                   type: string
 *                                   description: Primeiro nome da pessoa
 *                                 lastName:
 *                                   type: string
 *                                   description: Último nome da pessoa
 *                                 jobTitle:
 *                                   type: string
 *                                   description: Profissão da pessoa
 *                                 CPF:
 *                                   type: string
 *                                   description: CPF da pessoa
 */
router.get("/", simplePersonsController.getAllPersons);

/**
 * @swagger
 *  /simplePersons/:prodID:
 *   get:
 *     tags:
 *       - "Aula React: MBA Presencial - Exercício Buscando informações - Simple Persons "
 *     summary: "Busca pessoa por ID"
 *     description: "Aula React: Exercício em aula - Busca todas as pessoas por ID - Simple Persons"
 *     operationId: "SimplePersonsID"
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
 *                                 firstName:
 *                                   type: string
 *                                   description: Primeiro nome da pessoa
 *                                 lastName:
 *                                   type: string
 *                                   description: Último nome da pessoa
 *                                 jobTitle:
 *                                   type: string
 *                                   description: Profissão da pessoa
 *                                 CPF:
 *                                   type: string
 *                                   description: CPF da pessoa
 *                                 image:
 *                                   type: string
 *                                   description: URL com a imagem da pessoa
 */
router.get("/:personID", simplePersonsController.getPerson);

/**
 * @swagger
 *  /simplePersons/:
 *   post:
 *     tags:
 *       - "Aula React: MBA Presencial - Exercício Buscando informações - Simple Persons "
 *     summary: "Adicionar uma pessoa"
 *     description: "Aula React: Exercício em aula - Adiciona uma pessoa - Simple Persons"
 *     operationId: "addSimplePersons"
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
 *                CPF:
 *                  type: string
 *                  description: CPF da pessoa
 *                jobTitle:
 *                  type: string
 *                  description: Profissão da pessoa
 *             required:
 *               - firstName
 *               - lastName
 *               - CPF
 *               - jobTitle
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
 *                                 CPF:
 *                                   type: string
 *                                   description: CPF da pessoa
 *                                 jobTitle:
 *                                   type: string
 *                                   description: Profissão da pessoa
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
router.post('/', [
    body('firstName').trim().isLength({ min: 1 }),
    body('lastName').trim().isLength({ min: 2 }),
    body('CPF').trim().isLength({ min: 3 }),
    body('jobTitle').trim().isLength({ min: 3 }),
], simplePersonsController.addPerson)

/**
 * @swagger
 *  /simplePersons/:
 *   put:
 *     tags:
 *       - "Aula React: MBA Presencial - Exercício Buscando informações - Simple Persons "
 *     summary: "Alterar uma pessoa"
 *     description: "Aula React: Exercício em aula - Alterar uma pessoa - Simple Persons"
 *     operationId: "updateSimplePersons"
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
 *                CPF:
 *                  type: string
 *                  description: CPF da pessoa
 *                jobTitle:
 *                  type: string
 *                  description: Profissão da pessoa 
 *             required:
 *               - firstName
 *               - lastName
 *               - CPF
 *               - jobTitle
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
 *                                 CPF:
 *                                   type: string
 *                                   description: CPF da pessoa
 *                                 jobTitle:
 *                                   type: string
 *                                   description: Profissão da pessoa 
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
router.put(
  "/:personID",
  [
    body("firstName").trim().isLength({ min: 1 }),
    body("lastName").trim().isLength({ min: 2 }),
    body("CPF").trim().isLength({ min: 3 }),
    body("jobTitle").trim().isLength({ min: 3 }),
  ],
  simplePersonsController.updatePerson
);

/**
 * @swagger
 *  /persons/person:
 *   delete:
 *     tags:
 *       - "Aula React: MBA Presencial - Exercício Buscando informações - Simple Persons "
 *     summary: "Deletar uma pessoa"
 *     description: "Aula React: Exercício em aula - Deletar uma pessoa - Simple Persons"
 *     operationId: "deleteSimplePersons"
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
router.delete("/:personID", simplePersonsController.deletePerson);

module.exports = router;