import pool from '../../bootstrap/db/main/mysql';

const table = 'user';

export const findByLogin = (login:string) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM ${table} WHERE login_user = ?`, [login], function (err, rows, fields) {
            if (err) {
                return reject(err);
            };

            return resolve(rows);
        });
    })
};