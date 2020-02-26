import mysql from 'mysql';
import config from '../../../config/db/msa/mysql';

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
    console.log('msa db connected success');
});

export default connection;