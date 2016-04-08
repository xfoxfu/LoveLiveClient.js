/// <reference path="./references.d.ts" />

import crypto = require("crypto");
import config = require("./config");
export = class {
  calculateHash(data: string | Object): string {
    let plainText: string;
    if (typeof data === "string") {
      plainText = data;
    } else {
      plainText = JSON.stringify(data);
    }
    return crypto.createHmac("sha1", config.hmac_key).update(plainText).digest().toString("hex");
  }
}