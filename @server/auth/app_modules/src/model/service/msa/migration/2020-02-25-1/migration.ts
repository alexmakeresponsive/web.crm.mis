import connection from '../../../../../bootstrap/db/main/mysql';

// ts-node ./app_modules/src/model/service/msa/migration/2020-02-25-1/migration.ts

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
                        CREATE TABLE IF NOT EXISTS service_msa (
                            id_user INT PRIMARY KEY,
                            token_type CHAR(25) NOT NULL,
                            token_signature_secret VARCHAR(255) NOT NULL,
                            token_timestamp_expired TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
