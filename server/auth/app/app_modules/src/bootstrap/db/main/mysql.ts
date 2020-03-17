import mysql from 'mysql';
import {configDbMysql} from '../../../config/db/main/mysql';

const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

var connection = mysql.createConnection({
    host:       configDbMysql[env]['host'],
    database:   configDbMysql[env]['db'],
    user:       configDbMysql[env]['user'],
    password:   configDbMysql[env]['password'],
});

connection.connect((error) => {
    if(error) {
        throw error;
    }
    console.log('Db connected success');
});

export default connection;