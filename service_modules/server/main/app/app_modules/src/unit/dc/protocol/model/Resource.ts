import pool from '@current/bootstrap/db/main/mysql';

import {injectable, container} from "tsyringe";

@injectable()
export class modelResourse
{
    private table = 'dc_protocol';

    public async getItem(id:string)
    {
        const query = `SELECT * FROM ${this.table} WHERE ID = ${id}`;

        return new Promise((resolve, reject) => {
            pool.query(query, (err, rows, fields) => {
                if (err) {
                    return reject(err);
                };

                return resolve(rows);
            });
        })
    };

    public async getList()
    {
        const query = `SELECT * FROM ${this.table}`;

        return new Promise((resolve, reject) => {
            pool.query(query, (err, rows, fields) => {
                if (err) {
                    return reject(err);
                };

                return resolve(rows);
            });
        })
    };
}