const postPredictHandler = require('../server/handler');

const routes = [
  {
    path: '/analyze-skin',
    method: 'POST',
    handler: postPredictHandler,
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        maxBytes: 2 * 1024 * 1024
      },
    }
  }
]

module.exports = routes;
