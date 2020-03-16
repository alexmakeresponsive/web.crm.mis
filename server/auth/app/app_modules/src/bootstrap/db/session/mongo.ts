const MongoClient = require('mongodb').MongoClient;
import {configDbMongoSession} from '../../../config/db/session/mongo';

const uri = `mongodb://${configDbMongoSession['user']}:${configDbMongoSession['password']}@${configDbMongoSession['host']}:${configDbMongoSession['port']}`;

console.log(uri);

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    // useUnifiedTopology: true
});

export default client;


