import connection from '../../bootstrap/db/main/mysql';

const table = 'ticket';

export const addItem = (data:any) => {
    return new Promise((resolve, reject) => {
        connection.query(`
            INSERT INTO ${table} 
                (
                item_6_name_last, 
                item_6_name_first, 
                item_6_patronymic
                ) 
            VALUES (
                '${data.field_6_name.field_6_name_last}',
                '${data.field_6_name.field_6_name_first}',
                '${data.field_6_name.field_6_name_patronymic}'
                )
        `, (err, rows, fields) => {
            if (err) {
                return reject(err);
            };

            return resolve(rows);
        });
    })
};

