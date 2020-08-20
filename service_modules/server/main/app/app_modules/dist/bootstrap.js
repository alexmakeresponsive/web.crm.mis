const app    = require('./node_modules/@current/app');
const config = require('./node_modules/@current/config/app/main');

const http   = require('http');

const server = http.createServer(app.default);
const port   = config.default['port'];

server.listen(port, () => {
    console.log('main server started on port '+ port);
});
