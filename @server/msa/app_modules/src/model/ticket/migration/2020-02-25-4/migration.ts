import connection from '../../../../bootstrap/db/main/mysql';


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
                            id INT AUTO_INCREMENT PRIMARY KEY,
                            medical_organization_name VARCHAR(255),
                            medical_organization_address VARCHAR(255),
                            medical_organization_address_ogrn VARCHAR(20),
                            protocol_number VARCHAR(50),
                            protocol_date DATE,
                            
                            item_2 BOOLEAN,
                            item_3 BOOLEAN,
                            item_4 DATE,
                        
                            item_51 BOOLEAN,
                            item_52 BOOLEAN,
                            item_53 BOOLEAN,
                            item_54 BOOLEAN,
                            item_55 BOOLEAN,
                            item_56 BOOLEAN,
                            item_57 BOOLEAN,
                            item_58 BOOLEAN,
                            item_59 BOOLEAN,
                            item_510 BOOLEAN,
                            item_511 BOOLEAN,
                            item_512 BOOLEAN,
                            item_513 BOOLEAN,
                            item_514 BOOLEAN,
                        
                            item_6_name_last VARCHAR(20),
                            item_6_name_first VARCHAR(20),
                            item_6_patronymic VARCHAR(20),
                        
                            item_7 DATE,
                            item_8 VARCHAR(10),
                            item_9 VARCHAR(20),
                            item_10 VARCHAR(20),
                        
                            item_111 VARCHAR(255),
                            item_112 VARCHAR(20),
                            item_113 VARCHAR(255),
                            item_114 VARCHAR(255),
                            item_115 VARCHAR(10),
                            item_116 VARCHAR(255),
                            item_117 VARCHAR(255),
                            item_118 VARCHAR(10),
                            item_119 VARCHAR(10),
                            item_1110 VARCHAR(555),
                        
                            item_12 BOOLEAN,
                        
                            item_13 VARCHAR(20),
                            item_13_address_1 VARCHAR(555),
                            item_13_ogrn_1 VARCHAR(20),
                            item_13_address_2 VARCHAR(555),
                            item_13_ogrn_2 VARCHAR(20),
                            item_13_address_3 VARCHAR(555),
                            item_13_ogrn_3 VARCHAR(20),
                        
                            item_141 VARCHAR(100),
                            item_142 VARCHAR(50),
                        
                            item_15 VARCHAR(20),
                        
                            item_161 VARCHAR(50),
                            item_162_series SMALLINT,
                            item_162_number MEDIUMINT,
                            item_163 VARCHAR(255),
                            item_164 DATE,
                        
                            item_1711 VARCHAR(50),
                            item_1712_series SMALLINT,
                            item_1712_number MEDIUMINT,
                            item_1713 VARCHAR(255),
                            item_1714 DATE,
                        
                            item_1721 CHAR(50),
                            item_1722_series SMALLINT,
                            item_1722_number MEDIUMINT,
                            item_1723 VARCHAR(255),
                            item_1724 DATE,
                        
                            item_1731 VARCHAR(50),
                            item_1732 VARCHAR(100),
                            item_174 DATE,
                        
                            item_1751 VARCHAR(255),
                            item_1752 VARCHAR(555),
                            item_1753 VARCHAR(20),
                        
                            item_18 VARCHAR(10),
                        
                            item_191 VARCHAR(20),
                            item_192 DATE,
                            item_193 VARCHAR(20),
                            item_194 VARCHAR(20),
                            item_195 VARCHAR(20),
                            item_196 TINYINT,
                            item_197 DATE,
                            item_198 VARCHAR(555),
                        
                            item_201 VARCHAR(255),
                            item_202 VARCHAR(20),
                            item_203 VARCHAR(50),
                        
                            item_211 VARCHAR(50),
                            item_212 VARCHAR(50),
                            item_213 TINYINT,
                            item_214 VARCHAR(255),
                            item_215 VARCHAR(255),
                            item_216 VARCHAR(255),
                            item_217 VARCHAR(255),
                        
                            item_22 SMALLINT,
                        
                            item_23 TEXT,
                            item_24 TEXT,
                            item_25 TEXT,
                            item_251 BOOLEAN,
                            item_252 VARCHAR(20),
                        
                            item_26_programm_number VARCHAR(20),
                            item_26_protol_number VARCHAR(20),
                            item_26_protol_date DATE,
                            item_26_status VARCHAR(20),
                            item_26_description TEXT,
                        
                            item_271 DECIMAL(5,2),
                            item_272 DECIMAL(5,2),
                            item_273 SMALLINT,
                            item_274 VARCHAR(20),
                            item_275 DECIMAL(7,2),
                            item_2761 DECIMAL(3,1),
                            item_2762 DECIMAL(3,1),
                            item_277 DECIMAL(2,1),
                            item_278 VARCHAR(20),
                        
                            item_28 TEXT,
                            item_29 TEXT,
                            
                            item_301 TEXT,
                            item_302 VARCHAR(20),
                            item_303 TEXT,
                            item_304 TEXT,
                            item_305 VARCHAR(100),
                            item_306 TEXT,
                        
                            item_31 VARCHAR(20),
                            item_32 VARCHAR(20),
                            item_33 VARCHAR(20),
                            item_34 TEXT,
                            item_35 TEXT,
                            item_36 TEXT,
                            item_37 TEXT,
                        
                            medical_commission_president VARCHAR(255),
                            medical_commission_members TEXT
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