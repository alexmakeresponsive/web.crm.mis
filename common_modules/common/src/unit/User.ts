import {injectable} from "tsyringe";

@injectable()
export class User
{
    private table:string = 'user';

    public async findByIdUser(id_user:string, pool:any)
    {
       return new Promise((resolve, reject) =>
           {
               pool.query(`SELECT * FROM ${this.table} WHERE id_user = ${id_user}`, (err:any, rows:any, field:any) =>
               {
                   if (err) {
                       return reject(err);
                   };

                   return resolve(rows);
               });
           })
    }
}
