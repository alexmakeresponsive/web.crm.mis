import generatorTokenJWT from 'jsonwebtoken';
import moment            from "moment";

import * as resourceService  from '../../model/service/resource';
import * as clientService    from '../../model/client/resource';
import generatorSecretWord            from '../../helper/generator/secret.word';

const secretWord = generatorSecretWord();

export const createRefreshToken = async (id_user:string) => {
    let datetime_expired  = moment().add('8', 'minutes').format('YYYY-MM-DD HH:mm:ss');
    let timestems_expired = moment(datetime_expired).format('X');

    let resultAfterRemove:any = await clientService.removeOldRefreshData(id_user);

    let resultAfterSet:any    = await clientService.setNewRefreshData({
        id_user: id_user,
        timestemp_expired: timestems_expired,
        datetime_expired:  datetime_expired,
        secret_word: secretWord
    });

    console.log('timestems_expired: ', timestems_expired);

    return generatorTokenJWT.sign({
        id_user: id_user,
        timestemp_expired: timestems_expired,
        datetime_expired:  datetime_expired
    }, secretWord);
};

export const refreshRefreshToken = async (decodedRefreshTokenOld:any, cb:any) => {
    let resultAfterFind:any = await clientService.findOldRefreshData(decodedRefreshTokenOld);

    // console.log('resultAfterFind: ', resultAfterFind);
    // console.log('decodedRefreshTokenOld: ', decodedRefreshTokenOld);

    if (resultAfterFind.length !== 1) {
        return '';
    }
        return cb(decodedRefreshTokenOld.id_user);
};

export const decodeRefreshToken = (token:string) => {
    return generatorTokenJWT.decode(token);
};

export const createAccessTokenList = async (id_user:string, resultServiceData:any) => {
    let result:any = {};

    let datetime_expired  = moment().add('10', 'minutes').format('YYYY-MM-DD HH:mm:ss');
    let timestems_expired = moment(datetime_expired).format('X');

    for (let item of resultServiceData) {
        result[item.id_service] = generatorTokenJWT.sign({
            id_user: id_user,
            id_service:      item.id_service,
            list_user_role:  item.list_user_role,
            timestemp_expired: timestems_expired,
            datetime_expired:  datetime_expired
        }, secretWord);
    }

    return result;
};
