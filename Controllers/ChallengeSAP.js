const {
    validationResult
} = require('express-validator');

exports.enviaLote = (req, res, next) => {
    console.log("Getting Envia Lote");

    res.status(200).json({
        status: 1,
        lotes: getInfo(),
    });
};

exports.confirmaPagto = (req, res, next) => {
    console.log("Getting Envia Lote");

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: "Validation failed",
            errors: errors.array(),
        });
    }

    let info = []
    req.body.lotes.forEach(value => {
        console.log(value);
        info.push({
          noLote: value.noLote,
          noPagamento: value.noPagamento,
          status: 1,
        });
    })

    console.log(info);
    res.status(200).json({
        status: 1,
        lotes: info,
    });
};

exports.recebeLote = (req, res, next) => {
  console.log("Getting recebe Lote");

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: "Validation failed",
      errors: errors.array(),
    });
  }

  let info = [];
  req.body.lotes.forEach((value) => {
    console.log(value);
    info.push({
      noLote: value.noLote,
      noPagamento: value.noPagamento,
      valorPagamento: value.valorPagamento,
      status: parseInt(Math.random() *1000 %2,10),
    });
  });

  console.log(info);
  res.status(200).json({
    statusRecebimento: 1,
    lotes: info,
  });
};

exports.verificaProcessamento = (req, res, next) => {
  console.log("Getting recebe Lote");

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: "Validation failed",
      errors: errors.array(),
    });
  }

  let arrayStatus = [1, -1, -2];
  let infoStatus = parseInt((Math.random() * 1000) % arrayStatus.length, 10);
  console.log(infoStatus);
  let info = [];
  req.body.lotes.forEach((value) => {
    console.log(value);
    info.push({
      noLote: value.noLote,
      status: arrayStatus[infoStatus],
    });
  });

  console.log(info);
  res.status(200).json({
    statusRecebimento: 1,
    lotes: info,
  });
};




const getInfo = () => {
    let arrayInfo = [];
    let random = Math.random() * 1000 % 5
    console.log("AQUI");

    let arrayBank = [341, 353];
    let arrayAgencia = [0001, 45646, 1452, 3568, 9865, 3232, 6859, 6668];
    let arrayAccount = [
        12232, 8798792, 54778978, 123456, 523478, 549878, 456465, 74546,
    ];
    let arrayCNPJ = [
        "45130112000103",
        "93192816000145",
        "29480870000197",
        "49344129000106",
        "02501305000102",
        "75328356000158",
        "54004981000174",
        "51876284000115",
        "04961471000117",
        "28153726000183",
    ];

    let randomLote = parseInt((Math.random() * 1000), 10);

    for (let ind = 0; ind < random; ind++) {


        let randomBank = (Math.random() * 1000) % 1;
        let randomCNPJ = parseInt((Math.random() * 1000) % arrayCNPJ.length,10);
        let randomAgencia = parseInt((Math.random() * 1000) % arrayAgencia.length,10);
        let randomAccount = parseInt((Math.random() * 1000) % arrayAccount.length,10);
        let randomParcelado = parseInt((Math.random() * 1000) % 2, 10);
        let randomDigito = (Math.random() * 1000) % 9;
        let randomValor = Math.random() * 1000;
        let noParcela = 0;
        let qtdParcela = 0;
        let valorParcela = 0;

        if (randomParcelado === 1) {
            qtdParcela = parseInt(((Math.random() * 1000) % 8) + 2, 10);
            noParcela = parseInt(((Math.random() * 1000) % qtdParcela) + 1, 10);
            valorParcela = randomValor / qtdParcela;
        } else {
            valorParcela = randomValor;
        }
        console.log("Gerando Log");
        let info = {
          noLote: randomLote,
          noPagamento: ind,
          valorPagamento: parseFloat(randomValor).toFixed(2),
          codBanco: arrayBank[randomBank],
          agencia: arrayAgencia[randomAgencia],
          conta: arrayAgencia[randomAccount],
          digito: parseInt(randomDigito),
          CNPJ: arrayCNPJ[randomCNPJ],
          eParcelado: parseInt(randomParcelado),
          noParcela: noParcela,
          qtdParcela: qtdParcela,
          valorParcela: parseFloat(valorParcela).toFixed(2),
        };
        arrayInfo.push(info);
    }
    return arrayInfo
}