import express, {NextFunction, Request, Response} from 'express';


import helperAuthCheck from '../helper/auth/check';
import MsaResponse from "../type/Response";
import * as ticketResultResource from '../model/ticketResult/resource';


export const getTable = async (req:Request, res:Response, next:NextFunction) => {

    const statusAutchCheck = helperAuthCheck(req);

    if (!(await statusAutchCheck).trust) {
        res.status(403).json(<MsaResponse>{
            trust:false,
            status: 'fail',
            message: "forbidden",
            data:[]
        });

        return;
    }

    const data = await ticketResultResource.getData();

    res.status(200).json({
        data: data
    });
};