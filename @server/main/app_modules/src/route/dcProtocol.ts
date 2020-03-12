import express, {NextFunction, Request, Response} from 'express';


import helperAuthCheck from '../helper/auth/check';
import MsaResponse from "../type/Response";

import * as dcProtocolModeltResource from '../model/dcProtocol/resource';


export const getData = async (req:Request, res:Response, next:NextFunction) => {

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

    const data:any = await dcProtocolModeltResource.getList();

    res.status(200).json(
        <MsaResponse>{
            status:'success',
            message:'form data saved',
            data:data
        }
    );
};