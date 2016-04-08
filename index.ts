/// <reference path="./references.d.ts" />

import crypto = require("crypto");
import config = require("./config");
import request = require("request-promise");
import * as Request from "request";
const utils = require("utility");

export = class {
  // basic functions
  calculateHash(data: string | Object): string {
    let plainText: string;
    if (typeof data === "string") {
      plainText = data;
    } else {
      plainText = JSON.stringify(data);
    }
    return crypto.createHmac("sha1", config.hmac_key).update(plainText).digest().toString("hex");
  }
  buildUpRequestOpt(module: string, api: string, nonce: string, data?: any, token?: string): Request.Options {
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
  }
}