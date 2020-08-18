import pool from '../../../../bootstrap/db/main/mysql';

export const getList = () => {

    const table = 'dc_member';
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

export const getListSelected = (idListStr:any) => {

    const table = 'dc_member';
    const query = `SELECT * FROM ${table} WHERE id IN (${idListStr})`;

    return new Promise((resolve, reject) => {
        pool.query(query, (err, rows, fields) => {
            if (err) {
                return reject(err);
            };

            return resolve(rows);
        });
    })
};