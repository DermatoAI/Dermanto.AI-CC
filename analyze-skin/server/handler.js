const { predictClassification } = require('../services/inferenceService');
const crypto = require('crypto');
const uploadImage = require('../services/storeImage');

async function postPredictHandler(request, h) {
  const { image, userId } = request.payload;

  if (!userId) { 
    return h.response({
      status: 'fail',
      message: 'userId not provided',
    }).code(401);
  }

  if (Buffer.byteLength(image) > 2000000) {  
    return h.response({
      status: 'fail',
      message: 'Payload content length greater than maximum allowed: 2000000',
    }).code(413);
  }

  const { model } = request.server.app;

  try {
    const imageId = crypto.randomUUID();
    const imageUrl = await uploadImage(image, imageId);

    const { label, confidenceScore } = await predictClassification(model, image); 
    const timestamp = new Date().toISOString(); 

    const data = {
      "imageId": imageUrl,
      "diagnosis": label,
      "confidence": confidenceScore,
      "timestamp": timestamp,
      "userId": userId,
    };
    
    const response = h.response({
      status: 'success',
      message: confidenceScore > 92
        ? 'Image successfully analyzed'
        : 'Image successfully analyzed but under threshold. Please use the correct picture',
      data
    });
    response.code(201);
    return response;

  } catch (error) {
    console.error("Error during prediction:", error);
    return h.response({
      status: 'fail',
      message: error.message || 'An error occurred while making the prediction',
    }).code(400); 
  }
}

module.exports = postPredictHandler;
