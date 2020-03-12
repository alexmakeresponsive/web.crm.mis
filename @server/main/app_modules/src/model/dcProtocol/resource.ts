import connection from '../../bootstrap/db/main/mysql';

export const getList = () => {

    const table = 'dc_protocol';
    const query = `SELECT * FROM ${table}`;

    return new Promise((resolve, reject) => {
        connection.query(query, (err, rows, fields) => {
            if (err) {
                return reject(err);
            };

            return resolve(rows);
        });
    })
};