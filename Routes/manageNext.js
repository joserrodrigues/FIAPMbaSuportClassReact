const express = require('express');

const nextControllers = require('../Controllers/Next');

const router = express.Router();

/**
 * @swagger
 *  /api/getItems:
 *   get:
 *     tags:
 *       - "Aula React: MBA Presencial - Exercício Buscando informações Next "
 *     summary: "Buscando os itens"
 *     description: "Aula React: Exercício em aula - Buscando os itens"
 *     operationId: "NextGetItems"
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
 *                  type: array
 *                  description: Informações dos itens do menu
 *                  items:
 *                              type: object
 *                              properties:
 *                                 id:
 *                                   type: integer
 *                                   description: ID do item
 *                                 name:
 *                                   type: string
 *                                   description: Nome da pessoa
 */
router.get('/getItems', nextControllers.getItems);

/**
 * @swagger
 *  /api/getInfo/:id:
 *   get:
 *     tags:
 *       - "Aula React: MBA Presencial - Exercício Buscando informações Next "
 *     summary: "Buscando a informação da pessoa"
 *     description: "Aula React: Exercício em aula - Buscando a informação da pessoa"
 *     operationId: "NextGetInfo"
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - application/json
 *     parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "ID da pessoa"
 *       required: true
 *       default: 61f0b1803accbca6c4c75f5f
 *       type: string 
 *     - name: "search"
 *       in: "query"
 *       description: "nome da pessoa"
 *       required: true
 *       type: string 
 *     responses:
 *       200:
 *         description: Sucesso na requisição
 *         content:
 *           application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                                 id:
 *                                   type: integer
 *                                   description: ID da pessoa
 *                                 name:
 *                                   type: string
 *                                   description: Nome da pessoa
 *                                 phone:
 *                                   type: integer
 *                                   description: Telefone da pessoa
 */
router.get('/getInfo/:id', nextControllers.getUserInfo);

/**
 * @swagger
 *  /api/getBBCNews:
 *   get:
 *     tags:
 *       - "Aula React: MBA Presencial - Exercício Buscando informações Next "
 *     summary: "Buscando as notícias da BBC"
 *     description: "Aula React: Exercício em aula - Buscando as notícias da BBC"
 *     operationId: "NextGetBBCNews"
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
 *                      status:
 *                          type: integer
 *                          description: Status da requisição
 *                      items:
 *                          type: array
 *                          description: Itens da noticia
 *                          items:
 *                              type: object
 *                              properties:
 *                                 title:
 *                                   type: object
 *                                   properties:
 *                                      _cdata:
 *                                           type: string
 *                                           description: Título da notícia
 *                                 description:
 *                                   type: object
 *                                   properties:
 *                                      _cdata:
 *                                           type: string
 *                                           description: Descrição da notícia
 *                                 link:
 *                                   type: object
 *                                   properties:
 *                                      _text:
 *                                           type: string
 *                                           description: URL da notícia
 *                                 guid:
 *                                   type: object
 *                                   properties:
 *                                      _attributes:
 *                                           type: object
 *                                           properties:
 *                                              isPermaLink: 
 *                                                  type: boolean
 *                                                  description: Informa se é permalink
 *                                      _text:
 *                                           type: string
 *                                           description: URL com o guid
 *                                 pubDate:
 *                                   type: object
 *                                   properties:
 *                                      _text:
 *                                           type: string
 *                                           description: Data da publicação
 */
router.get('/getBBCNews', nextControllers.getBBCNews);
/**
 * @swagger
 *  /api/getFlowPodCast:
 *   get:
 *     tags:
 *       - "Aula React: MBA Presencial - Exercício Buscando informações Next "
 *     summary: "Buscando informações do FlowPodCast"
 *     description: "Aula React: Exercício em aula - Buscando informações do FlowPodCast"
 *     operationId: "NextGetFlow"
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
 *                      status:
 *                          type: integer
 *                          description: Status da requisição
 *                      items:
 *                          type: array
 *                          description: Itens do podcast
 *                          items:
 *                              type: object
 *                              properties:
 *                                 title:
 *                                   type: object
 *                                   properties:
 *                                      _cdata:
 *                                           type: string
 *                                           description: Título do podcast
 *                                 description:
 *                                   type: object
 *                                   properties:
 *                                      _cdata:
 *                                           type: string
 *                                           description: Descrição do podcast
 *                                 link:
 *                                   type: object
 *                                   properties:
 *                                      _text:
 *                                           type: string
 *                                           description: URL do podcast
 *                                 guid:
 *                                   type: object
 *                                   properties:
 *                                      _attributes:
 *                                           type: object
 *                                           properties:
 *                                              isPermaLink: 
 *                                                  type: boolean
 *                                                  description: Informa se é permalink
 *                                      _text:
 *                                           type: string
 *                                           description: URL com o guid
 *                                 pubDate:
 *                                   type: object
 *                                   properties:
 *                                      _text:
 *                                           type: string
 *                                           description: Data da publicação
 */
router.get('/getFlowPodCast', nextControllers.getFlowPodCast);

/**
 * @swagger
 *  /api/getProdDetail/:id:
 *   get:
 *     tags:
 *       - "Aula React: MBA Presencial - Exercício Buscando informações Next "
 *     summary: "Buscando a informação do produto"
 *     description: "Aula React: Exercício em aula - Buscando a informação do produto"
 *     operationId: "NextGetProductInfo"
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - application/json
 *     parameters:
 *     - name: "id"
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
 *                      status:
 *                          type: integer
 *                          description: Status da requisição
 *                      info:
 *                          type: object
 *                          description: Objeto com as informações
 *                          properties:
 *                                 id:
 *                                   type: integer
 *                                   description: ID do produto
 *                                 name:
 *                                   type: string
 *                                   description: Nome do produto
 *                                 description:
 *                                   type: string
 *                                   description: Descrição do produto
 *                                 image:
 *                                   type: string
 *                                   description: Imagem do produto
 *                                 voltage:
 *                                   type: string
 *                                   description: Voltagem do produto
 */
router.get('/getProdDetail/:id', nextControllers.getProdDetail);

/**
 * @swagger
 *  /api/getMenu:
 *   get:
 *     tags:
 *       - "Aula React: MBA Presencial - Exercício Buscando informações Next "
 *     summary: "Buscando os itens do menu"
 *     description: "Aula React: Exercício em aula - Buscando os itens do menu"
 *     operationId: "NextGetMenuItems"
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
 *                  description: Informações dos itens do menu
 *                  properties:
 *                      status:
 *                          type: integer
 *                          description: Status da requisição
 *                      info:
 *                          type: array
 *                          description: Array com as informações
 *                          items:
 *                              type: object
 *                              properties:
 *                                 title:
 *                                   type: string
 *                                   description: Título do Menu
 *                                 link:
 *                                   type: string
 *                                   description: Link do menu
 */
router.get('/getMenu', nextControllers.getMenu);

module.exports = router;