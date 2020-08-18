import express, {NextFunction, Request, Response} from 'express';
import {container} from "tsyringe";

import typeResponseMsa from "type/response/msa";
import * as dcMemberModeltResource from '../../model/dc/member/resource';

import {factoryDataKey} from "../../factory/data/Key";
import {factoryAuthToken} from '../../factory/auth/Token';

export default class Member
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

        if (!statusAutchCheck?.trust)
        {
            return <typeResponseMsa>{
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

        const data:any = await dcMemberModeltResource.getListSelected(idListStr);

        const dataRebuilded = this.factoryDataKey.addKey(data);

        return <typeResponseMsa>{
            trust:false,
            status:'success',
            httpCode: 200,
            message:'form data saved',
            data:dataRebuilded
        };
    };

    public async getData(req:Request)
    {
        const statusAutchCheck = await this.factoryAuthToken.check(req);

        if (!statusAutchCheck?.trust)
        {
            return <typeResponseMsa>{
               trust:false,
               status: 'fail',
               httpCode: 403,
               message: "forbidden",
               data:[]
           };
        }

        const data:any = await dcMemberModeltResource.getList();

        const dataRebuilded = this.factoryDataKey.addKey(data);

        return <typeResponseMsa>{
            trust:true,
            status:'success',
            httpCode: 200,
            message:'form data saved',
            data:dataRebuilded
        };
    };
}