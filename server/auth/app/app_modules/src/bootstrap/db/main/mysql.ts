import mysql from 'mysql';
import {configDbMysql} from '../../../config/db/main/mysql';

const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

var pool = mysql.createPool({
    host:       configDbMysql[env]['host'],
    database:   configDbMysql[env]['db'],
    user:       configDbMysql[env]['user'],
    password:   configDbMysql[env]['password'],
    connectionLimit: configDbMysql[env]['connectionLimit'],
});

export default pool;