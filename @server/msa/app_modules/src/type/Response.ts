export default class MsaResponse {
  trust:boolean;
  status?:string;
  message?:string;
  data:[] | object;
}
