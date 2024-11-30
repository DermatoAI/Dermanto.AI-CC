const postAnalyzetHandler = require('../server/handler');
const Joi = require('joi');

const routes = [
  {
    path: '/analyze-skin',
    method: 'POST',
    handler: postAnalyzetHandler,
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        maxBytes: 2 * 1024 * 1024
      },
      validate: {
        payload: Joi.object({
          image: Joi.any().required().description('Image files to be analyzed'),
        })
      }
    }
  }
]
 
module.exports = routes;