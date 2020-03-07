import express, {NextFunction, Request, Response} from 'express';


import helperAuthCheck from '../helper/auth/check';
import MsaResponse from "../type/Response";

import * as ticketModeltResource from '../model/ticket/resource';
import * as ticketModelModel     from '../model/ticket/model';


export const addItem = async (req:Request, res:Response, next:NextFunction) => {

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

    const data    = req.body.data;
    const dataMap = ticketModelModel.createDataMap(data);

    const r:any = await ticketModeltResource.addItem(dataMap);

    if (r.affectedRows === 0) {
        res.status(500).json(<MsaResponse>{
            trust: true,
            status: 'fail',
            message: "data not be write to db",
            data:[]
        });

        return;
    }

    res.status(200).json({
        data: <MsaResponse>{
            status:'success',
            message:'form data saved',
            data:[]
        }
    });
};