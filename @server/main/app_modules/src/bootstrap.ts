import app    from './app';
import config from './config/app/main';

import http from 'http';


var server = http.createServer(app);

const port = config.get('port');

server.listen(port, () => {
    console.log('main server started on port '+ port);
});
