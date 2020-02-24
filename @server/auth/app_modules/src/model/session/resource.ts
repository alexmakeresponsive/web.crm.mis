import connection from '../../bootstrap/db/user/mysql.js';

const tableName = 'sessions';

let table = {
    findBySessionID: (id) => {
        return new Promise((resolve, reject) => {

            connection.query(`SELECT * FROM ${tableName} WHERE session_id = ?`, [id], function (err, rows, fields) {
                if (err) {
                    return reject(err);
                };

                return resolve(rows);
            });
        })
    }
};

export default table;