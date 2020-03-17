import dotenv from 'dotenv';
const dotenvRes = dotenv.config();

if (dotenvRes.error) {
    throw dotenvRes.error;
}

import express, {NextFunction, Request, Response} from 'express';
import cors         from 'cors';
import createError  from 'http-errors';
import logger       from 'morgan';

import * as routeDcMember    from './route/dcMember';
import * as routeDcProtocol  from './route/dcProtocol';

const app              = express();

app.use(cors({
    // "origin": "http://0.0.0.0:4202",
    "origin": "http://icearea.amrxt.ru/",
    "credentials": true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const prefix = '/api/main/';

app.post(prefix + "dc/member/list",             routeDcMember.getData);
app.post(prefix + "dc/member/item/selected",    routeDcMember.getSelectedData);
app.post(prefix + "dc/protocol/list",           routeDcProtocol.getData);
app.post(prefix + "dc/protocol/item",           routeDcProtocol.getItemData);


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