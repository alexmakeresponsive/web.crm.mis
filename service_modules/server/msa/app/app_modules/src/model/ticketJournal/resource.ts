import pool from '../../bootstrap/db/main/mysql';

const table = 'ticket';

export const getData = () => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM ${table}`, (err, rows, fields) => {
            if (err) {
                return reject(err);
            };

            return resolve(rows);
        });
    })
};

export const removeItem = (id:string) => {
    return new Promise((resolve, reject) => {
        pool.query(`DELETE FROM ${table} WHERE id = ${id}`, (err, rows, fields) => {
            if (err) {
                return reject(err);
            };

            return resolve(rows);
        });
    })
};