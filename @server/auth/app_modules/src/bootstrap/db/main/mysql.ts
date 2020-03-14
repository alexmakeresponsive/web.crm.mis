import mysql from 'mysql';
import {configDbMysql} from '../../../config/db/main/mysql';

var connection = mysql.createConnection({
    host:       configDbMysql['host'],
    database:   configDbMysql['db'].main,
    user:       configDbMysql['user'],
    password:   configDbMysql['password'],
});

connection.connect((error) => {
    if(error) {
        throw error;
    }
    console.log('Db connected success');
});

export default connection;