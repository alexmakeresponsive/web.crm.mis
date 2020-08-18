import Schema from "type/schema/db";

export default <Schema>{
    id:                                     'SMALLINT AUTO_INCREMENT PRIMARY KEY',

    name_last:                              'VARCHAR(50)',
    name_first:                             'VARCHAR(50)',
    name_patronymic:                        'VARCHAR(50)',

    position:                               'VARCHAR(150)',
    department:                             'VARCHAR(150)',
    submissionLevel:                        'VARCHAR(150)',
};
