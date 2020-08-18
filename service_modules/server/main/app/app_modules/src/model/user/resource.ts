import pool from '../../bootstrap/db/main/mysql';

const table = 'user';

export const findByIdUser = (id_user:string) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM ${table} WHERE id_user = ${id_user}`, (err, rows, fields) => {
            if (err) {
                return reject(err);
            };

            return resolve(rows);
        });
    })
};