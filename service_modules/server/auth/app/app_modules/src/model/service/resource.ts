import pool from '../../bootstrap/db/main/mysql';

const table = 'service';

export const getServiceData = (id_user:string) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM ${table} WHERE id_user = ?`, [id_user], function (err, rows, fields) {
            if (err) {
                return reject(err);
            };

            return resolve(rows);
        });
    })
};