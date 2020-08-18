import connection from '../../../../bootstrap/db/main/mysql';
import users from './data';

// ts-node ./app_modules/src/model/ticketResult/migration/2020-02-27-1/migration.ts

connection.beginTransaction(function(err) {
    if (err) { throw err; }
    connection.query(`
                    USE main
                `, function (error, results, fields) {
        if (error) {
            return connection.rollback(function() {
                throw error;
            });
        }

        function insert(user:any) {
            // return new Promise(resolve => setTimeout(resolve, 300));

            connection.query(`
                    INSERT INTO ticket_result (date, name_last, name_first, patronymic, gender, date_born, diagnosis, msa_level, commission_members, status)
                    VALUES ('${user.date}', '${user.name_last}', '${user.name_first}', '${user.patronymic}', '${user.gender}', '${user.date_born}', '${user.diagnosis}', '${user.msa_level}', '${user.commission_members}', '${user.status}')
                    `, function (error, results, fields) {
                if (error) {
                    return connection.rollback(function() {
                        throw error;
                    });
                }
            });
        }

        async function insertItem(item:any) {
            await insert(item);
            console.log(item.date);
        }

        async function processData(array:any) {
            for (const item of array) {
                await insertItem(item);
            }

            connection.commit(function(err) {
                if (err) {
                    return connection.rollback(function() {
                        throw err;
                    });
                }
                console.log('Transaction success!');
                connection.end();
                console.log('Db connect closed')
            });
        }
        processData(users);

    });
});