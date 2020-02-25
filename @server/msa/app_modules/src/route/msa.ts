import express, {NextFunction, Request, Response} from 'express';


import * as modelUser       from '../model/user/model';
import * as resourceUser    from '../model/remdJournal/resource';


export const remdJournal = async (req:Request, res:Response, next:NextFunction) => {

    let results:any = await resourceUser.findAll();

    console.log(results);

    res.status(200).json({
        route: 'remdJournal',
    });
};

export const ticket = (req:Request, res:Response, next:NextFunction) => {
    res.status(200).json({
        route: 'ticket',
    });
};

export const ticketJournal = (request:Request, res:Response, next:NextFunction) => {

};

export const ticketResult  = (request:Request, res:Response, next:NextFunction) => {

};

