import express, {NextFunction, Request, Response} from 'express';

import generatorTokenJWT from 'jsonwebtoken';

import {RequestWithSession} from '../model/session/type';

import * as modelUser       from '../model/user/model';
import * as resourceUser    from '../model/user/resource';
import * as resourceSession from '../model/session/resource';


export const login = async (req:Request, res:Response, next:NextFunction) => {
    const login = req.body.data.login;
    const passw = req.body.data.password;

    try {
        let results:any = await resourceUser.findByLogin(login);

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


            // remove data from model.app and module.service for old token
            // then create new tokens

            // every service need self token
            // var tokenAccess = generatorTokenJWT.sign({
            //     "id_user": "11",
            //     "service_access_list": ['msa', 'lpu'],
            //     "role_list": ['msa_user', 'lpu_user'],
            //     "role_access": "all",
            //     "time_expired": "YYYY-MM-DD hh:mm:ss"
            // }, 'shhhhh');
            var tokenRefresh = generatorTokenJWT.sign({
                "id_user": "11",
                "timestemp_expired": "47334788378377834"
            }, 'shhhhh');

            console.log(tokenRefresh);

            // get roles for every service from model.service for id_user
            // create tokenAccess for every service

            res.status(200).json({
                id: results[0].id_user,
                name: results[0].name_user,
                // tokenList: {
                //     tokenAccess,
                //     tokenRefresh
                //     serviceName_1: {
                //          tokenAccess,
                //          tokenRefresh - serviceName_1.tokenRefresh === serviceName_2.tokenRefresh
                //     }
                //     ..
                //     serviceName_n: {
                //          tokenAccess,
                //          tokenRefresh -
                //     }
                // }
                // tokenAccessList: {
                //     msa: 'tokenAccess_1',
                //     lpu: 'tokenAccess_2',
                // },
                // tokenRefresh: 'tokenRefresh'
            });

                // write data to model app for refresh token
                // create log.txt for control create tokens

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

    // when user press F5 and cookie not expired this method return object: {status: 'authorized'}
    // refresh is ready to action if only angular send refresh token to backend
    // if user press F5 angular destroy all memory data with refresh and access tokens
    // so in this case backend check sessionID and if session id is matched
    // backend must remove old tokens and create new


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

export const refresh = (request:Request, res:Response, next:NextFunction) => {
    // refresh mean: find decoded refreshToken data in model.client, create new refresh and access tokens
    // if find is fail angular must redirect user to login page
    //
    // do background http post request before timeExpired -1 minute
    // or
    // for every user http request to service check timestemp_expired and if needed do refresh http post request
};