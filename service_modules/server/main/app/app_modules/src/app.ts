import dotenv from 'dotenv';
const dotenvRes = dotenv.config();

if (dotenvRes.error) {
    throw dotenvRes.error;
}

import "reflect-metadata";

import typeResponseMsa from "type/response/msa";

import express, {NextFunction, Request, Response} from 'express';
import cors         from 'cors';
import createError  from 'http-errors';
import logger       from 'morgan';

import routeDcMemberClass from './route/dc/Member';
import routeDcProtocolClass  from './route/dc/Protocol';

const app              = express();

const routeDcMember   = new routeDcMemberClass();
const routeDcProtocol = new routeDcProtocolClass();

app.use(cors({
    // "origin": "http://0.0.0.0:4202",
    "origin": "http://icearea.amrxt.ru/",
    "credentials": true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const prefix = '/api/main/';

app.post(prefix + "dc/member/list", async (req:Request, res:Response) => {
    let result:typeResponseMsa;
        result = await routeDcMember.getData(req);

  res.status(result.httpCode).json(result);
});

app.post(prefix + "dc/member/item/selected", async (req:Request, res:Response) => {
  let result:typeResponseMsa;
      result = await routeDcMember.getSelectedData(req);

  res.status(result.httpCode).json(result);
});

app.post(prefix + "dc/protocol/list", async (req:Request, res:Response) => {
    let result:typeResponseMsa;
        result = await routeDcProtocol.getData(req);

  res.status(result.httpCode).json(result);
});

app.post(prefix + "dc/protocol/item", async (req:Request, res:Response) => {
  let result:typeResponseMsa;
      result = await routeDcProtocol.getSelectedData(req);

  res.status(result.httpCode).json(result);
});


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