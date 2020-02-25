import express, {NextFunction, Request, Response} from 'express';
import cors         from 'cors';
import createError  from 'http-errors';
import logger       from 'morgan';
import * as routeMsa  from './route/msa';

import {AppTest} from './app.test';

const app              = express();
const appTest = new AppTest();
      appTest.tt();

app.use(cors({
    "origin": "http://0.0.0.0:4202",
    "credentials": true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get("/msa/remd/journal",  routeMsa.remdJournal);
app.post("/msa/ticket/create",  routeMsa.ticket);
app.get("/msa/ticket/journal", routeMsa.ticketJournal);
app.get("/msa/ticket/result",  routeMsa.ticketResult);



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