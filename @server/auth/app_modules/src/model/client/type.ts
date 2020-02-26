/*
 * App table abilities
 *
 * do background http post query to /ann/refresh before timeExpired -1 minute
 * parse refresh token
 * create new access and refresh tokens
 */

export type Client = {
    id_user:number;
    // browser_fingerprint:string;     // if user open more than one browser - next version feature
    timestemp_expired:number;
}