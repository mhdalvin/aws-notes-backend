const Hapi = require('@hapi/hapi');
const routes = require('./routes');

(async () => {
    const server = Hapi.server({
        port: 5000,
        // host: 'localhost',
        /* routes: {
            cors: {
                origin: ['*'],
                additionalHeaders: [
                    'User-Agent',
                    'Cache-Control',
                    'Postman-Token',
                    'Host',
                    'Accept-Encoding',
                    'Connection',
                    'Content-Length',
                ],
                additionalExposedHeaders: [
                    'Access-Control-Allow-Origin',
                ]
            }
        } */
    });

    /**
     * #1
     * Hapi.server({ routes: cors: { ... }}) tidak berhasil, sehingga pakai cara ini
     * 
     * @see https://www.npmjs.com/package/hapi-cors-headers
     * @see https://github.com/gr2m/hapi-cors-headers/blob/master/index.js
     * 
     * #2
     * Chrome memblokir request dari publik non-HTTPS ke local network (127.0.0.0/8)
     * @see https://stackoverflow.com/questions/66534759/chrome-cors-error-on-request-to-localhost-dev-server-from-remote-site
     */
    server.ext('onPreResponse', (request, h) => {
        let response = request.response.output || request.response;
        
        response.headers['Access-Control-Allow-Origin'] = '*';
        response.headers['Access-Control-Allow-Methods'] = '*';
        response.headers['Access-Control-Allow-Headers'] = '*';
        response.headers['Access-Control-Allow-Credentials'] = true;
        
        return h.continue;
    });

    server.route(routes);

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
})();
