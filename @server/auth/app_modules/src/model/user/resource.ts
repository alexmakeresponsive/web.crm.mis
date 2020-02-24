import connection from '../../bootstrap/db/user/mysql.js';

const table = 'users';

var db = {
    all: () => {
        return new Promise((resolve, reject) => {

            connection.query(`SELECT * FROM ${table}`, function (err, rows, fields) {
                if (err) {
                    return reject(err);
                };

                // console.log('The solution is: ', JSON.stringify(rows));
                // next();
                return resolve(rows);
            });

            // res.json({hola:1});
            // connection.end();
        })
    },

    one: (id) => {
        return new Promise((resolve, reject) => {

            connection.query(`SELECT * FROM ${table} WHERE id_user = ?`, [id], function (err, rows, fields) {
                if (err) {
                    return reject(err);
                };

                // console.log('The solution is: ', JSON.stringify(rows));
                // next();
                // console.log(rows);
                return resolve(rows);
            });

            // res.json({hola:1});
            // connection.end();
        })
    },

    findByLogin: (login) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM ${table} WHERE login_user = ?`, [login], function (err, rows, fields) {
                if (err) {
                    return reject(err);
                };

                // console.log('The solution is: ', JSON.stringify(rows));
                // next();
                // console.log(rows);

                return resolve(rows);
            });

            // res.json({hola:1});
            // connection.end();
        })
    }
};

export default db;