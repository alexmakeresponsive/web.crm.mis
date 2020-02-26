import generatorTokenJWT from 'jsonwebtoken';
import moment            from "moment";

import * as resourceService  from '../../model/service/resource';
import * as clientService    from '../../model/client/resource';
import secretWord            from '../../helper/generator/secret.word';

export const createRefreshTokenAfterLogin = async (id_user:string) => {
    let datetime_expired  = moment().add('8', 'minutes').format('YYYY-MM-DD HH:mm:ss');
    let timestems_expired = moment(datetime_expired);

    let resultAfterRemove:any = await clientService.removeOldRefreshData(id_user);

    let resultAfterSet:any    = await clientService.setNewRefreshData({
        id_user: id_user,
        timestemp_expired: timestems_expired,
        datetime_expired:  datetime_expired,
        secret_word: secretWord()
    });

    return generatorTokenJWT.sign({
        id_user: id_user,
        timestemp_expired: timestems_expired,
        datetime_expired:  datetime_expired
    }, secretWord());
};

export const createAccessTokenList = async (id_user:string) => {
    let result:any = {};

    let resultFromResourceService:any = await resourceService.getServiceData(id_user);

    let datetime_expired  = moment().add('10', 'minutes').format('YYYY-MM-DD HH:mm:ss');
    let timestems_expired = moment(datetime_expired);

    for (let item of resultFromResourceService) {
        result[item.id_service] = generatorTokenJWT.sign({
            id_user: id_user,
            id_service:      item.id_service,
            list_user_role:  item.list_user_role,
            timestemp_expired: timestems_expired,
            datetime_expired:  datetime_expired
        }, secretWord());
    }

    return result;
};
