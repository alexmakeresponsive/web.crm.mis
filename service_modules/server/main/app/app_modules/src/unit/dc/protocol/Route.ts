import express, {NextFunction, Request, Response} from 'express';
import {container} from "tsyringe";

import typeResponseMsa from "type/response/msa";

import * as modelResourse from './model/resource';
import schema from "./model/schema";

import {factoryDataKey} from "../../../factory/data/Key";
import {factoryAuthToken} from '../../../factory/auth/Token';

export default class Protocol
{
    private factoryDataKey:factoryDataKey;
    private factoryAuthToken:factoryAuthToken;

    constructor()
    {
        this.factoryDataKey   = container.resolve(factoryDataKey);
        this.factoryAuthToken = container.resolve(factoryAuthToken);
    }

    public async getSelectedData(req:Request)
    {
        const statusAutchCheck = await this.factoryAuthToken.check(req);

        if (!statusAutchCheck.trust)
        {
            return <typeResponseMsa>{
                trust:false,
                status: 'fail',
                httpCode: 403,
                message: "forbidden",
                data:[]
            };
        }

        let id = req.body.id;

        const data:any = await modelResourse.getItem(id);

        const dataRebuilded = this.factoryDataKey.addKey(data, schema);

        return <typeResponseMsa>{
            trust:true,
            status:'success',
            httpCode: 200,
            message:'form data saved',
            data:dataRebuilded[id]
        };
    }

    public async getData(req:Request)
    {
        const statusAutchCheck = await this.factoryAuthToken.check(req);

        if (!statusAutchCheck.trust)
        {
            return <typeResponseMsa>{
                trust:false,
                status: 'fail',
                httpCode: 403,
                message: "forbidden",
                data:[]
            };
        }

        const data:any = await modelResourse.getList();

        const dataRebuilded = this.factoryDataKey.addKey(data, schema);

        return <typeResponseMsa>{
            trust:true,
            status:'success',
            httpCode: 200,
            message:'form data saved',
            data:dataRebuilded
        };
    }
}