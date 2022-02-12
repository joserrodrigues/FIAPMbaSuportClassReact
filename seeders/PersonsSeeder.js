const Persons = require('../Models/Persons');
const StoreProducts = require('../Models/StoreProducts');

const data = [
  {
    firstName: 'Rubens',
    lastName: 'Rodrigues',
    phone:'11978974231',
    address:'Avenida Industrial. 780 - Santo André',
    zipCode: '09080-500',
    latitude: -23.646249,
    longitude: -46.534919,
    image: 'https://reqres.in/img/faces/1-image.jpg',
  },
  {
    firstName: 'Roberto',
    lastName: 'Fernandes',
    phone: '11978979632',
    address: 'Av.Dom Pedro II, 2550 - Campestre - Santo André - SP',
    zipCode: '09080-110',
    latitude: -23.635906,
    longitude: -46.543779,
    image: 'https://reqres.in/img/faces/2-image.jpg',
  },
  {
    firstName: 'Felipe ',
    lastName: 'Araújo',
    phone: '11974584231',
    address: 'R.Comendador Gervásio Seabra, 69 - Barcelona - São Caetano do Sul - SP',
    zipCode: '09551-220',
    latitude: -23.621474,
    longitude: -46.554537,
    image: 'https://reqres.in/img/faces/3-image.jpg',
  },
  {
    firstName: 'Roberta ',
    lastName: 'Guimarães',
    phone: '11996324231',
    address: 'Av.Dr.Augusto de Toledo, 115 - Santa Paula - São Caetano do Sul - SP',
    zipCode: '09540-080',
    latitude: -23.615275,
    longitude: -46.566152,
    image: 'https://reqres.in/img/faces/4-image.jpg',
  },
  {
    firstName: 'Claúdia ',
    lastName: 'Barroso',
    phone: '11985114231',
    address: 'R.Grão Mongol - Vila California São Paulo - SP',
    zipCode: '03213-030',
    latitude: -23.604336,
    longitude: -46.560376,
    image: 'https://reqres.in/img/faces/5-image.jpg',
  },
  {
    firstName: 'Letícia ',
    lastName: 'Silva',
    phone: '11978973652',
    address: 'R.Costa Barros, 1228 - 1332 - Vila Alpina São Paulo - SP',
    zipCode: '03210-001',
    latitude: -23.597857,
    longitude: -46.554047,
    image: 'https://reqres.in/img/faces/6-image.jpg',
  },
  {
    firstName: 'Roberto ',
    lastName: 'Rodrigues',
    phone: '11944564231',
    address: 'R.Manuel da Costa, 501 - 333 - Vila Darli São Paulo - SP',
    zipCode: '03262-000',
    latitude: -23.587506,
    longitude: -46.550286,
    image: 'https://reqres.in/img/faces/7-image.jpg',
  },
  {
    firstName: 'Roberta ',
    lastName: 'Souza',
    phone: '11963254231',
    address: 'R.Henrique - Sao Lucas São Paulo - SP',
    zipCode: '03276-050',
    latitude: -23.579940,
    longitude: -46.545523,
    image: 'https://reqres.in/img/faces/8-image.jpg',
  },
  {
    firstName: 'Lia ',
    lastName: 'Pontes',
    phone: '11969854231',
    address: 'Avenida Industrial. 780 - Santo André',
    zipCode: '03015-010',
    latitude: -23.4657987,
    longitude: -46.4564545,
    image: 'https://reqres.in/img/faces/9-image.jpg',
  },
  {
    firstName: 'André ',
    lastName: 'Macedo',
    phone: '11978978745',
    address: 'R.Fábio, 167 - Chácara Belenzinho São Paulo - SP',
    zipCode: '03378-060',
    latitude: -23.574407,
    longitude: -46.539693,
    image: 'https://reqres.in/img/faces/10-image.jpg',
  },
  {
    firstName: 'Andrea ',
    lastName: 'Mariano',
    phone: '11978979631',
    address: 'Praça Dr.Sampaio Vidal, 49 - Vila Formosa São Paulo - SP',
    zipCode: '003356-060',
    latitude: -23.567341,
    longitude: -46.541344,
    image: 'https://reqres.in/img/faces/11-image.jpg',
  },
  {
    firstName: 'Mariana ',
    lastName: 'Souza',
    phone: '11963254231',
    address: 'Avenida Industrial. 780 - Santo André',
    zipCode: '03015-010',
    latitude: -23.4657987,
    longitude: -46.4564545,
    image: 'https://reqres.in/img/faces/12-image.jpg',
  },
  {
    firstName: 'Ana Maria',
    lastName: 'Fernandes',
    phone: '11978977463',
    address: 'R.Vacanga, 605 - Vila Fernandes São Paulo - SP',
    zipCode: '03433-025',
    latitude: -23.561504,
    longitude: -46.529645,
    image: 'https://reqres.in/img/faces/8-image.jpg',
  },
  {
    firstName: 'Leonardo ',
    lastName: 'Alves',
    phone: '11963254231',
    address: 'R.Picinguaba, 241 - Vila Santa Isabel São Paulo - SP',
    zipCode: '03432-000',
    latitude: -23.559482,
    longitude: -46.539051,
    image: 'https://reqres.in/img/faces/5-image.jpg',
  },
  {
    firstName: 'Monica',
    lastName: 'Araujo',
    phone: '11978978522',
    address: 'R.Eponina, 361 - 247 - Vila Carrao São Paulo - SP',
    zipCode: '03426-010',
    latitude: -23.551660,
    longitude: -46.537573,
    image: 'https://reqres.in/img/faces/3-image.jpg',
  },
  {
    firstName: 'Thiago ',
    lastName: 'Souza',
    phone: '11978978524',
    address: 'R.Serra de Botucatu, 2220 - 2350 - Chácara Califórnia São Paulo - SP',
    zipCode: '03417 - 005',
    latitude: -23.540253,
    longitude: -46.549654,
    image: 'https://reqres.in/img/faces/4-image.jpg',
  },
  {
    firstName: 'Anderson ',
    lastName: 'Soares',
    phone: '11969324231',
    address: 'R.Itapura, 517 - 383 - Vila Gomes Cardim São Paulo - SP',
    zipCode: '03310-000',
    latitude: -23.542737,
    longitude: -46.566987,
    image: 'https://reqres.in/img/faces/2-image.jpg',
  },
  {
    firstName: 'Leandro ',
    lastName: 'Macedo',
    phone: '11987454231',
    address: 'R.Redenção, 226 - 300 - Chácara Tatuapé São Paulo - SP',
    zipCode: '03060-010',
    latitude: -23.538510,
    longitude: -46.586363,
    image: 'https://reqres.in/img/faces/1-image.jpg',
  },
  {
    firstName: 'Régis',
    lastName: 'Fernandes',
    phone: '11978970902',
    address: 'R.Gen.Couto de Magalhães, 140 - Centro - São Paulo',
    zipCode: '01212-030',
    latitude: -23.538722,
    longitude: -46.637721,
    image: 'https://reqres.in/img/faces/10-image.jpg',
  },
  {
    firstName: 'Cássio ',
    lastName: 'Araújo',
    phone: '11977189456',
    address: 'R.Newton Prado, 599 - 473 - Bom Retiro São Paulo - SP',
    zipCode: '01127-000',
    latitude: -23.523237,
    longitude: -46.640763,
    image: 'https://reqres.in/img/faces/9-image.jpg',
  },
  {
    firstName: 'Fagner ',
    lastName: 'de Almeida',
    phone: '11978945621',
    address: 'Av.Cruzeiro do Sul, 400 - Canindé São Paulo - SP',
    zipCode: '03033-020',
    latitude: -23.526898,
    longitude: -46.4564545,
    image: 'https://reqres.in/img/faces/7-image.jpg',
  },
  {
    firstName: 'Caroline ',
    lastName: 'Pontes',
    phone: '11998565621',
    address: 'Av. Rangel Pestana, 2248 - Brás',
    zipCode: '03002-000',
    latitude: -23.5415691,
    longitude: -46.613916,
    image: 'https://reqres.in/img/faces/11-image.jpg',
  }

];


const dataProducts = [
  {
    name: 'Console Nintendo Switch 32gb - Azul E Vermelho',
    image: 'https://images-submarino.b2w.io/produtos/01/00/img/1951732/6/1951732670_1GG.jpg',
    price: '2499.99',
    stores: [
      {
        name: "Loja Tatuape",
        address: "Avenida Salim Farah Malu, 500 - Tatuapé - SP",
        latitude: -23,
        longitude: -46
      }
    ],
  },
  {
    name: 'Console Xbox Series S 500gb Ssd',
    image: 'https://images-submarino.b2w.io/produtos/01/00/img/2117190/5/2117190565_1GG.jpg',
    price: '2549.99',
    stores: [
      {
        name: "Loja Tatuape",
        address: "Avenida Salim Farah Malu, 500 São Paulo - SP CEP: 03076 - 000",
        latitude: -23.5559142,
        longitude: -46.5774648
      },
      {
        name: "Loja Villa Lobos",
        address: "Avenida José César de Oliveira, S/N São Paulo - SP CEP: 05317 - 000",
        latitude: -23.5404196,
        longitude: -46.7325755
      },
      {
        name: "Loja Anchieta",
        address: "Via Anchieta, 3398 São Paulo - SP CEP: 04246 - 900",
        latitude: -23.6271593,
        longitude: -46.59813
      },
      {
        name: "Loja Aricanduva",
        address: "Avenida Rio das Pedras, 555 São Paulo - SP CEP: 03453 - 000",
        latitude: -23.5602374,
        longitude: -46.5163447
      },
      {
        name: "Loja Anália Franco",
        address: "Avenida Regente Feijó, 1759 São Paulo - SP CEP: 03550-100",
        latitude: -23.5613655,
        longitude: -46.5603552
      },
    ],
  },
  {
    name: 'Controle Sem Fio Dualshock 4 Preto - Ps4',
    image: 'https://images-submarino.b2w.io/produtos/01/00/img/133746/7/133746754_1GG.jpg',
    price: '299.90',
    stores: [
      {
        name: "Loja Tatuape",
        address: "Avenida Salim Farah Malu, 500 São Paulo - SP CEP: 03076 - 000",
        latitude: -23.5559142,
        longitude: -46.5774648
      },
      {
        name: "Loja Aricanduva",
        address: "Avenida Rio das Pedras, 555 São Paulo - SP CEP: 03453 - 000",
        latitude: -23.5602374,
        longitude: -46.5163447
      },
      {
        name: "Loja Anália Franco",
        address: "Avenida Regente Feijó, 1759 São Paulo - SP CEP: 03550-100",
        latitude: -23.5613655,
        longitude: -46.5603552
      },
    ],
  },
  {    
    name: 'Livro - The Kiss Of Deception',
    image: 'https://images-submarino.b2w.io/produtos/01/00/img/126908/0/126908049_1GG.jpg',
    price: '41.90',
    stores: [
      {
        name: "Loja Tatuape",
        address: "Avenida Salim Farah Malu, 500 - Tatuapé - SP",
        latitude: -23,
        longitude: -46
      }
    ],
  },
  {    
    name: 'Box Trilogia Sombra E Ossos (Acompanha 3 Pôsteres + Sacola Ecobag) - 1ª Ed.',
    image: 'https://images-submarino.b2w.io/produtos/01/00/img/3636586/9/3636586991_1GG.jpg',
    price: '119.90',
    stores: [
      {
        name: "Loja Tatuape",
        address: "Avenida Salim Farah Malu, 500 São Paulo - SP CEP: 03076 - 000",
        latitude: -23.5559142,
        longitude: -46.5774648
      },
      {
        name: "Loja Villa Lobos",
        address: "Avenida José César de Oliveira, S/N São Paulo - SP CEP: 05317 - 000",
        latitude: -23.5404196,
        longitude: -46.7325755
      },
      {
        name: "Loja Anchieta",
        address: "Via Anchieta, 3398 São Paulo - SP CEP: 04246 - 900",
        latitude: -23.6271593,
        longitude: -46.59813
      },
    ],
  },
  {    
    name: 'Coleção Agatha Christie Clássicos + Ecobag - Assassinato No Expresso Do Oriente + Mistério No Caribe + Corpo Na Biblioteca + Punição Para A Inocência',
    image: 'https://images-submarino.b2w.io/produtos/01/00/img/3321994/0/3321994026_1GG.jpg',
    price: '104.90',
    stores: [
      {
        name: "Loja Tatuape",
        address: "Avenida Salim Farah Malu, 500 São Paulo - SP CEP: 03076 - 000",
        latitude: -23.5559142,
        longitude: -46.5774648
      },
      {
        name: "Loja Villa Lobos",
        address: "Avenida José César de Oliveira, S/N São Paulo - SP CEP: 05317 - 000",
        latitude: -23.5404196,
        longitude: -46.7325755
      },
    ],
  },
  {    
    name: 'Livro - Drácula - Dark Edition',
    image: 'https://images-submarino.b2w.io/produtos/01/00/img/134366/0/134366016_1GG.jpg',
    price: '49.90',
    stores: [
      {
        name: "Loja Villa Lobos",
        address: "Avenida José César de Oliveira, S/N São Paulo - SP CEP: 05317 - 000",
        latitude: -23.5404196,
        longitude: -46.7325755
      },
      {
        name: "Loja Anchieta",
        address: "Via Anchieta, 3398 São Paulo - SP CEP: 04246 - 900",
        latitude: -23.6271593,
        longitude: -46.59813
      },
      {
        name: "Loja Aricanduva",
        address: "Avenida Rio das Pedras, 555 São Paulo - SP CEP: 03453 - 000",
        latitude: -23.5602374,
        longitude: -46.5163447
      },
      {
        name: "Loja Anália Franco",
        address: "Avenida Regente Feijó, 1759 São Paulo - SP CEP: 03550-100",
        latitude: -23.5613655,
        longitude: -46.5603552
      },
    ],
  },
  {    
    name: 'Monitor 27 Lg Full Hd, Led Ips, 75 Hz, 5ms, Freesync, Hdmi, Vga, 27mp400-B, Preto',
    image: 'https://images-submarino.b2w.io/produtos/4580555474/imagens/monitor-27-lg-full-hd-led-ips-75-hz-5ms-freesync-hdmi-vga-27mp400-b-preto/4580555474_1_large.jpg',
    price: '1199.98',
    stores: [
      {
        name: "Loja Tatuape",
        address: "Avenida Salim Farah Malu, 500 São Paulo - SP CEP: 03076 - 000",
        latitude: -23.5559142,
        longitude: -46.5774648
      },      
    ],
  },
  {    
    name: 'Headset Gamer A40 Mixamp Pro Tr Gen4 Xbox One/Pc - Astro',
    image: 'https://images-submarino.b2w.io/produtos/01/00/img/134494/0/134494051_1GG.jpg',
    price: '1299.98',
    stores: [
    ],
  },
  {    
    name: 'Master System Evolution Blue Com 132 Jogos Na Memória - Tectoy',
    image: 'https://images-submarino.b2w.io/produtos/01/00/img/109966/2/109966247_1GG.jpg',
    price: '256.67',
    stores: [
      {
        name: "Loja Tatuape",
        address: "Avenida Salim Farah Malu, 500 São Paulo - SP CEP: 03076 - 000",
        latitude: -23.5559142,
        longitude: -46.5774648
      },      
      {
        name: "Loja Aricanduva",
        address: "Avenida Rio das Pedras, 555 São Paulo - SP CEP: 03453 - 000",
        latitude: -23.5602374,
        longitude: -46.5163447
      },
      {
        name: "Loja Anália Franco",
        address: "Avenida Regente Feijó, 1759 São Paulo - SP CEP: 03550-100",
        latitude: -23.5613655,
        longitude: -46.5603552
      },
    ],
  },
  {    
    name: 'Game Cyber Punk 2077 - Ps4',
    image: 'https://images-submarino.b2w.io/produtos/01/00/img/1466225/4/1466225463_1GG.jpg',
    price: '37.10',
    stores: [
      {
        name: "Loja Tatuape",
        address: "Avenida Salim Farah Malu, 500 São Paulo - SP CEP: 03076 - 000",
        latitude: -23.5559142,
        longitude: -46.5774648
      },
      {
        name: "Loja Villa Lobos",
        address: "Avenida José César de Oliveira, S/N São Paulo - SP CEP: 05317 - 000",
        latitude: -23.5404196,
        longitude: -46.7325755
      },
      {
        name: "Loja Anchieta",
        address: "Via Anchieta, 3398 São Paulo - SP CEP: 04246 - 900",
        latitude: -23.6271593,
        longitude: -46.59813
      },
      {
        name: "Loja Aricanduva",
        address: "Avenida Rio das Pedras, 555 São Paulo - SP CEP: 03453 - 000",
        latitude: -23.5602374,
        longitude: -46.5163447
      },
      {
        name: "Loja Anália Franco",
        address: "Avenida Regente Feijó, 1759 São Paulo - SP CEP: 03550-100",
        latitude: -23.5613655,
        longitude: -46.5603552
      },
    ],
  },
  {    
    name: 'Game Fifa 22 - Ps4',
    image: 'https://images-submarino.b2w.io/produtos/01/00/img/3795932/9/3795932927_1GG.jpg',
    price: '206.91',
    stores: [
      {
        name: "Loja Tatuape",
        address: "Avenida Salim Farah Malu, 500 São Paulo - SP CEP: 03076 - 000",
        latitude: -23.5559142,
        longitude: -46.5774648
      },
      {
        name: "Loja Villa Lobos",
        address: "Avenida José César de Oliveira, S/N São Paulo - SP CEP: 05317 - 000",
        latitude: -23.5404196,
        longitude: -46.7325755
      },
      {
        name: "Loja Anchieta",
        address: "Via Anchieta, 3398 São Paulo - SP CEP: 04246 - 900",
        latitude: -23.6271593,
        longitude: -46.59813
      },
      {
        name: "Loja Aricanduva",
        address: "Avenida Rio das Pedras, 555 São Paulo - SP CEP: 03453 - 000",
        latitude: -23.5602374,
        longitude: -46.5163447
      },
      {
        name: "Loja Anália Franco",
        address: "Avenida Regente Feijó, 1759 São Paulo - SP CEP: 03550-100",
        latitude: -23.5613655,
        longitude: -46.5603552
      },
    ],
  },
  {    
    name: 'Game Far Cry 6 - Ps4',
    image: 'https://images-submarino.b2w.io/produtos/01/00/img/3770273/9/3770273902_1GG.jpg',
    price: '185.99',
    stores: [
      {
        name: "Loja Tatuape",
        address: "Avenida Salim Farah Malu, 500 São Paulo - SP CEP: 03076 - 000",
        latitude: -23.5559142,
        longitude: -46.5774648
      },     
      {
        name: "Loja Anália Franco",
        address: "Avenida Regente Feijó, 1759 São Paulo - SP CEP: 03550-100",
        latitude: -23.5613655,
        longitude: -46.5603552
      },
    ],
  },
  {    
    name: 'Game Grand Theft Auto The Trilogy – The Definitive Edition - Ps4',
    image: 'https://images-submarino.b2w.io/produtos/01/00/img/4280032/8/4280032815_1GG.jpg',
    price: '169.99',
    stores: [

      {
        name: "Loja Villa Lobos",
        address: "Avenida José César de Oliveira, S/N São Paulo - SP CEP: 05317 - 000",
        latitude: -23.5404196,
        longitude: -46.7325755
      },
      {
        name: "Loja Anchieta",
        address: "Via Anchieta, 3398 São Paulo - SP CEP: 04246 - 900",
        latitude: -23.6271593,
        longitude: -46.59813
      },
    ],
  },
  {    
    name: 'Game The Last Of Us Part Ii - Ps4',
    image: 'https://images-submarino.b2w.io/produtos/01/00/img/1459449/0/1459449098_1GG.jpg',
    price: '161.91',
    stores: [
      {
        name: "Loja Tatuape",
        address: "Avenida Salim Farah Malu, 500 São Paulo - SP CEP: 03076 - 000",
        latitude: -23.5559142,
        longitude: -46.5774648
      },
      {
        name: "Loja Anália Franco",
        address: "Avenida Regente Feijó, 1759 São Paulo - SP CEP: 03550-100",
        latitude: -23.5613655,
        longitude: -46.5603552
      },
    ],
  },
  {    
    name: 'Game - Red Dead Redemption 2 - Ps4',
    image: 'https://images-submarino.b2w.io/produtos/01/00/img/133806/7/133806753_1GG.jpg',
    price: '147.73',
    stores: [
      {
        name: "Loja Anália Franco",
        address: "Avenida Regente Feijó, 1759 São Paulo - SP CEP: 03550-100",
        latitude: -23.5613655,
        longitude: -46.5603552
      },
    ],
  },
];

exports.remove = async () => {
  console.log("Removing")
  let returnInfo = await Persons.deleteMany();
  console.log(returnInfo);

  returnInfo = await StoreProducts.deleteMany();
  console.log(returnInfo);
}
exports.run = async () => {
  let returnInfo = await Persons.create(data);
  console.log(returnInfo);
  
  returnInfo = await StoreProducts.create(dataProducts);
  console.log(returnInfo);
}

