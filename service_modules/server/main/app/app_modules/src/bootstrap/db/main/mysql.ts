import mysql from 'mysql';
import configMysql from '@current/config/db/main/mysql';

const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

var pool = mysql.createPool({
    host:       configMysql[env]['host'],
    database:   configMysql[env]['db'],
    user:       configMysql[env]['user'],
    password:   configMysql[env]['password'],
    connectionLimit: configMysql[env]['connectionLimit'],
});

export default pool;