/// <reference types="node" />

type Response = {
    trust: boolean
};

export class User
{
    table:string;

    findByIdUser(id_user:string, pool:any):[];
}

export default class Jwt
{
    factoryAuthUser:User;
    pool:any;

    setPool(pool:any):undefined;

    check(req:any):Response;
}