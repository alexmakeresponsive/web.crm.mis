import pool from '../../bootstrap/db/main/mysql';

const table = 'client';

export const removeOldRefreshData = (id_user:string) => {
    return new Promise((resolve, reject) => {
        pool.query(`DELETE FROM ${table} WHERE id_user = ?`, [id_user], (err, rows, fields) => {
            if (err) {
                return reject(err);
            };

            return resolve(rows);
        });
    })
};

// mysql> INSERT INTO client (id_user, timestemp_expired, datetime_expired, secret_word) VALUES (144, 1231231223213, '2020-02-27 01:00:00', 'some secret' );
export const setNewRefreshData = (data:any) => {
    return new Promise((resolve, reject) => {
        pool.query(`
                INSERT INTO ${table} (id_user, timestemp_expired, datetime_expired, secret_word) 
                VALUES (${data.id_user}, '${data.timestemp_expired}', '${data.datetime_expired}', '${data.secret_word}')
            `, (err, rows, fields) => {
            if (err) {
                return reject(err);
            };

            return resolve(rows);
        });
    })
};

export const findOldRefreshData = (decodedRefreshTokenOld:any) => {
    return new Promise((resolve, reject) => {
        pool.query(`
                SELECT * FROM ${table} WHERE 
                id_user = ${decodedRefreshTokenOld.id_user} AND 
                timestemp_expired = '${decodedRefreshTokenOld.timestemp_expired}' AND 
                datetime_expired = '${decodedRefreshTokenOld.datetime_expired}'
            `, (err, rows, fields) => {
            if (err) {
                return reject(err);
            };

            return resolve(rows);
        });
    })
};