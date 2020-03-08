import connection from '../../bootstrap/db/main/mysql';

export const addItem = (data:any) => {

    const table = 'ticket';
    const query = `INSERT INTO ${table} (${data.keys}) VALUES (${data.values})`;

    return new Promise((resolve, reject) => {
        connection.query(query, (err, rows, fields) => {
            if (err) {
                return reject(err);
            };

            return resolve(rows);
        });
    })
};

export const updateItem = (data:any) => {

    const table = 'ticket';
    const query = `UPDATE ${table} SET ${data.query} WHERE id = ${data.id}`;

    return new Promise((resolve, reject) => {
        connection.query(query, (err, rows, fields) => {
            if (err) {
                return reject(err);
            };

            return resolve(rows);
        });
    })
};

