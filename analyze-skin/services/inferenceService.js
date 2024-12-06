const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');

const labels = [
  "Acne",
  "Actinic Cheilitis",
  "Basal Cell Carcinoma",
  "Bullous Disease",
  "Cacar Air",
  "Eczema",
  "Skin Cancer",
  "Urticaria Hives"
];

async function predictClassification(model, image) {
  try {
    const tensor = tf.node
        .decodeJpeg(image)
        .resizeNearestNeighbor([180, 180]) 
        .expandDims() 
        .toFloat();

    const prediction = model.predict(tensor);
    const scores = await prediction.data();
    const predictedClass = scores.indexOf(Math.max(...scores));  
    const confidenceScore = scores[predictedClass] * 100;  
    const label = labels[predictedClass]; 

    return { confidenceScore, label };
  } catch (error) {
      console.error("Prediction error:", error);
      throw new InputError(`Error in prediction: ${error.message}`);
  }
}

module.exports = { predictClassification };
