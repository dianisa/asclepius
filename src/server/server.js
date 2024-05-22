import { server as _server } from '@hapi/hapi';
import routes from './routes.js';
import loadModel from '../services/loadModel.js';
import InputError from '../exceptions/InputError.js';
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
 
    await server.start();
    console.log(`Server start at: ${server.info.uri}`);
})();