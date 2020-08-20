export type HttpResponseMsa = {
  trust:        boolean;
  status?:      string;
  httpCode:     number;
  message?:     string;
  data:         [] | {};
}
