/// <reference path="./references.d.ts" />

let config_json: any;
try {
  config_json = require("./config.json");
} catch (ex) {
  config_json = require("./config.sample.json");
}
let config = {
  hmac_key: <string>config_json["hmac_key"]
};

export = config;