import {Iterable} from "../../type/Object";

export default <Iterable>{
    id:                                     'INT AUTO_INCREMENT PRIMARY KEY',

    protocol_id:                        'INT', //for join protocol table

    f_2:                                'BOOLEAN',
    f_3:                                'BOOLEAN',
    f_4:                                'DATE',

    f_5:                                'TINYINT',

    f_6_name_last:                              'VARCHAR(50)',
    f_6_name_first:                             'VARCHAR(50)',
    f_6_patronymic:                             'VARCHAR(50)',

    f_7_1:                              'DATE',
    f_7_2:                              'TINYINT',

    f_8:                                'TINYINT',
    f_9:                                'TINYINT',
    f_10:                               'TINYINT',

    f_11_1:                              'VARCHAR(100)',
    f_11_2:                              'MEDIUMINT',
    f_11_3:                              'VARCHAR(100)',
    f_11_4:                              'VARCHAR(100)',
    f_11_5:                              'TINYINT',
    f_11_6:                              'VARCHAR(100)',
    f_11_7:                              'VARCHAR(100)',
    f_11_8:                              'VARCHAR(10)',
    f_11_9:                              'SMALLINT',
    f_11_10:                             'VARCHAR(200)',

    f_12:                                'BOOLEAN',

    f_13:                                'TINYINT',
    f_13_address:                        'VARCHAR(200)',
    f_13_ogrn:                           'BIGINT',


    f_14_1:                              'VARCHAR(200)',
    f_14_2:                              'VARCHAR(100)',

    f_15:                                'BIGINT',

    f_16_1:                              'VARCHAR(20)',
    f_16_2_series:                       'SMALLINT',
    f_16_2_number:                       'MEDIUMINT',
    f_16_3:                              'VARCHAR(200)',
    f_16_4:                              'VARCHAR(20)',

    f_17_1_1:                             'VARCHAR(20)',
    f_17_1_2_series:                      'SMALLINT',
    f_17_1_2_number:                      'MEDIUMINT',
    f_17_1_3:                             'VARCHAR(200)',
    f_17_1_4:                             'VARCHAR(20)',

    f_17_2_1:                             'VARCHAR(20)',
    f_17_2_2_series:                      'SMALLINT',
    f_17_2_2_number:                      'MEDIUMINT',
    f_17_2_3:                             'VARCHAR(200)',
    f_17_2_4:                             'VARCHAR(20)',

    f_17_3_1:                             'VARCHAR(200)',
    f_17_3_2:                             'VARCHAR(100)',
    f_17_4:                               'BIGINT',

    f_17_5_1:                             'VARCHAR(200)',
    f_17_5_2:                             'VARCHAR(100)',
    f_17_5_3:                             'BIGINT',

    f_18:                               'TINYINT',     // msa_level

    f_19_1:                              'TINYINT',
    f_19_2:                              'VARCHAR(20)',
    f_19_3:                              'TINYINT',
    f_19_4:                              'TINYINT',
    f_19_5:                              'TINYINT',
    f_19_6:                              'TINYINT',
    f_19_7:                              'VARCHAR(20)',
    f_19_8:                              'TINYINT',

    f_20_1:                                'VARCHAR(200)',
    f_20_2_1:                              'TINYINT',
    f_20_2_2:                              'TINYINT',
    f_20_2_3:                              'VARCHAR(20)',
    f_20_3:                                'VARCHAR(50)',

    f_21_1:                              'VARCHAR(50)',
    f_21_2:                              'VARCHAR(50)',
    f_21_3:                              'TINYINT',
    f_21_4:                              'VARCHAR(200)',
    f_21_5:                              'VARCHAR(200)',
    f_21_6:                              'VARCHAR(100)',
    f_21_7:                              'VARCHAR(200)',

    f_22:                               'SMALLINT',

    f_23:                               'VARCHAR(1000)',
    f_24:                               'VARCHAR(1000)',
    f_25:                               'TEXT',

    f_25_1:                              'BOOLEAN',
    f_25_2:                              'BIGINT',

    f_26_programm_number:               'VARCHAR(50)',
    f_26_protol_number:                 'VARCHAR(50)',

    f_26_1:                             'BOOLEAN',
    f_26_2:                             'BOOLEAN',

    f_27_1:                              'DECIMAL(5,2)',
    f_27_2:                              'DECIMAL(5,2)',
    f_27_3:                              'SMALLINT',
    f_27_4:                              'VARCHAR(20)',
    f_27_5:                              'DECIMAL(7,2)',
    f_27_6_1:                            'DECIMAL(3,1)',
    f_27_6_2:                            'DECIMAL(3,1)',
    f_27_7:                              'DECIMAL(2,1)',
    f_27_8:                              'VARCHAR(20)',

    f_28:                               'TEXT',
    f_29:                               'TEXT',

    f_30_1:                              'TEXT',
    f_30_2:                              'VARCHAR(20)',
    f_30_3:                              'TEXT',
    f_30_4:                              'TEXT',
    f_30_5:                              'VARCHAR(100)',
    f_30_6:                              'TEXT',

    f_31:                               'VARCHAR(20)',
    f_32:                               'VARCHAR(20)',
    f_33:                               'VARCHAR(20)',
    f_34:                               'TEXT',
    f_35:                               'TEXT',
    f_36:                               'TEXT',
    f_37:                               'TEXT'
};
