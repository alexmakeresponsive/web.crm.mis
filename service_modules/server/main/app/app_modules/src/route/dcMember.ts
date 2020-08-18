import express, {NextFunction, Request, Response} from 'express';


import helperAuthCheck from '../helper/auth/check';
import typeResponseMsa from "type/response/msa";

import * as dcMemberModeltResource from '../model/dcMember/resource';
import * as helperDataRebuild from "../helper/data/rebuild";


export const getSelectedData = async (req:Request, res:Response, next:NextFunction) => {
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

    const idList = req.body.idList;
    let idListStr = '';

    for (let id of idList) {
        idListStr += id + ', '
    }

    idListStr = idListStr.slice(0, -2);

    const data:any = await dcMemberModeltResource.getListSelected(idListStr);

    const dataRebuilded = helperDataRebuild.idPrimaryKey(data);

    res.status(200).json(
        <typeResponseMsa>{
            status:'success',
            message:'form data saved',
            data:dataRebuilded
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

    const data:any = await dcMemberModeltResource.getList();

    const dataRebuilded = helperDataRebuild.idPrimaryKey(data);

    res.status(200).json(
        <typeResponseMsa>{
            status:'success',
            message:'form data saved',
            data:dataRebuilded
        }
    );
};