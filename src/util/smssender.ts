import axios from "axios";

export interface RequestToSendSMS {
  [key: string]: any;
  Token: string;
  To: string;
  DocomoMessage: string;
  SoftbankMessage: string;
  AuMessage: string;
  RakutenMessage: string;
  SecurityCode: string;
  ShorturlFlg: "0" | "1";
}
export interface LoginInfo {
  securityKey: string;
  accessKey: string;
}

export interface SendSMSResult {
  messageId?: string;
  status: string;
}
export class SMSSender {
  endpoint: string;
  loigninfo: LoginInfo;
  constructor(endpoint: string, logininfo: LoginInfo) {
    this.endpoint = endpoint;
    this.loigninfo = logininfo;
  }
  public async sendSMS(to: string, text: string): Promise<SendSMSResult> {
    if (this.endpoint == "") {
      console.log("no endpoint specified")
      return new Promise((resolve) => {
        resolve({ status: "100" });
      });
    } else {
      const params: RequestToSendSMS = {
        Token: this.loigninfo.accessKey,
        To: to,
        DocomoMessage: text,
        SoftbankMessage: text,
        AuMessage: text,
        RakutenMessage: text,
        SecurityCode: this.loigninfo.securityKey,
        ShorturlFlg: "1",
      };
      const query = Object.keys(params).reduce(
        (acc: string, val: string): string => {
          if (acc === "") {
            return val + "=" + encodeURI(params[val] as string);
          } else {
            return acc + "&" + val + "=" + encodeURI(params[val] as string);
          }
        },
        ""
      );
      console.log(`call SMS to ${this.endpoint} with ${query}`);
      const ret = await axios.post(this.endpoint, query);
      return new Promise((resolve, reject) => {
        if (ret.data.status === "100") {
          resolve({ messageId: ret.data.messageId, status: ret.data.status });
        } else {
          reject({ status: ret.data.status });
        }
      });
    }
  }
}
