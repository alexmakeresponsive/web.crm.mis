import pool from '../../bootstrap/db/main/mysql';

const table = 'user';

export const findAll = () => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM ${table}`, (err, rows, fields) => {
            if (err) {
                return reject(err);
            };

            return resolve(rows);
        });
    })
};