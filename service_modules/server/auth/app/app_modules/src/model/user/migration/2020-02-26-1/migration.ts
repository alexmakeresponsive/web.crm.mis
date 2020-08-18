import connection from '../../../../bootstrap/db/main/mysql';

// ts-node ./app_modules/src/model/user/migration/2020-02-26-1/migration.ts

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
                        ALTER TABLE user
                        DROP COLUMN role_user
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

                connection.query(`
                        ALTER TABLE user
                        ADD role_user VARCHAR(20)
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

    });
});