import manager            from 'nconf';
import path, {dirname}    from 'path';

export const configDbMongoSession = {
    "host":      "172.17.0.3",
    "port":      "27017",
    "db":        {
        "main": "sessions"
    },
    "user":      "mongoadmin",
    "password":  "secret"
};