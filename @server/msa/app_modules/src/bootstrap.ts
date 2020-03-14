import app    from './app';
import {configApp} from './config/app/main';

import http from 'http';


var server = http.createServer(app);

const port = configApp['port'];

server.listen(port, () => {
    console.log('msa server started on port '+ port);
});
