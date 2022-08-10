const express = require('express');

const manageChallengeSAP = require('../Controllers/ChallengeSAP');
const { check } = require("express-validator");


const router = express.Router();

/**
 * @swagger
 *  /challengeSap/sap/enviaLote:
 *   get:
 *     tags:
 *       - "Challenge SAP"
 *     summary: "Busca Envia Lote para ambiente SAP"
 *     description: "Challenge SAP: Busca Envia Lote para ambiente SAP"
 *     operationId: "sapEnviaLote"
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
 *                      status:
 *                          type: integer
 *                          description: Status da requisicao
 *                      lotes:
 *                          type: array
 *                          description: Informações dos lotes
 *                          items:
 *                              type: object
 *                              properties:
 *                                 noLote:
 *                                   type: integer
 *                                   description: Numero do lote
 *                                 noPagamento:
 *                                   type: integer
 *                                   description: Número do pagamento
 *                                 valorPagamento:
 *                                   type: number
 *                                   format: float
 *                                   description: Valor do pagamento
 *                                 agencia:
 *                                   type: integer
 *                                   description: Número da agencia
 *                                 conta:
 *                                   type: integer
 *                                   description: Número da conta
 *                                 digito:
 *                                   type: integer
 *                                   description: Dígito da conta
 *                                 CNPJ:
 *                                   type: string
 *                                   description: número do CNPJ
 *                                 eParcelado:
 *                                   type: boolean
 *                                   description: Informa se pagamento é parcelado
 *                                 noParcela:
 *                                   type: integer
 *                                   description: Número da parcela
 *                                 qtdParcela:
 *                                   type: integer
 *                                   description: Quantidade de parcelas
 *                                 valorParcela:
 *                                   type: number
 *                                   format: float
 *                                   description: Valor da parcela
 */
router.get("/sap/enviaLote", manageChallengeSAP.enviaLote);

/**
 * @swagger
 *  /challengeSap/sap/confirmaPagto:
 *   post:
 *     tags:
 *       - "Challenge SAP"
 *     summary: "Confirma Pagto em ambiente SAP"
 *     description: "Challenge SAP: Confirma Pagto em ambiente SAP"
 *     operationId: "sapConfirmaPagto"
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - application/json
 *     parameters:
 *     requestBody:
 *       content:
 *         application/raw:
 *           schema:
 *             type: object
 *             properties:
 *               lotes:
 *                   type: array
 *                   description: Informações dos lotes
 *                   items:
 *                       type: object
 *                       properties:
 *                           noLote:
 *                              type: integer
 *                              description: Numero do lote
 *                           noPagamento:
 *                              type: integer
 *                              description: Número do pagamento
 *                           valorPagamento:
 *                              type: number
 *                              format: float
 *                              description: Valor do pagamento
 *                           status:
 *                              type: integer
 *                              description:  1 - Processado com sucesso | -1 - Aguardando processo | -2- Erro no processamento
 *             required:
 *               - lotes.noLote
 *               - lotes.noPagamento
 *               - lotes.valorPagamento
 *               - lotes.status
 *     responses:
 *       200:
 *         description: Sucesso na requisição
 *         content:
 *           application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                    status:
 *                        type: integer
 *                        description: Codigo da operação
 *                    lotes:
 *                        type: array
 *                        description: Codigo da operação
 *                        items:
 *                          type: object
 *                          properties:
 *                                 noLote:
 *                                   type: integer
 *                                   description: Numero do lote
 *                                 noPagamento:
 *                                   type: integer
 *                                   description: Número do pagamento
 *                                 status:
 *                                   type: integer
 *                                   description: 1 - OK | 0 - Processado com erro 
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
 *                          type: array
 *                          description: Descrição dos erros
 *                          items:
 *                             type: object
 *                             properties:
 *                                 msg:
 *                                   type: string
 *                                   description: Mensagem de erro
 *                                 param:
 *                                   type: string
 *                                   description: Parametro com erro
 *                                 location:
 *                                   type: string
 *                                   description: Localizacao do parametro com erro
 * 
 */
router.post(
  "/sap/confirmaPagto",
  [
    check("lotes")
      .not()
      .isEmpty()
      .withMessage("Must have lotes.")
      .isArray()
      .withMessage("Must be array."),
    check("lotes.*.noLote")
      .not()
      .isEmpty()
      .withMessage("Must have noLote.")
      .trim()
      .isInt({ min: 1 })
      .withMessage("noLote must be numeric."),
    check("lotes.*.noPagamento")
      .not()
      .isEmpty()
      .withMessage("Must have noPagamento.")
      .trim()
      .isInt({ min: 1 })
      .withMessage("noPagamento must be numeric."),
    check("lotes.*.valorPagamento")
      .not()
      .isEmpty()
      .withMessage("Must have valorPagamento.")
      .trim()
      .isFloat({ min: 0.01 })
      .withMessage("noLote must be numeric bigger than 0.01."),
    check("lotes.*.status")
      .not()
      .isEmpty()
      .withMessage("Must have status.")
      .trim()
      .isInt({ min: -2, max: 1 })
      .withMessage("status must be numeric between -2 and 1."),
  ],
  manageChallengeSAP.confirmaPagto
);

/**
 * @swagger
 *  /challengeSap/banco/recebeLote:
 *   post:
 *     tags:
 *       - "Challenge SAP"
 *     summary: "Recebe lote em ambiente banco"
 *     description: "Challenge SAP: Recebe lote em ambiente banco"
 *     operationId: "bancoRecebeLote"
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - application/json
 *     parameters:
 *     requestBody:
 *       content:
 *         application/raw:
 *           schema:
 *             type: object
 *             properties:
 *               lotes:
 *                   type: array
 *                   description: Informações dos lotes
 *                   items:
 *                       type: object
 *                       properties:
 *                           noLote:
 *                              type: integer
 *                              description: Numero do lote
 *                           noPagamento:
 *                              type: integer
 *                              description: Número do pagamento
 *                           valorPagamento:
 *                              type: number
 *                              format: float
 *                              description: Valor do pagamento
 *                           agencia:
 *                              type: integer
 *                              description: Número da agencia
 *                           conta:
 *                              type: integer
 *                              description: Número da conta
 *                           digito:
 *                              type: integer
 *                              description: Dígito da conta
 *                           CNPJ:
 *                              type: string
 *                              description: número do CNPJ
 *                           eParcelado:
 *                              type: boolean
 *                              description: Informa se pagamento é parcelado
 *                           noParcela:
 *                              type: integer
 *                              description: Número da parcela
 *                           qtdParcela:
 *                              type: integer
 *                              description: Quantidade de parcelas
 *                           valorParcela:
 *                              type: number
 *                              format: float
 *                              description: Valor da parcela
 *             required:
 *               - lotes.noLote
 *               - lotes.noPagamento
 *               - lotes.valorPagamento
 *               - lotes.agencia
 *               - lotes.conta
 *               - lotes.digito
 *               - lotes.CNPJ
 *               - lotes.eParcelado
 *               - lotes.noParcela
 *               - lotes.qtdParcela
 *               - lotes.valorParcela
 *     responses:
 *       200:
 *         description: Sucesso na requisição
 *         content:
 *           application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                    statusRecebimento:
 *                        type: integer
 *                        description: Status do recebimento
 *                    lotes:
 *                        type: array
 *                        description: Codigo da operação
 *                        items:
 *                          type: object
 *                          properties:
 *                                 noLote:
 *                                   type: integer
 *                                   description: Numero do lote
 *                                 noPagamento:
 *                                   type: integer
 *                                   description: Número do pagamento
 *                                 valorPagamento:
 *                                   type: number
 *                                   format: float
 *                                   description: Número do pagamento
 *                                 status:
 *                                   type: integer
 *                                   description: 1 - OK | -1 - Cedente não existe
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
 *                          type: array
 *                          description: Descrição dos erros
 *                          items:
 *                             type: object
 *                             properties:
 *                                 msg:
 *                                   type: string
 *                                   description: Mensagem de erro
 *                                 param:
 *                                   type: string
 *                                   description: Parametro com erro
 *                                 location:
 *                                   type: string
 *                                   description: Localizacao do parametro com erro
 * 
 */
router.post(
  "/banco/recebeLote",
  [
    check("lotes")
      .not()
      .isEmpty()
      .withMessage("Must have lotes.")
      .isArray()
      .withMessage("Must be array."),
    check("lotes.*.noLote")
      .not()
      .isEmpty()
      .withMessage("Must have noLote.")
      .trim()
      .isInt({ min: 1 })
      .withMessage("noLote must be numeric."),
    check("lotes.*.noPagamento")
      .not()
      .isEmpty()
      .withMessage("Must have noPagamento.")
      .trim()
      .isInt({ min: 1 })
      .withMessage("noPagamento must be numeric."),
    check("lotes.*.valorPagamento")
      .not()
      .isEmpty()
      .withMessage("Must have valorPagamento.")
      .trim()
      .isFloat({ min: 0.01 })
      .withMessage("noLote must be numeric bigger than 0.01."),
    check("lotes.*.codBanco")
      .not()
      .isEmpty()
      .withMessage("Must have codBanco.")
      .trim()
      .isInt({ min: 1 })
      .withMessage("codBanco must be numeric bigger than 1."),
    check("lotes.*.agencia")
      .not()
      .isEmpty()
      .withMessage("Must have agencia.")
      .trim()
      .isInt({ min: 1 })
      .withMessage("agencia must be numeric bigger than 1."),
    check("lotes.*.conta")
      .not()
      .isEmpty()
      .withMessage("Must have conta.")
      .trim()
      .isInt({ min: 1 })
      .withMessage("conta must be numeric bigger than 1."),
    check("lotes.*.digito")
      .not()
      .isEmpty()
      .withMessage("Must have digito.")
      .trim()
      .isInt({ min: 1 })
      .withMessage("digito must be numeric bigger than 1."),
    check("lotes.*.CNPJ").not().isEmpty().withMessage("Must have CNPJ."),
    check("lotes.*.eParcelado")
      .not()
      .isEmpty()
      .withMessage("Must have eParcelado.")
      .trim()
      .isInt({ min: 0, max: 1 })
      .withMessage("eParcelado must be numeric 0 or 1."),
    check("lotes.*.noParcela")
      .not()
      .isEmpty()
      .withMessage("Must have noParcela.")
      .trim()
      .isInt({ min: 0 })
      .withMessage("noParcela must be numeric greater or equal to 0"),
    check("lotes.*.qtdParcela")
      .not()
      .isEmpty()
      .withMessage("Must have qtdParcela.")
      .trim()
      .isInt({ min: 0 })
      .withMessage("qtdParcela must be numeric greater or equal to 0"),
    check("lotes.*.valorParcela")
      .not()
      .isEmpty()
      .withMessage("Must have valorParcela.")
      .trim()
      .isFloat({ min: 0 })
      .withMessage("valorParcela must be numeric greater or equal to 0"),
  ],
  manageChallengeSAP.recebeLote
);

/**
 * @swagger
 *  /challengeSap/banco/verificaProcessamento:
 *   post:
 *     tags:
 *       - "Challenge SAP"
 *     summary: "Verifica processamento em ambiente banco"
 *     description: "Challenge SAP: verifica processamento em ambiente bancoP"
 *     operationId: "bancoVerificaProcessamento"
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - application/json
 *     parameters:
 *     requestBody:
 *       content:
 *         application/raw:
 *           schema:
 *             type: object
 *             properties:
 *               lotes:
 *                   type: array
 *                   description: Informações dos lotes
 *                   items:
 *                       type: object
 *                       properties:
 *                           noLote:
 *                              type: integer
 *                              description: Numero do lote 
 *             required:
 *               - lotes.noLote
 *     responses:
 *       200:
 *         description: Sucesso na requisição
 *         content:
 *           application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                    statusRecebimento:
 *                        type: integer
 *                        description: Status do recebimento
 *                    lotes:
 *                        type: array
 *                        description: Codigo da operação
 *                        items:
 *                          type: object
 *                          properties:
 *                                 noLote:
 *                                   type: integer
 *                                   description: Numero do lote
 *                                 status:
 *                                   type: integer
 *                                   description:  1 - Processado com sucesso | -1 - Aguardando processo | -2- Erro no processamento
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
 *                          type: array
 *                          description: Descrição dos erros
 *                          items:
 *                             type: object
 *                             properties:
 *                                 msg:
 *                                   type: string
 *                                   description: Mensagem de erro
 *                                 param:
 *                                   type: string
 *                                   description: Parametro com erro
 *                                 location:
 *                                   type: string
 *                                   description: Localizacao do parametro com erro
 * 
 */
router.post(
  "/banco/verificaProcessamento",
  [
    check("lotes")
      .not()
      .isEmpty()
      .withMessage("Must have lotes.")
      .isArray()
      .withMessage("Must be array."),
    check("lotes.*.noLote")
      .not()
      .isEmpty()
      .withMessage("Must have noLote.")
      .trim()
      .isInt({ min: 1 })
      .withMessage("noLote must be numeric."),
  ],
  manageChallengeSAP.verificaProcessamento
);


module.exports = router;