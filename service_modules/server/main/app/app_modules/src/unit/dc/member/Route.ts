import express, {NextFunction, Request, Response} from 'express';
import {container} from "tsyringe";

import {HttpResponseMsa} from "@commonNodeLibs/type/http/response/msa";

import factoryDataKey from  "../../../common/node_libs/factory/data/Key";
import {factoryTokenJwt} from '../../../common/node_libs/factory/token/Jwt';

import {modelResourse} from './model/Resource';
import schema from "./model/schema";

import pool from '../../../bootstrap/db/main/mysql';

export default class Member
{
    private factoryDataKey:factoryDataKey;
    private factoryTokenJwt:factoryTokenJwt;

    private modelResourse:modelResourse;

    constructor()
    {
        this.factoryDataKey   = container.resolve(factoryDataKey);
        this.factoryTokenJwt = container.resolve(factoryTokenJwt);

        this.factoryTokenJwt.setPool(pool);

        this.modelResourse    = container.resolve(modelResourse);
    }

    public async getSelectedData(req:Request)
    {
        const statusAutchCheck = await this.factoryTokenJwt.check(req);

        if (!statusAutchCheck?.trust)
        {
            return <HttpResponseMsa>{
                trust:false,
                status: 'fail',
                httpCode: 403,
                message: "forbidden",
                data:[]
            };
        }

        const idList = req.body.idList;
        let idListStr = '';

        for (let id of idList) {
            idListStr += id + ', '
        }

        idListStr = idListStr.slice(0, -2);

        const data:any = await this.modelResourse.getListSelected(idListStr);

        const dataRebuilded = this.factoryDataKey.addKey(data, schema);

        return <HttpResponseMsa>{
            trust:false,
            status:'success',
            httpCode: 200,
            message:'form data saved',
            data:dataRebuilded
        };
    };

    public async getData(req:Request)
    {
        const statusAutchCheck = await this.factoryTokenJwt.check(req);

        if (!statusAutchCheck?.trust)
        {
            return <HttpResponseMsa>{
               trust:false,
               status: 'fail',
               httpCode: 403,
               message: "forbidden",
               data:[]
           };
        }

        const data:any = await this.modelResourse.getList();

        const dataRebuilded = this.factoryDataKey.addKey(data, schema);

        return <HttpResponseMsa>{
            trust:true,
            status:'success',
            httpCode: 200,
            message:'form data saved',
            data:dataRebuilded
        };
    };
}