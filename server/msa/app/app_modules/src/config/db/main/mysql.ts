import dotenv from 'dotenv';
       dotenv.config();

type IterableInner = { [index: string]: string; };
type Iterable    = { [index: string]: IterableInner; };

export const configMysql = <Iterable>{
    'development': <IterableInner>{
        "host":      process.env.DB_MAIN_LOCAL_HOST,
        "port":      process.env.DB_MAIN_LOCAL_PORT,
        "db":        "main",
        "user":      "nodeuser",
        "password":  "U^O&Tg2e23%^fH"
    },
    'production': <IterableInner>{
        "host":      process.env.DB_MAIN_PRODUCTION_HOST,
        "port":      process.env.DB_MAIN_PRODUCTION_PORT,
        "db":        "main",
        "user":      "nodeuser",
        "password":  "U^O&Tg2e23%^fH"
    },
};