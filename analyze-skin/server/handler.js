const analyzeClassification = require('../services/inferenceService');
const crypto = require('crypto');
const storeData = require('../services/storeData');

async function postAnalyzeHandler(request, h) {
  try {
    const { image } = request.payload; 
    const { model } = request.server.app; 
    const { diagnosis, confidenceScore, treatmentSuggestion } = await analyzeClassification(model, image); 
    
    const id = crypto.randomUUID(); 
    const timestamp = new Date().toISOString(); 
    const userId = request.auth.credentials?.userId; 

    const data = {
      imageId: id, 
      diagnosis: diagnosis,
      confidence: confidenceScore,
      treatmentSuggestions: treatmentSuggestion,
      timestamp: timestamp,
      user_id: userId,
    };

    await storeData(id, data);

    const response = h.response({
      message: confidenceScore > 99 
        ? 'Image successfully analyzed.' 
        : 'Image successfully analyzed but under threshold. Please use the correct picture.',
      result: data,
    });
    response.code(201);
    return response;
  } catch (error) {
    console.error(error);
    throw new InputError('Failed to analyze the image.');
  }
}

module.exports = postAnalyzeHandler;
