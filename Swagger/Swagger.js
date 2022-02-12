

exports.mountSwagger = (app) => {

    const swaggerUi = require('swagger-ui-express');
    const swaggerJsdoc = require('swagger-jsdoc');    

    var swaggerDefinition = {
        openapi: "3.0.3",
        info: {
            title: 'FIAP Class Server',
            version: '1.0.0',
            description: 'Servidor com as descrições das APIs utilizadas nas aulas',
        },
        host: 'https://fiap-reactjs-presencial.herokuapp.com',
        basePath: '/',
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        }, 
    };

    var options = {
        // import swaggerDefinitions
        swaggerDefinition: swaggerDefinition,
        // path to the API docs
        apis: ['./Routes/*.js'],
    };

    // initialize swagger-jsdoc
    var swaggerSpec = swaggerJsdoc(options);
    app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}