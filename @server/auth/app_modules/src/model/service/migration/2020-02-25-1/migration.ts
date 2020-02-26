import connection from '../../../../bootstrap/db/main/mysql';

// ts-node ./app_modules/src/model/service/migration/2020-02-25-1/migration.ts

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
                        CREATE TABLE IF NOT EXISTS service (
                            id INT PRIMARY KEY AUTO_INCREMENT,
                            id_user INT,
                            id_service VARCHAR(50) NOT NULL,
                            list_user_role VARCHAR(555) NOT NULL
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
