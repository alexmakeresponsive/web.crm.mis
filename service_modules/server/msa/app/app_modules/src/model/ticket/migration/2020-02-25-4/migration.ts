import connection from '../../../../bootstrap/db/main/mysql';
import schema from "../../schema";


let query = '';

for (let key of Object.keys(schema)) {
    query += key + ' ' + schema[key] + ', '
}
    query = query.slice(0, -2);

// ts-node ./app_modules/src/model/ticket/migration/2020-02-25-4/migration.ts


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

        connection.query(`
                        CREATE TABLE IF NOT EXISTS ticket (
                            ${query}
                        )  ENGINE=INNODB;
                    `, function (error, results, fields) {
            if (error) {
                return connection.rollback(function() {
                    throw error;
                });
            }

            connection.commit(function(err) {
                if (err) {
                    return connection.rollback(function() {
                        throw err;
                    });
                }
                connection.end();
                console.log('Db connect closed')
            });
        });

    });
});