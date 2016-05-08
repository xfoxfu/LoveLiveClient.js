/// <reference path="../references.d.ts" />

import chai = require("chai");
const expect = chai.expect;
const utils = require("utility");
import llsifclient = require("../");
const config = require("./config.json");
config["client_config"]["calculateHash"] =
  llsifclient.predefinedFunctions.calculateHash.LLMCG(config["client_config"]["llmcg_token"]);
config["client_config"]["delay"] =
  llsifclient.predefinedFunctions.delay.custom(llsifclient.predefinedFunctions.delay.defaultTimes);
const Client = llsifclient.getClientClass(config["client_config"]);

(async () => {
  let client = await Client.register();
  console.log(client.user);
  await client.startGame();
  let res = await client.generateTransferCode();
  console.log(res);
  let newClient = await Client.startFromTransferCode(res.code);
  console.log(newClient);
})()
  .catch(console.log);