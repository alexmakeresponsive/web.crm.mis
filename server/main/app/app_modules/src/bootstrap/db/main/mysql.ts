import mysql from 'mysql';
import {configMysql} from '../../../config/db/main/mysql';

const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

var connection = mysql.createConnection({
    host:       configMysql[env]['host'],
    database:   configMysql[env]['db'],
    user:       configMysql[env]['user'],
    password:   configMysql[env]['password'],
});

connection.connect((error) => {
    if(error) {
        throw error;
    }
    console.log('msa db connected success');
});

export default connection;