import express, {NextFunction, Request, Response} from 'express';


import helperAuthCheck from '../helper/auth/check';
import typeResponseMsa from "type/response/msa";

import * as dcProtocolModeltResource from '../model/dcProtocol/resource';
import * as helperDataRebuild from "../helper/data/rebuild";


export const getItemData = async (req:Request, res:Response, next:NextFunction) => {
    const statusAutchCheck = helperAuthCheck(req);

    if (!(await statusAutchCheck).trust) {
        res.status(403).json(<typeResponseMsa>{
            trust:false,
            status: 'fail',
            message: "forbidden",
            data:[]
        });

        return;
    }

    let id = req.body.id;

    const data:any = await dcProtocolModeltResource.getItem(id);

    const dataRebuilded = helperDataRebuild.idPrimaryKey(data);

    res.status(200).json(
        <typeResponseMsa>{
            status:'success',
            message:'form data saved',
            data:dataRebuilded[id]
        }
    );
};
export const getData = async (req:Request, res:Response, next:NextFunction) => {

    const statusAutchCheck = helperAuthCheck(req);

    if (!(await statusAutchCheck).trust) {
        res.status(403).json(<typeResponseMsa>{
            trust:false,
            status: 'fail',
            message: "forbidden",
            data:[]
        });

        return;
    }

    const data:any = await dcProtocolModeltResource.getList();

    const dataRebuilded = helperDataRebuild.idPrimaryKey(data);

    res.status(200).json(
        <typeResponseMsa>{
            status:'success',
            message:'form data saved',
            data:dataRebuilded
        }
    );
};