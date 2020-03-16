import connection from '../../../../bootstrap/db/main/mysql';

// ts-node ./app_modules/src/model/user/migration/2020-03-12-1/migration.ts

connection.beginTransaction(function(err) {
    if (err) { throw err; }
    connection.query(`
                CREATE DATABASE IF NOT EXISTS main
            `, function (error, results, fields) {
        if (error) {
            return connection.rollback(function() {
                throw error;
            });
        }
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
                            id_user INT PRIMARY KEY,
                            role CHAR(25) NOT NULL,
                            role_access CHAR(25) NOT NULL
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
});
