import { postPredictHandler } from "./handler.js";

const routes = [
    {
        method: 'POST',
        path: '/predict',
        handler: postPredictHandler,
        options: {
            payload: {
              allow: 'multipart/form-data',
              multipart: true,
              maxBytes: 1000000,
            }
          }
    },
];

export default routes;