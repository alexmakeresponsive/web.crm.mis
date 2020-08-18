import {injectable} from "tsyringe";

import pool from '../../bootstrap/db/main/mysql';

@injectable()
export class factoryAuthUser
{
    private table:string = 'user';

    public async findByIdUser(id_user:string)
    {
       return new Promise((resolve, reject) =>
           {
               pool.query(`SELECT * FROM ${this.table} WHERE id_user = ${id_user}`, (err, rows, fields) =>
               {
                   if (err) {
                       return reject(err);
                   };

                   return resolve(rows);
               });
           })
    }
}