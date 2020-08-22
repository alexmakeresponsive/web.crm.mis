import md5 from 'crypto-js/md5';
import {injectable} from "tsyringe";

@injectable()
export class Crypto
{
    public async compareHash(hash:string, str:string, salt:string)
    {
        let hashStr = md5(str + salt).toString();

        return hash === hashStr ? true : false;
    }
}