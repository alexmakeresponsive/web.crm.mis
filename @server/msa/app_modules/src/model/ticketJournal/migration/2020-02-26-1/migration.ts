import connection from '../../../../bootstrap/db/msa/mysql';


// ts-node ./app_modules/src/model/ticketJournal/migration/2020-02-26-1/migration.ts


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
                        CREATE TABLE IF NOT EXISTS ticketJournal (
                            id INT AUTO_INCREMENT PRIMARY KEY,
                            date DATE,

                            name_last VARCHAR(20),
                            name_first VARCHAR(20),
                            patronymic VARCHAR(20),
                        
                            gender VARCHAR(10),
                            date_born DATE,
                        
                            diagnosis TEXT,
                            msa_level VARCHAR(20),
                        
                            commission_members VARCHAR(555),
                            status VARCHAR(20),
                        
                            msa_date DATE,
                            
                            result VARCHAR(20)
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