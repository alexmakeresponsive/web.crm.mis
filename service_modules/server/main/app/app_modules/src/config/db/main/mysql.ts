type IterableInner = {
    "host":         string,
    "port":         string,
    "db":           string,
    "user":         string,
    "password":     string,
    "connectionLimit": number
};
type Iterable    = { [index: string]: IterableInner; };

let connectionLimitDevelopment = process.env.DB_MAIN_LOCAL_LIMIT_CONNECTION === undefined ? "1" : process.env.DB_MAIN_LOCAL_LIMIT_CONNECTION;
let connectionLimitProduction  = process.env.DB_MAIN_PRODUCTION_LIMIT_CONNECTION === undefined ? "1" : process.env.DB_MAIN_PRODUCTION_LIMIT_CONNECTION;

export default <Iterable>{
    'development': <IterableInner>{
        "host":      process.env.DB_MAIN_LOCAL_HOST,
        "port":      process.env.DB_MAIN_LOCAL_PORT,
        "db":        "main",
        "user":      "nodeuser",
        "password":  "U^O&Tg2e23%^fH",
        "connectionLimit": parseInt(connectionLimitDevelopment , 10)
    },
    'production': <IterableInner>{
        "host":      process.env.DB_MAIN_PRODUCTION_HOST,
        "port":      process.env.DB_MAIN_PRODUCTION_PORT,
        "db":        "main",
        "user":      "nodeuser",
        "password":  "U^O&Tg2e23%^fH",
        "connectionLimit": parseInt(connectionLimitProduction, 10)
    },
};