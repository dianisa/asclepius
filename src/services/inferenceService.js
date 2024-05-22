import tf from '@tensorflow/tfjs-node'
import InputError from '../exceptions/InputError.js';
 
async function predictClassification(model, image) {
    try {
        const tensor = tf.node
            .decodeJpeg(image)
            .resizeNearestNeighbor([224, 224])
            .expandDims()
            .toFloat()
        
        const prediction = model.predict(tensor);
        const score = await prediction.data();
        
        let suggestion;
        let result = null;

        if (score[0] > 0.5) {
            result = "Cancer"
            suggestion = "Segera periksa ke dokter!"
        }
        
        if (score[0] <= 0.5) {
            result = "Non-cancer"
            suggestion = "Anda sehat!"
        }

        return { result, suggestion };

    } catch (error) {
        return new InputError('Terjadi kesalahan dalam melakukan prediksi');
    }
}
 
export default predictClassification;