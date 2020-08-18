import connection from '../../../../../bootstrap/db/main/mysql';
import members from './data';

// ts-node ./app_modules/src/model/dcProtocol/migration/2020-03-12-6/migration.ts

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

        function insert(member:any) {
            let keys   = '';
            let values = '';

            for (let key of Object.keys(member)) {
                keys   += key       + ', ';
                values += '"' + member[key] + '"' + ', ';
            }

            keys   = keys.slice(0, -2);
            values = values.slice(0, -2);

            let query = `INSERT INTO dc_protocol (${keys}) VALUES (${values})`;

            connection.query(query, function (error, results, fields) {
                if (error) {
                    console.log('error');
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
        processData(members);

    });
});