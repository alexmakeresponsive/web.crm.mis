import express, {NextFunction, Request, Response} from 'express';


import helperAuthCheck from '../helper/auth/check';
import * as helperDataRebuild from '../helper/data/rebuild';
import {MsaResponse} from "../type/Response";
import * as ticketJournalResource from '../model/ticketJournal/resource';


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

    const data = await ticketJournalResource.getData();

    const dataRebuilded = helperDataRebuild.idPrimaryKey(data);

    res.status(200).json({
        data: dataRebuilded
    });
};

export const getItem = async (req:Request, res:Response, next:NextFunction) => {

};

export const removeItem = async (req:Request, res:Response, next:NextFunction) => {

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



    const id   = req.body.id_item;
    const responseAfterRemoveItem:any = await ticketJournalResource.removeItem(id);

    if (responseAfterRemoveItem.affectedRows === 1) {
        res.status(200).json({
            status: 'success',
            id_item: id
        });

        return;
    }

        res.status(500).json({
            status: 'fail'
        });
};