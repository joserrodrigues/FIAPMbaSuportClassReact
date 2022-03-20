const express = require('express');

const User = require('../Models/StoreUsers');
const StoreProduct = require('../Models/StoreProducts');

const booksController = require('../Controllers/Persons');
const storeProducsController = require('../Controllers/StoreProducts');
const manageToys = require('../Controllers/Toys');

const { body } = require('express-validator');
const authMiddleware = require('../Middleware/Auth');


const router = express.Router();

/**
 * @swagger
 *  /toys/getAll:
 *   get:
 *     tags:
 *       - "Aula React: Shift - Toys "
 *     summary: "Busca informação de todos os brinquedos"
 *     description: "Aula React: Busca informação de todos os brinquedos"
 *     operationId: "toysGetAll"
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - application/json
 *     parameters:
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
 *                          description: Número de itens no array
 *                      toys:
 *                          type: array
 *                          description: Informações dos brinquedos
 *                          items:
 *                              type: object
 *                              properties:
 *                                 _id:
 *                                   type: string
 *                                   description: ID do brinquedo - Mongo Object ID
 *                                 name:
 *                                   type: string
 *                                   description: Nome do brinquedo
 *                                 mainImage:
 *                                   type: string
 *                                   description: Imagem principal do brinquedo
 *                                 detailImage1:
 *                                   type: string
 *                                   description: Imagem 1 de detalhe do brinquedo
 *                                 detailImage2:
 *                                   type: string
 *                                   description: Imagem 1 de detalhe do brinquedo
 *                                 conditionType:
 *                                   type: integer
 *                                   description: ID da condição do brinquedo
 *                                 code:
 *                                   type: string
 *                                   description: Código do brinquedo
 *                                 receiveDate:
 *                                   type: string
 *                                   description: Data de recebimento do brinquedo Formato YYYY-MM-DD
 *                                 receiveResponsable:
 *                                   type: string
 *                                   description: Nome do responsável pelo brinquedo
 *                                 latitude:
 *                                   type: float
 *                                   description: Latitude da entrega do brinquedo
 *                                 longitude:
 *                                   type: float
 *                                   description: Longitude da entrega do brinquedo
 *                                 status:
 *                                   type: integer
 *                                   description: Status do brinquedo (0 - Disponível | 1 - Doado)                                 
 *                                 createdDate:
 *                                   type: string
 *                                   description: Data de criação
 *                                 updatedDate:
 *                                   type: string
 *                                   description: Data do último update
 */
router.get('/getAll', manageToys.getAllToys);
/**
 * @swagger
 *  /toys/:
 *   get:
 *     tags:
 *       - "Aula React: Shift - Toys "
 *     summary: "Busca informação paginada dos brinquedos "
 *     description: "Aula React: Busca informação paginada dos brinquedos"
 *     operationId: "toysGet"
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
 *                          description: Número de itens no array
 *                      toys:
 *                          type: array
 *                          description: Informações dos brinquedos
 *                          items:
 *                              type: object
 *                              properties:
 *                                 _id:
 *                                   type: string
 *                                   description: ID do brinquedo - Mongo Object ID
 *                                 name:
 *                                   type: string
 *                                   description: Nome do brinquedo
 *                                 mainImage:
 *                                   type: string
 *                                   description: Imagem principal do brinquedo
 *                                 detailImage1:
 *                                   type: string
 *                                   description: Imagem 1 de detalhe do brinquedo
 *                                 detailImage2:
 *                                   type: string
 *                                   description: Imagem 1 de detalhe do brinquedo
 *                                 conditionType:
 *                                   type: integer
 *                                   description: ID da condição do brinquedo
 *                                 code:
 *                                   type: string
 *                                   description: Código do brinquedo
 *                                 receiveDate:
 *                                   type: string
 *                                   description: Data de recebimento do brinquedo Formato YYYY-MM-DD
 *                                 receiveResponsable:
 *                                   type: string
 *                                   description: Nome do responsável pelo brinquedo
 *                                 latitude:
 *                                   type: float
 *                                   description: Latitude da entrega do brinquedo
 *                                 longitude:
 *                                   type: float
 *                                   description: Longitude da entrega do brinquedo
 *                                 status:
 *                                   type: integer
 *                                   description: Status do brinquedo (0 - Disponível | 1 - Doado)                                 
 *                                 createdDate:
 *                                   type: string
 *                                   description: Data de criação
 *                                 updatedDate:
 *                                   type: string
 *                                   description: Data do último update
 */
router.get('/', authMiddleware, manageToys.getToys);
/**
 * @swagger
 *  /toys/:toyID:
 *   get:
 *     tags:
 *       - "Aula React: Shift - Toys "
 *     summary: "Busca informação de um dos brinquedos "
 *     description: "Aula React: Busca informação de um dos brinquedos"
 *     operationId: "toysGetToy"
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - application/json
 *     security:
 *      - bearerAuth: []    
 *     parameters:
 *     - name: "toyID"
 *       in: "param"
 *       description: "ID do brinquedo"
 *       required: true
 *       default: 0
 *       type: string
 *     responses:
 *       200:
 *         description: Sucesso na requisição
 *         content:
 *           application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      toy:
 *                          type: object
 *                          properties:
 *                                 _id:
 *                                   type: string
 *                                   description: ID do brinquedo - Mongo Object ID
 *                                 name:
 *                                   type: string
 *                                   description: Nome do brinquedo
 *                                 mainImage:
 *                                   type: string
 *                                   description: Imagem principal do brinquedo
 *                                 detailImage1:
 *                                   type: string
 *                                   description: Imagem 1 de detalhe do brinquedo
 *                                 detailImage2:
 *                                   type: string
 *                                   description: Imagem 1 de detalhe do brinquedo
 *                                 conditionType:
 *                                   type: integer
 *                                   description: ID da condição do brinquedo
 *                                 code:
 *                                   type: string
 *                                   description: Código do brinquedo
 *                                 receiveDate:
 *                                   type: string
 *                                   description: Data de recebimento do brinquedo Formato YYYY-MM-DD
 *                                 receiveResponsable:
 *                                   type: string
 *                                   description: Nome do responsável pelo brinquedo
 *                                 latitude:
 *                                   type: float
 *                                   description: Latitude da entrega do brinquedo
 *                                 longitude:
 *                                   type: float
 *                                   description: Longitude da entrega do brinquedo
 *                                 status:
 *                                   type: integer
 *                                   description: Status do brinquedo (0 - Disponível | 1 - Doado)                                 
 *                                 createdDate:
 *                                   type: string
 *                                   description: Data de criação
 *                                 updatedDate:
 *                                   type: string
 *                                   description: Data do último update
 *       423:
 *         description: Brinquedo não encontrado
 *         content:
 *           application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *                          description: Menssagem de erro
 */
router.get('/:toyID', authMiddleware, manageToys.getToy);
/**
 * @swagger
 *  /toys/:
 *   post:
 *     tags:
 *       - "Aula React: Shift - Toys "
 *     summary: "Adiciona um brinquedos "
 *     description: "Aula React: Adiciona um brinquedo"
 *     operationId: "toysadd"
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - application/json
 *     security:
 *      - bearerAuth: []    
 *     parameters:
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *                name:
 *                  type: string
 *                  description: Nome do brinquedo
 *                mainImage:
 *                  type: string
 *                  description: Endereço da imagem principal do brinquedo
 *                detailImage1:
 *                  type: integer
 *                  description: Endereço da imagem de detalhe 1 do brinquedo
 *                detailImage2:
 *                  type: string
 *                  description: Endereço da imagem de detalhe 2 do brinquedo
 *                conditionType:
 *                  type: string
 *                  description: ID da condição do brinquedo
 *                code:
 *                  type: string
 *                  description: Código do brinquedo
 *                receiveDate:
 *                  type: string
 *                  description: Data da entrega do brinquedo - Formato YYYY-MM-DD
 *                receiveResponsable:
 *                  type: string
 *                  description: Nome do responsável pel brinquedo
 *                latitude:
 *                  type: double
 *                  description: Latitude da entrega do brinquedo
 *                longitude:
 *                  type: double
 *                  description: Longitude da entrega do brinquedo
 *                status:
 *                  type: integer
 *                  description: Status do brinquedo (0 - Disponível | 1 - Doado)
 *             required:
 *               - name
 *               - mainImage
 *               - detailImage1
 *               - detailImage2
 *               - conditionType
 *               - code
 *               - receiveDate
 *               - receiveResponsable
 *               - latitude
 *               - longitude
 *               - status
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
 *                          properties:
 *                                 id:
 *                                   type: integer
 *                                   description: ID da requisição
 *                                 message:
 *                                   type: string
 *                                   description: Mensagem da requisição
 *                      toy:
 *                          type: object
 *                          properties:
 *                                 _id:
 *                                   type: string
 *                                   description: ID do brinquedo - Mongo Object ID
 *                                 name:
 *                                   type: string
 *                                   description: Nome do brinquedo
 *                                 mainImage:
 *                                   type: string
 *                                   description: Imagem principal do brinquedo
 *                                 detailImage1:
 *                                   type: string
 *                                   description: Imagem 1 de detalhe do brinquedo
 *                                 detailImage2:
 *                                   type: string
 *                                   description: Imagem 1 de detalhe do brinquedo
 *                                 conditionType:
 *                                   type: integer
 *                                   description: ID da condição do brinquedo
 *                                 code:
 *                                   type: string
 *                                   description: Código do brinquedo
 *                                 receiveDate:
 *                                   type: string
 *                                   description: Data de recebimento do brinquedo Formato YYYY-MM-DD
 *                                 receiveResponsable:
 *                                   type: string
 *                                   description: Nome do responsável pelo brinquedo
 *                                 latitude:
 *                                   type: float
 *                                   description: Latitude da entrega do brinquedo
 *                                 longitude:
 *                                   type: float
 *                                   description: Longitude da entrega do brinquedo
 *                                 status:
 *                                   type: integer
 *                                   description: Status do brinquedo (0 - Disponível | 1 - Doado)                                 
 *                                 createdDate:
 *                                   type: string
 *                                   description: Data de criação
 *                                 updatedDate:
 *                                   type: string
 *                                   description: Data do último update
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
 * 
 */
router.post('/', authMiddleware, [
    body('name').trim().isLength({ min: 5 }),
    body('mainImage').trim().isURL({ require_valid_protocol: true, require_host: true }),
    body('detailImage1').trim().isURL({ require_valid_protocol: true, require_host: true }),
    body('detailImage2').trim().isURL({ require_valid_protocol: true, require_host: true }),
    body('conditionType').trim().isInt({ min: 0, max: 10 }),
    body('code').trim().isLength({ min: 2 }),
    body('receiveDate').trim().isDate({ format: 'YYYY-MM-DD' }),
    body('receiveResponsable').trim().isLength({ min: 2 }),
    body('latitude').trim().isFloat({ min: -180, max: 180 }),
    body('longitude').trim().isFloat({ min: -180, max: 180  }),
    body('status').trim().isInt({ min: 0, max: 1 }),    
], manageToys.addToy);

/**
 * @swagger
 *  /toys/:
 *   put:
 *     tags:
 *       - "Aula React: Shift - Toys "
 *     summary: "Altera um brinquedos "
 *     description: "Aula React: Altera um brinquedo"
 *     operationId: "toysupdate"
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - application/json
 *     security:
 *      - bearerAuth: []    
 *     parameters:
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *                toyID:
 *                  type: string
 *                  description: ID do brinquedo - Mongo Object ID
 *                name:
 *                  type: string
 *                  description: Nome do brinquedo
 *                mainImage:
 *                  type: string
 *                  description: Endereço da imagem principal do brinquedo
 *                detailImage1:
 *                  type: integer
 *                  description: Endereço da imagem de detalhe 1 do brinquedo
 *                detailImage2:
 *                  type: string
 *                  description: Endereço da imagem de detalhe 2 do brinquedo
 *                conditionType:
 *                  type: string
 *                  description: ID da condição do brinquedo
 *                code:
 *                  type: string
 *                  description: Código do brinquedo
 *                receiveDate:
 *                  type: string
 *                  description: Data da entrega do brinquedo - Formato YYYY-MM-DD
 *                receiveResponsable:
 *                  type: string
 *                  description: Nome do responsável pel brinquedo
 *                latitude:
 *                  type: double
 *                  description: Latitude da entrega do brinquedo
 *                longitude:
 *                  type: double
 *                  description: Longitude da entrega do brinquedo
 *                status:
 *                  type: integer
 *                  description: Status do brinquedo (0 - Disponível | 1 - Doado)
 *             required:
 *               - name
 *               - mainImage
 *               - detailImage1
 *               - detailImage2
 *               - conditionType
 *               - code
 *               - receiveDate
 *               - receiveResponsable
 *               - latitude
 *               - longitude
 *               - status
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
 *                          properties:
 *                                 id:
 *                                   type: integer
 *                                   description: ID da requisição
 *                                 message:
 *                                   type: string
 *                                   description: Mensagem da requisição
 *                      toy:
 *                          type: object
 *                          properties:
 *                                 _id:
 *                                   type: string
 *                                   description: ID do brinquedo - Mongo Object ID
 *                                 name:
 *                                   type: string
 *                                   description: Nome do brinquedo
 *                                 mainImage:
 *                                   type: string
 *                                   description: Imagem principal do brinquedo
 *                                 detailImage1:
 *                                   type: string
 *                                   description: Imagem 1 de detalhe do brinquedo
 *                                 detailImage2:
 *                                   type: string
 *                                   description: Imagem 1 de detalhe do brinquedo
 *                                 conditionType:
 *                                   type: integer
 *                                   description: ID da condição do brinquedo
 *                                 code:
 *                                   type: string
 *                                   description: Código do brinquedo
 *                                 receiveDate:
 *                                   type: string
 *                                   description: Data de recebimento do brinquedo Formato YYYY-MM-DD
 *                                 receiveResponsable:
 *                                   type: string
 *                                   description: Nome do responsável pelo brinquedo
 *                                 latitude:
 *                                   type: float
 *                                   description: Latitude da entrega do brinquedo
 *                                 longitude:
 *                                   type: float
 *                                   description: Longitude da entrega do brinquedo
 *                                 status:
 *                                   type: integer
 *                                   description: Status do brinquedo (0 - Disponível | 1 - Doado)                                 
 *                                 createdDate:
 *                                   type: string
 *                                   description: Data de criação
 *                                 updatedDate:
 *                                   type: string
 *                                   description: Data do último update
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
 *       423:
 *         description: Brinquedo não encontrado
 *         content:
 *           application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *                          description: Menssagem de erro
 */
router.put('/', authMiddleware,[
    body('toyID').trim().isMongoId(),
    body('name').trim().isLength({ min: 5 }),
    body('mainImage').trim().isURL({ require_valid_protocol: true, require_host: true }),
    body('detailImage1').trim().isURL({ require_valid_protocol: true, require_host: true }),
    body('detailImage2').trim().isURL({ require_valid_protocol: true, require_host: true }),
    body('conditionType').trim().isInt({ min: 0, max: 10 }),
    body('code').trim().isLength({ min: 2 }),
    body('receiveDate').trim().isDate({ format: 'YYYY-MM-DD' }),
    body('receiveResponsable').trim().isLength({ min: 2 }),
    body('latitude').trim().isFloat({ min: -180, max: 180 }),
    body('longitude').trim().isFloat({ min: -180, max: 180  }),
    body('status').trim().isInt({ min: 0, max: 1 }),    
], manageToys.updateToy);
/**
 * @swagger
 *  /toys/:toyID:
 *   delete:
 *     tags:
 *       - "Aula React: Shift - Toys "
 *     summary: "Remove um brinquedos "
 *     description: "Aula React: Remove um brinquedo"
 *     operationId: "toysdelete"
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - application/json
 *     security:
 *      - bearerAuth: []    
 *     parameters:
 *     - name: "toyID"
 *       in: "param"
 *       description: "ID do brinquedo"
 *       required: true
 *       default: 0
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
 *                          properties:
 *                                 id:
 *                                   type: integer
 *                                   description: ID da requisição
 *                                 message:
 *                                   type: string
 *                                   description: Mensagem da requisição
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
 *       423:
 *         description: Brinquedo não encontrado
 *         content:
 *           application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *                          description: Menssagem de erro
 */
router.delete('/:toyID', authMiddleware, manageToys.deleteToy);

/**
 * @swagger
 *  /toys/updateStatus/:toyID:
 *   put:
 *     tags:
 *       - "Aula React: Shift - Toys "
 *     summary: "Altera status de um brinquedos "
 *     description: "Aula React: Altera status de um brinquedo"
 *     operationId: "toysupdatestatus"
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - application/json
 *     security:
 *      - bearerAuth: []    
 *     parameters:
 *     - name: "toyID"
 *       in: "param"
 *       description: "ID do brinquedo"
 *       required: true
 *       default: 0
 *       type: string 
*     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *                status:
 *                  type: integer
 *                  description: Status do brinquedo (0 - Disponível | 1 - Doado)
 *             required:
 *               - status
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
 *                          properties:
 *                                 id:
 *                                   type: integer
 *                                   description: ID da requisição
 *                                 message:
 *                                   type: string
 *                                   description: Mensagem da requisição
 *                      toy:
 *                          type: object
 *                          properties:
 *                                 _id:
 *                                   type: string
 *                                   description: ID do brinquedo - Mongo Object ID
 *                                 name:
 *                                   type: string
 *                                   description: Nome do brinquedo
 *                                 mainImage:
 *                                   type: string
 *                                   description: Imagem principal do brinquedo
 *                                 detailImage1:
 *                                   type: string
 *                                   description: Imagem 1 de detalhe do brinquedo
 *                                 detailImage2:
 *                                   type: string
 *                                   description: Imagem 1 de detalhe do brinquedo
 *                                 conditionType:
 *                                   type: integer
 *                                   description: ID da condição do brinquedo
 *                                 code:
 *                                   type: string
 *                                   description: Código do brinquedo
 *                                 receiveDate:
 *                                   type: string
 *                                   description: Data de recebimento do brinquedo Formato YYYY-MM-DD
 *                                 receiveResponsable:
 *                                   type: string
 *                                   description: Nome do responsável pelo brinquedo
 *                                 latitude:
 *                                   type: float
 *                                   description: Latitude da entrega do brinquedo
 *                                 longitude:
 *                                   type: float
 *                                   description: Longitude da entrega do brinquedo
 *                                 status:
 *                                   type: integer
 *                                   description: Status do brinquedo (0 - Disponível | 1 - Doado)                                 
 *                                 createdDate:
 *                                   type: string
 *                                   description: Data de criação
 *                                 updatedDate:
 *                                   type: string
 *                                   description: Data do último update
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
 *       423:
 *         description: Brinquedo não encontrado
 *         content:
 *           application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *                          description: Menssagem de erro
 */
router.put('/updateStatus/:toyID', authMiddleware, [
    body('status').trim().isInt({ min: 0, max: 1 }),
], manageToys.updateStatusToy);

/**
 * @swagger
 *  /toys/uploadImage:
 *   post:
 *     tags:
 *       - "Aula React: Shift - Toys "
 *     summary: "Upload a imagem de um brinquedos "
 *     description: "Aula React: Upload imagem de um brinquedo"
 *     operationId: "toysuploadimage"
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - application/json
 *     security:
 *      - bearerAuth: []    
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *                image:
 *                  type: string 
 *                  description: imagem em uma string base64
 *             required:
 *               - status
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
 *                          properties:
 *                                 id:
 *                                   type: integer
 *                                   description: ID da requisição
 *                                 message:
 *                                   type: string
 *                                   description: Mensagem da requisição
 *                      info:
 *                          type: object
 *                          properties:
 *                                 url:
 *                                   type: string
 *                                   description: URL da nova imagem
 *       201:
 *         description: Erro de upload
 *         content:
 *           application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      codeInfo:
 *                          type: object
 *                          properties:
 *                                 id:
 *                                   type: integer
 *                                   description: ID da requisição
 *                                 message:
 *                                   type: string
 *                                   description: Mensagem da requisição
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
router.post('/uploadImage', authMiddleware, [
    body('image').isBase64({ urlSafe: false }),
], manageToys.uploadImage);


module.exports = router;