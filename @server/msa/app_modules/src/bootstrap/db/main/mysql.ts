import mysql from 'mysql';
import {configMysql} from '../../../config/db/main/mysql';

var connection = mysql.createConnection({
    host:       configMysql['host'],
    database:   configMysql['db'].main,
    user:       configMysql['user'],
    password:   configMysql['password'],
});

connection.connect((error) => {
    if(error) {
        throw error;
    }
    console.log('msa db connected success');
});

export default connection;