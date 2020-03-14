export type MsaResponse = {
  trust:boolean;
  status?:string;
  message?:string;
  data:[] | object;
}
