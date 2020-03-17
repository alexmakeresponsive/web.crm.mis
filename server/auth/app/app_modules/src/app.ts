import dotenv from 'dotenv';
const dotenvRes = dotenv.config();

if (dotenvRes.error) {
    throw dotenvRes.error;
}

import express, {NextFunction, Request, Response} from 'express';
import cors         from 'cors';
import createError  from 'http-errors';
import logger       from 'morgan';
import session      from 'express-session';
import connectSessoinMongo from 'connect-mongo';
import {configDbMongoSession} from './config/db/session/mongo';
import * as routeAnn  from './route/ann';



const env             = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
const app              = express();
const MongoStore = connectSessoinMongo(session);


app.use(cors({
    // "origin": "http://0.0.0.0:4202",
    "origin": "http://icearea.amrxt.ru/",
    "credentials": true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: 'many-to-many',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 15
    },
    name: 'mongo.session_id',
    store: new MongoStore({
        url: `mongodb://${configDbMongoSession[env]['user']}:${configDbMongoSession[env]['password']}@${configDbMongoSession[env]['host']}:${configDbMongoSession[env]['port']}`,
    })
}));

const prefix = '/api/auth/';    // use in nginx.conf

// auth - name of server
app.post(prefix + "login",  routeAnn.login);
app.post(prefix + "logout", routeAnn.logout);
app.post(prefix + "refresh", routeAnn.refresh);
app.get(prefix + "check",  routeAnn.check);


app.use(function(req, res, next) {
    console.log('mid1?');
    next(createError(404));
});

app.use(function(err:any, req:Request, res:Response, next:NextFunction) {
    console.log('mid2?');
    res.json({
        type:   'error',
        code:   500,
        status:  err.status,
        message: err.message,
    });
});

export default app;