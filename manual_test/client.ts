/// <reference path="../references.d.ts" />

import chai = require("chai");
const expect = chai.expect;
const utils = require("utility");
import Client = require("../");

(async () => {
  Client.setConfig(require("./config.json")["client_config"]);
  let client = await Client.register();
  console.log(client.user);
  await client.startGame();
  let res = await client.generateTransferCode();
  console.log(res);
  let newClient = await Client.startFromTransferCode(res.code);
  console.log(newClient);
})();