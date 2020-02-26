import express, {NextFunction, Request, Response} from 'express';

import * as modelUser         from '../model/user/model';
import * as modelClient       from '../model/client/model';
import * as resourceClient    from '../model/client/resource';
import * as resourceUser      from '../model/user/resource';
import * as resourceSession   from '../model/session/resource';


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


        const tokenRefresh:any    = await modelClient.createRefreshTokenAfterLogin(resultsFromResourceUser[0].id_user);

        const tokenAccessList:any = await modelClient.createAccessTokenList(resultsFromResourceUser[0].id_user);


        res.status(200).json({
            id:     resultsFromResourceUser[0].id_user,
            name:   resultsFromResourceUser[0].name_user,
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