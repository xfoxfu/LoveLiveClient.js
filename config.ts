/// <reference path="./references.d.ts" />

let config_json: any;
try {
  config_json = require("./config.json");
} catch (ex) {
  config_json = require("./config.sample.json");
}

interface IHeaders {
  "application-id": string;
  "accept": string;
  "time-zone": string;
  "api-model": string;
  "client-version": string;
  "host": string;
  "os": string;
  "accept-encoding": string;
  "debug": string;
  "region": string;
  "bundle-version": string;
  "os-version": string;
  "platform-type": string;
  "authorize": string;
  "content-type"?: string;
  "x-message-code"?: string;
}
let config = {
  hmac_key: <string>config_json["hmac_key"],
  headers: <IHeaders>config_json["headers"]
};

export = config;