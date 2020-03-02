import express, {NextFunction, Request, Response} from 'express';


import helperAuthCheck from '../helper/auth/check';
import * as helperDataRebuild from '../helper/data/rebuild';
import MsaResponse from "../type/Response";
import * as ticketResultResource from '../model/ticket/resource';


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

    const data = req.body.data;
    const r:any = await ticketResultResource.addItem(data);

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