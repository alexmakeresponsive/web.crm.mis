import express, {NextFunction, Request, Response} from 'express';
import cors         from 'cors';
import createError  from 'http-errors';
import logger       from 'morgan';
import session      from 'express-session';
import connectSessoinMongo from 'connect-mongo';


const app              = express();
const MongoStore = connectSessoinMongo(session);


import * as routeAnn  from './route/ann';

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
        maxAge: 1000 * 60
    },
    name: 'mongo.session_id',
    store: new MongoStore({
        url: 'mongodb://mongoadmin:secret@172.17.0.2:27017',
    })
}));


app.post("/ann/login",  routeAnn.login);
app.post("/ann/logout", routeAnn.logout);
app.get("/ann/check",  routeAnn.check);


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