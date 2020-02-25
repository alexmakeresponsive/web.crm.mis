import express, {NextFunction, Request, Response} from 'express';

import {RequestWithSession} from '../model/session/type';

import * as modelUser       from '../model/user/model';
import * as resourceUser    from '../model/user/resource';
import * as resourceSession from '../model/session/resource';


export const login = async (req:Request, res:Response, next:NextFunction) => {
    const login = req.body.data.login;
    const passw = req.body.data.password;

    try {
        // console.log('findByLogin: start');
        let results:any = await resourceUser.findByLogin(login);
        // console.log('findByLogin: stop');

        // console.log('findByLogin results', results);

        if (results.length === 0) {
            res.status(404).json({
                message: `User with login ${login} not found`
            });
        }



        if (modelUser.isValidPassword(results[0], passw)) {
            req!.session!.user = {
                id:     results[0].id_user,
                status: 'authorized'
            };

            // console.log(results[0]);

            res.status(200).json({
                id: results[0].id_user,
                name: results[0].name_user,
            });
        } else {
            res.status(403).json({
                message: `Login or password not valid`
            });
        }

    } catch (e) {
        console.log(e);
        res.status(500);
    }
};

export const logout = (req:Request, res:Response, next:NextFunction) => {
    req!.session!.destroy((error:any) => {
        if(error) {
            throw error;
        }
        console.log('logout susccess');
    });

    res.json({
        action: 'logout',
        status: 'success',
    });
};

export const check = async (request:Request, res:Response, next:NextFunction) => {

    // console.log('route: check');
    // console.log('req: ', req.sessionID);

    try {
        let results:any = await resourceSession.findBySessionID(request.sessionID);

        // console.log("results: ", results);


        if (results.length === 0) {
            res.status(200).json({
                status: 'not-authorized'
            });

            return;
        }

        let sess = JSON.parse(results[0].session);
        let status;


        status = sess.hasOwnProperty('user') ? 'authorized' : 'not-authorized';

        // console.log(results[0]);

        res.status(200).json({
            status: status
        });


    } catch (e) {
        console.log(e);
        res.status(500);
    }
};

