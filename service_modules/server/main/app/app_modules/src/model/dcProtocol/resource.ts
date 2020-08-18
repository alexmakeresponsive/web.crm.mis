import pool from '../../bootstrap/db/main/mysql';

export const getItem = (id:string) => {

    const table = 'dc_protocol';
    const query = `SELECT * FROM ${table} WHERE ID = ${id}`;

    return new Promise((resolve, reject) => {
        pool.query(query, (err, rows, fields) => {
            if (err) {
                return reject(err);
            };

            return resolve(rows);
        });
    })
};

export const getList = () => {

    const table = 'dc_protocol';
    const query = `SELECT * FROM ${table}`;

    return new Promise((resolve, reject) => {
        pool.query(query, (err, rows, fields) => {
            if (err) {
                return reject(err);
            };

            return resolve(rows);
        });
    })
};