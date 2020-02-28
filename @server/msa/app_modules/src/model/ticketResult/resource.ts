import connection from '../../bootstrap/db/main/mysql';

const table = 'ticket_result';

export const getData = () => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (err, rows, fields) => {
            if (err) {
                return reject(err);
            };

            return resolve(rows);
        });
    })
};