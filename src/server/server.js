import { server as _server } from '@hapi/hapi';
import routes from './routes.js';
import loadModel from '../services/loadModel.js';
import dotenv from 'dotenv'
 
(async () => {
    dotenv.config()
    const server = _server({
        port: 3000,
        host: '0.0.0.0',
        routes: {
            cors: {
              origin: ['*'],
            },
        },
    });
 
    const model = await loadModel();
    server.app.model = model;
 
    server.route(routes);

    server.ext('onPreResponse', (request, h) => {
        const { response } = request;
    
        if (response.isBoom) {
          const newResponse = h.response({
            status: 'fail',
            message: response.message,
          });
          newResponse.code(response.output.statusCode);
          return newResponse;
        }
    
        return h.continue;
      });
 
    await server.start();
    console.log(`Server start at: ${server.info.uri}`);
})();