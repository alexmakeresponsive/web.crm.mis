import connection from '../../../../bootstrap/db/main/mysql';
import users from './data';

// ts-node ./app_modules/src/model/user/migration/2020-02-26-4/migration.ts

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

            // ALTER TABLE user MODIFY role_access VARCHAR(255);


            connection.query(`
                    UPDATE user SET role_access = '${user.role_access}' WHERE id_user = '${user.id_user}'
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
            console.log(item.role_access);
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