import mysql from 'mysql';
import config from '../../../config/db/main/mysql';

var connection = mysql.createConnection({
    host:       config.get('host'),
    database:   config.get('db').main,
    user:       config.get('user'),
    password:   config.get('password'),
});

connection.connect((error) => {
    if(error) {
        throw error;
    }
    console.log('Db connected success');
});

export default connection;