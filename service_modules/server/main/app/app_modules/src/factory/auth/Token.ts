import generatorTokenJWT from 'jsonwebtoken';
import {injectable} from "tsyringe";

import tokenAccess from 'type/token/access'
import * as userResource from '../../model/user/resource';

import express, {Request, Response} from 'express';

@injectable()
export class factoryAuthToken
{
    public async check(req:any)
    {

        const str:string = req.get('Authorization');

        const token = str.replace('Bearer ', '' )
                         .replace(/\s/g, '');


        const tokenDecoded:tokenAccess|any = generatorTokenJWT.decode(token);

        if(!tokenDecoded) {
            return {
                trust:false
            }
        }

        if(tokenDecoded.id_service !== 'msa') {
            return {
                trust:false
            }
        }

        const r:any = await userResource.findByIdUser(tokenDecoded.id_user);

        if (r.length !== 1) {
            return {
                trust:false
            }
        }

            return {
                trust:true,
            }
    }
}