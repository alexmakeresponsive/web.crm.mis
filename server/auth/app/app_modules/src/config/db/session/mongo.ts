type IterableInner = { [index: string]: string; };
type Iterable    = { [index: string]: IterableInner; };

export const configDbMongoSession = <Iterable>{
    'development': <IterableInner>{
        "host":      process.env.DB_SESSION_LOCAL_HOST,
        "port":      process.env.DB_SESSION_LOCAL_PORT,
        "db":        "sessions",
        "user":      "mongoadmin",
        "password":  "secret"
    },
    'production': <IterableInner>{
        "host":      process.env.DB_SESSION_PRODUCTION_HOST,
        "port":      process.env.DB_SESSION_PRODUCTION_PORT,
        "db":        "sessions",
        "user":      "mongoadmin",
        "password":  "secret"
    }
};