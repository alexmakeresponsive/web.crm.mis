import express, {NextFunction, Request, Response} from 'express';

import * as modelUser         from '../model/user/model';
import * as modelClient       from '../model/client/model';
import * as resourceClient    from '../model/client/resource';
import * as resourceUser      from '../model/user/resource';
import * as resourceSession   from '../model/session/resource';
import * as resourceService from "../model/service/resource";


export const login = async (req:Request, res:Response, next:NextFunction) => {
    const login = req.body.data.login;
    const passw = req.body.data.password;

    try {
        let resultsFromResourceUser:any = await resourceUser.findByLogin(login);

        if (resultsFromResourceUser.length === 0) {
            res.status(404).json({
                message: `User with login ${login} not found`
            });
        }

        if (!modelUser.isValidPassword(resultsFromResourceUser[0], passw)) {
            res.status(403).json({
                message: `Login or password not valid`
            });
        }

        req!.session!.user = {
            id:     resultsFromResourceUser[0].id_user,
            status: 'authorized'
        };

        // remove refresh data from model.client
        let resultsFromResourceClient:any = await resourceClient.removeOldRefreshData(resultsFromResourceUser[0].id_user);

        if(!resultsFromResourceClient.hasOwnProperty('fieldCount')) {
            throw new Error('fieldCount not exist');
        }


        const tokenRefresh:any    = await modelClient.createRefreshToken(resultsFromResourceUser[0].id_user);

        let resultServiceData:any = await resourceService.getServiceData(resultsFromResourceUser[0].id_user);
        const tokenAccessList:any = await modelClient.createAccessTokenList(resultsFromResourceUser[0].id_user, resultServiceData);


        res.status(200).json({
            roleList: resultServiceData,
            user: {
                name: resultsFromResourceUser[0].name_user,
            },
            tokenAccessList:    tokenAccessList,
            tokenRefresh:       tokenRefresh
        });

        // create log.txt for control create tokens

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
        let id_user;



            status = sess.hasOwnProperty('user') ? 'authorized' : 'not-authorized';
            id_user = sess.user.id;

        if (status !== 'authorized') {
            res.status(200).json({
                status: status
            });
            return;
        }

        const tokenRefresh:any    = await modelClient.createRefreshToken(id_user);

        let resultServiceData:any = await resourceService.getServiceData(id_user);
        const tokenAccessList:any = await modelClient.createAccessTokenList(id_user, resultServiceData);

        res.status(200).json({
            status: status,
            roleList: resultServiceData,
            tokenAccessList:    tokenAccessList,
            tokenRefresh:       tokenRefresh
        });

    } catch (e) {
        console.log(e);
        res.status(500);
    }
};

export const refresh = async (request:any, res:Response, next:NextFunction) => {

    const refreshTokenOld:string = request.body.refreshToken;
    const decodedRefreshTokenOld:any = modelClient.decodeRefreshToken(refreshTokenOld);

    const tokenRefresh:any      = await modelClient.refreshRefreshToken(decodedRefreshTokenOld, modelClient.createRefreshToken);

    const resultServiceData:any = await resourceService.getServiceData(decodedRefreshTokenOld.id_user);
    const tokenAccessList:any   = await modelClient.createAccessTokenList(decodedRefreshTokenOld.id_user, resultServiceData);

    res.status(200).json({
        tokenAccessList:    tokenAccessList,
        tokenRefresh:       tokenRefresh
    });
};