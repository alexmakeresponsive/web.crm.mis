import generatorTokenJWT from 'jsonwebtoken';
import {injectable, container} from "tsyringe";

import tokenAccess from 'type/data/token/access'
import {factoryAuthUser} from './User';

@injectable()
export class factoryAuthToken
{
    private factoryAuthUser:factoryAuthUser;

    constructor()
    {
        this.factoryAuthUser   = container.resolve(factoryAuthUser);
    }

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

        const r:any = await this.factoryAuthUser.findByIdUser(tokenDecoded.id_user);

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