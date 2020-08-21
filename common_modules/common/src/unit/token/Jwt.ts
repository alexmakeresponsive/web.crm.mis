import generatorTokenJWT from 'jsonwebtoken';
import {injectable, container} from "tsyringe";

import {TokenAccess} from '@common/type/data/token/access'
import {factoryAuthUser} from '@common/unit/User';

@injectable()
export default class Jwt
{
    private factoryAuthUser:factoryAuthUser;
    private pool:any;

    constructor()
    {
        this.factoryAuthUser   = container.resolve(factoryAuthUser);
    }

    public setPool(pool:any)
    {
        this.pool = pool;
    }

    public async check(req:any)
    {

        const str:string = req.get('Authorization');

        const token = str.replace('Bearer ', '' )
                         .replace(/\s/g, '');


        const tokenDecoded:TokenAccess|any = generatorTokenJWT.decode(token);

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

        const r:any = await this.factoryAuthUser.findByIdUser(tokenDecoded.id_user, this.pool);

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