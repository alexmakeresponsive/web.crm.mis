import connection from '../../bootstrap/db/main/mysql';

const table = 'ticket';

export const addItem = (data:any) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (err, rows, fields) => {
            if (err) {
                return reject(err);
            };

            return resolve(rows);
        });
    })
};

