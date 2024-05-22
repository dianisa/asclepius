import tf from '@tensorflow/tfjs-node'
 
async function predictClassification(model, image) {
  const tensor = tf.node
    .decodeJpeg(image)
    .resizeNearestNeighbor([224, 224])
    .expandDims()
    .toFloat()
 
  const prediction = model.predict(tensor);
  const score = await prediction.data();
  const confidenceScore = Math.max(...score) * 100;
 
  const classes = ['Cancer', 'Non-cancer'];
 
  const classResult = tf.argMax(prediction, 1).dataSync()[0];
  const result = classes[classResult];
 
  let suggestion;
 
  if (result === 'Cancer') {
    suggestion = "Segera periksa ke dokter!"
  }
 
  if (result === 'Non-cancer') {
    suggestion = "Anda sehat!"
  }
 
  return { confidenceScore, result, suggestion };
}
 
export default predictClassification;