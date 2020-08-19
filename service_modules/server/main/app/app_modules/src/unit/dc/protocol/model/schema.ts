import {Schema} from "@commonNodeLibs/type/db/schema";

export default <Schema>{
    id:                                     'INT AUTO_INCREMENT PRIMARY KEY',

    number:                                 'VARCHAR(50)',
    date:                                   'DATETIME',
    description:                            'VARCHAR(200)',
};
