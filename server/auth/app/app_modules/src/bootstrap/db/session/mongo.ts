const MongoClient = require('mongodb').MongoClient;
import {configDbMongoSession} from '../../../config/db/session/mongo';

const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

const uri = `mongodb://${configDbMongoSession[env]['user']}:${configDbMongoSession[env]['password']}@${configDbMongoSession[env]['host']}:${configDbMongoSession[env]['port']}`;

console.log(uri);

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    // useUnifiedTopology: true
});

export default client;


