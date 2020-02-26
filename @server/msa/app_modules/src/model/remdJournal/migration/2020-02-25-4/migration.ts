import connection from '../../../../bootstrap/db/msa/mysql';

// ts-node ./app_modules/src/model/remdJournal/migration/2020-02-25-4/migration.ts

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
                        CREATE TABLE IF NOT EXISTS remd_journal (
                            id INT AUTO_INCREMENT PRIMARY KEY,
                            title VARCHAR(20),
                            initiator_name VARCHAR(70),
                            initiator_post VARCHAR(50),
                            date_departure DATETIME,
                            status VARCHAR(20)
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
