import {Request} from 'express';

export type RequestWithSession = Request & {
    sessionID?:string;
};
