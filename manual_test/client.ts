/// <reference path="../references.d.ts" />

import chai = require("chai");
const expect = chai.expect;
const utils = require("utility");
import llsifclient = require("../");
const Client = llsifclient.getClientClass(require("./config.json")["client_config"]);

(async () => {
  let client = await Client.register();
  console.log(client.user);
  await client.startGame();
  let res = await client.generateTransferCode();
  console.log(res);
  let newClient = await Client.startFromTransferCode(res.code);
  console.log(newClient);
})();