/// <reference path="./references.d.ts" />

import crypto = require("crypto");
import config = require("./config");
import request = require("request-promise");
import * as Request from "request";
const utils = require("utility");

export = class Client {
  // basic functions
  static calculateHash(data: string | Object): string {
    let plainText: string;
    if (typeof data === "string") {
      plainText = data;
    } else {
      plainText = JSON.stringify(data);
    }
    return crypto.createHmac("sha1", config.hmac_key).update(plainText).digest().toString("hex");
  };
  static buildUpRequestOptWithoutAuthentication(module: string, api: string, nonce: string, data?: any, token?: string): Request.Options {
    let result: Request.Options = {
      uri: `http://prod-jp.lovelive.ge.klabgames.net/main.php/${module}/${api}`,
      method: "POST",
      headers: config.headers,
      json: true
    };
    result.headers["authorize"] = `consumerKey=lovelive_test&timeStamp=${utils.timestamp()}&version=1.1&nonce=${nonce}`;
    if (token) {
      result.headers["authorize"] = `${result.headers["authorize"]}&token=${token}`;
    }
    if (data) {
      result.formData = { request_data: JSON.stringify(data) };
      result.headers["x-message-code"] = this.calculateHash(data);
    }
    return result;
  };
  // instance properties
  public user = {
    loginKey: "",
    loginPasswd: "",
    token: ""
  };
  // api basic
  private buildUpRequestOpt(module: string, api: string, nonce: string, data: any): Request.Options {
    if ((!this.user.loginKey) && (!this.user.loginPasswd) && (!this.user.token)) {
      throw "Client not initialized!";
    }
    data["login_id"] = this.user.loginKey;
    data["login_passwd"] = this.user.loginPasswd;
    let result = Client.buildUpRequestOptWithoutAuthentication(module, api, nonce, data, this.user.token);
    return result;
  }
  // api implement
}