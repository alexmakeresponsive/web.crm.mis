import express, {NextFunction, Request, Response} from 'express';
import cors         from 'cors';
import createError  from 'http-errors';
import logger       from 'morgan';
import session      from 'express-session';
import connectSessoinMongo from 'connect-mongo';
import {configDbMongoSession} from './config/db/session/mongo';
import * as routeAnn  from './route/ann';


const app              = express();
const MongoStore = connectSessoinMongo(session);


app.use(cors({
    "origin": "http://0.0.0.0:4202",
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
        maxAge: 1000 * 60 * 4
    },
    name: 'mongo.session_id',
    store: new MongoStore({
        url: `mongodb://${configDbMongoSession['user']}:${configDbMongoSession['password']}@${configDbMongoSession['host']}:${configDbMongoSession['port']}`,
    })
}));

// auth - name of server
app.post("/auth/login",  routeAnn.login);
app.post("/auth/logout", routeAnn.logout);
app.get("/auth/check",  routeAnn.check);


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