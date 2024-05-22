import predictClassification from "../services/inferenceService.js";
import crypto from "node:crypto"
import storeData from "../services/storeData.js";

export const postPredictHandler = async (request, h) => {
    const { image } = request.payload;
    const { model } = request.server.app;
    const { confidenceScore, result, suggestion } = await predictClassification(model, image);
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();
   
    const data = {
      "id": id,
      "result": result,
      "suggestion": suggestion,
      "createdAt": createdAt
    }

    let response;

    if (confidenceScore > 99) {
        await storeData(id, data);

        response = h.response({
            status: 'success',
            message: 'Model is predicted successfully.',
            data
          })

        response.code(201);
    } else {
        response = h.response({
            "status": "fail",
            "message": "Terjadi kesalahan dalam melakukan prediksi"
          })

        response.code(400);
    }

    
    return response;
}
