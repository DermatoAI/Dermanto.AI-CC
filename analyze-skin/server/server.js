require('dotenv').config();
 
const Hapi = require('@hapi/hapi');
const routes = require('../server/routes');
const loadModel = require('../services/loadModel');
const InputError = require('../exceptions/InputError');
 
(async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
        routes: {
          cors: {
            origin: ['*'],
          },
          payload: {
              maxBytes: 10000000, 
          },
        },
    });
 
    const model = await loadModel();
    server.app.model = model;  
 
    server.route(routes); 
 
    server.ext('onPreResponse', function (request, h) {
        const response = request.response;
      
        if (response.isBoom && response.output.statusCode === 413) {
          const newResponse = h.response({
            status: 'fail',
            message: 'Payload content length greater than maximum allowed: 2000000',
          });
          newResponse.code(413); 
          return newResponse;
        }
      
        if (response instanceof InputError) {
          const newResponse = h.response({
            status: 'fail',
            message: response.message,
          });
          newResponse.code(400); 
          return newResponse;
        }
      
        if (response.isBoom) {
          const newResponse = h.response({
            status: 'fail',
            message: 'An error occurred while making the prediction',
          });
          newResponse.code(500);
          return newResponse;
        }
      
        return h.continue;
    });
      
    await server.start();
    console.log(`Server start at: ${server.info.uri}`);
})();
