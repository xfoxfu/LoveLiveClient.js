/// <reference path="../references.d.ts" />

import chai = require("chai");
const expect = chai.expect;
const utils = require("utility");
import Client = require("../");

(async () => {
  Client.setConfig(require("./config.json"));
  let client = await Client.register();
  console.log(client.user);
  await client.startGame();
  let code = await client.generateTransferCode();
  console.log(code);
  let newClient = await Client.startFromTransferCode(code);
  console.log(newClient);
})();