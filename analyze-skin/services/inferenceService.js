const tf = require('@tensorflow/tfjs-node');

async function analyzeClassification(model, image) {
  const tensor = tf.node
    .decodeJpeg(image)
    .resizeNearestNeighbor([224, 224])
    .expandDims()
    .toFloat();

  const predictions = await model.predict(tensor).array();
  const confidenceScore = Math.max(...predictions[0]) * 100;
  const predictedIndex = predictions[0].indexOf(Math.max(...predictions[0]));
  
  const diagnosis = `Diagnosis for index ${predictedIndex}`;
  const treatmentSuggestion = `Suggestion for index ${predictedIndex}`;

  return {
    diagnosis,
    confidenceScore,
    treatmentSuggestion,
  };
}

module.exports = analyzeClassification;
