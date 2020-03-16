import connection from '../../../../bootstrap/db/main/mysql';

// ts-node ./app_modules/src/model/user/migration/2020-02-18-1/migration.ts

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
                        CREATE TABLE IF NOT EXISTS user (
                            id_user INT AUTO_INCREMENT PRIMARY KEY,
                            name_user VARCHAR(255) NOT NULL,
                            status_user TINYINT NOT NULL,
                            role_user TINYINT NOT NULL,
                            description_user TEXT,
                            password_hash_user VARCHAR(255) NOT NULL,
                            salt_user VARCHAR(255) NOT NULL,
                            created_at_user TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
                console.log('Transaction success!');
                connection.end();
                console.log('Db connect closed')
            });
        });

    });
});