import connection from '../../../../bootstrap/db/main/mysql';
import users from './data';

// ts-node ./app_modules/src/model/user/migration/2020-02-26-2/migration.ts

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
                    UPDATE user SET role_user = '${user.role_user}' WHERE id_user = '${user.id_user}'
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
            console.log(item.role_user);
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