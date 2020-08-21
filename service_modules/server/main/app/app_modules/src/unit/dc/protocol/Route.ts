import express, {NextFunction, Request, Response} from 'express';
import {container} from "tsyringe";

import {HttpResponseMsa} from "@common/type/http/response/msa";

import Key from  "@common/unit/data/Key";
import Jwt from '@common/unit/token/Jwt';

import {modelResourse} from './model/Resource';
import schema from "./model/schema";

import pool from '@current/bootstrap/db/main/mysql';

export default class Protocol
{
    private factoryDataKey:Key;
    private factoryTokenJwt:Jwt;

    private modelResourse:modelResourse;

    constructor()
    {
        this.factoryDataKey   = container.resolve(Key);
        this.factoryTokenJwt = container.resolve(Jwt);

        this.factoryTokenJwt.setPool(pool);

        this.modelResourse = container.resolve(modelResourse);
    }

    public async getSelectedData(req:Request)
    {
        const statusAutchCheck = await this.factoryTokenJwt.check(req);

        if (!statusAutchCheck.trust)
        {
            return <HttpResponseMsa>{
                trust:false,
                status: 'fail',
                httpCode: 403,
                message: "forbidden",
                data:[]
            };
        }

        let id = req.body.id;

        const data:any = await this.modelResourse.getItem(id);

        const dataRebuilded:any = this.factoryDataKey.addKey(data, schema);

        return <HttpResponseMsa>{
            trust:true,
            status:'success',
            httpCode: 200,
            message:'form data saved',
            data:dataRebuilded[id]
        };
    }

    public async getData(req:Request)
    {
        const statusAutchCheck = await this.factoryTokenJwt.check(req);

        if (!statusAutchCheck.trust)
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
    }
}