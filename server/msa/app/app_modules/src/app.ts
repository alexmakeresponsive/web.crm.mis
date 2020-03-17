import dotenv from 'dotenv';
const dotenvRes = dotenv.config();

if (dotenvRes.error) {
    throw dotenvRes.error;
}

import express, {NextFunction, Request, Response} from 'express';
import cors         from 'cors';
import createError  from 'http-errors';
import logger       from 'morgan';
import * as routeTicketResult  from './route/ticketResult';
import * as routeTicketJournal  from './route/ticketJournal';
import * as routeTicket  from './route/ticket';

// import {AppTest} from './app.test';

const app              = express();
// const appTest = new AppTest();
//       appTest.tt();

app.use(cors({
    // "origin": "http://0.0.0.0:4202",
    "origin": "http://icearea.amrxt.ru/",
    "credentials": true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const prefix = '/api/msa/';

app.post(prefix + "ticket",  routeTicket.addItem);
app.post(prefix + "ticket/update",  routeTicket.updateItem);
app.post(prefix + "ticket/result",  routeTicketResult.getTable);
app.post(prefix + "ticket/result/remove",  routeTicketResult.removeItem);
app.post(prefix + "ticket/journal",  routeTicketJournal.getTable);
app.post(prefix + "ticket/journal/remove",  routeTicketJournal.removeItem);




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