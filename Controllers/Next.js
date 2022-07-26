
exports.getItems = (req, res, next) => {
    res.status(200).json([
        { id: 1, name: "1" },
        { id: 2, name: "2" },
        { id: 3, name: "3" },
        { id: 4, name: "11" },
    ]);
}

exports.getUserInfo = (req, res, next) => {

    const id = req.params.id;
    const search = req.query.search;

    console.log(id);
    console.log(search);

    res.status(200).json({
        id: id,
        name: search + ' Doe',
        phone: '1198986565'
    }) 
}


exports.getBBCNews = async (req, res, next) => {

    const axios = require('axios');
    const convert = require('xml-js');

    let returnJson = null;
    let status = -1;
    let items = [];

    try {
        let response = await axios.get('http://www.bbc.co.uk/portuguese/index.xml');

        console.log(response.data);
        returnJson = convert.xml2json(response.data, { compact: true, spaces: 4 });

        status = response.status;
        let json = JSON.parse(returnJson);
        items = json.rss.channel.item;
        
    } catch (error) {
        console.log(error.response.status);
        status = error.response.status;
    }
    

    res.status(200).json({
        status: status,
        items: items
    });
}

exports.getFlowPodCast = async (req, res, next) => {

    const axios = require('axios');
    const convert = require('xml-js');

    let returnJson = null;
    let status = -1;
    let items = [];

    try {
        let response = await axios.get('https://rss-feed-flowpodcast-2eqj3fl3la-ue.a.run.app/feed/rss');

        console.log(response.data);
        returnJson = convert.xml2json(response.data, { compact: true, spaces: 4 });

        status = response.status;
        let json = JSON.parse(returnJson);
        items = json.rss.channel.item;

    } catch (error) {
        console.log(error.response.status);
        status = error.response.status;
    }


    res.status(200).json({
        status: status,
        items: items
    });
}

exports.getProdDetail = async (req, res, next) => {

    const id = req.params.id;
    let prodID = parseInt(id, 10);
    console.log(id);
    let info = {};

    if(prodID === 1){
        info = {
            id: 1,
            name: "Liquidificador Mondial Power Nl-26 Branco/Cinza 350w De Potência 2 Velocidades 1,5l 220v",
            description: "Faça os melhores sucos e vitaminas com o Liquidificador Power da Mondial. Design inovador e linhas arredondadas dão um toque de elegância a sua cozinha. Possui 2 velocidades mais a opção pulsar, que ajudará a triturar diversos tipos de alimentos. São 370W de potência e copo em PP inquebrável que garantem a força desse liquidificador.",
            image: "https://images-submarino.b2w.io/produtos/01/00/img7/01/00/item/7275/8/7275845_1GG.jpg",
            voltage: "110v/ 220v (não é bivolt)"
        }
    } else if (prodID === 2) {
        info = {
            id: 2,
            name: "Aspirador Robô Philco Pas08c - Bivolt",
            description: "O Aspirador Robô Philco Pas08c é a melhor opção para limpar a sua casa!",
            image: "https://images-submarino.b2w.io/produtos/01/00/img/1491031/8/1491031821_1GG.jpg",
            voltage: "Energia Elétrica - Bivolt"
        }
    } else if (prodID === 3) {
        info = {
            id: 3,
            name: "Macbook Air 13 M1(8gb 512gb Ssd) Prateado",
            description: "Uma potencia no ar!",
            image: "https://images-submarino.b2w.io/produtos/01/00/img/2520059/8/2520059831_1GG.jpg",
            voltage: "Bivolt"
        }  
    } else  {
        info = {
            id: id,
            name: "Not Found",
            description: "",
            image: "",
            voltage: ""
        }  
    }

    res.status(200).json({
        status: 200,
        info: info
    });
}

exports.getMenu = async (req, res, next) => {


    let info = [];
    info.push({
        title: "Noticias BBC",
        link: "news/"
    });
    info.push({
        title: "Noticias FlowPodcast",
        link: "flow/"
    });
    info.push({
        title: "Produto 1",
        link: "product/1"
    });
    info.push({
        title: "Produto 2",
        link: "product/2"
    });
    info.push({
        title: "Produto 3",
        link: "product/3"
    });

    res.status(200).json({
        status: 200,
        info: info
    });
}
