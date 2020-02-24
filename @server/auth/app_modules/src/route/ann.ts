import express, {NextFunction, Request, Response} from 'express';

export const login = (req:Request, res:Response, next:NextFunction) => {
    res.json({
        route: 'ann/login',
    });
};

export const logout = (req:Request, res:Response, next:NextFunction) => {
    res.json({
        route: 'ann/logout',
    });
};

export const check = (req:Request, res:Response, next:NextFunction) => {
    console.log('check!!');
    res.json({
        route: 'ann/check',
    });
};

