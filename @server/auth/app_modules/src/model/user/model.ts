import md5 from 'crypto-js/md5';

export const isValidPassword = (result:any, passw:string) => {

    let hashInDb     = result.password_hash_user;
    let hashFromForm = md5(passw + result.salt_user).toString();

    return hashInDb === hashFromForm ? true : false;
};
