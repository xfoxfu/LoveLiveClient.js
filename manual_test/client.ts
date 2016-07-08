/// <reference path="../ref.d.ts" />

import chai = require("chai");
const expect = chai.expect;
const utils = require("utility");
import llsifclient = require("../");
let config = require("./config.json");
const Client = llsifclient.getClientClass(config["client_config"]["headers"], 10,
  `http://${config["client_config"]["headers"]["host"]}/main.php/`,
  llsifclient.predefinedFunctions.calculateHash.LLMCG(config["client_config"]["llmcg_token"]),
  llsifclient.predefinedFunctions.delay.custom(llsifclient.predefinedFunctions.delay.defaultTimes));

(async () => {
  let client = await Client.register();
  console.log(client.user);
  await client.startGame();
  let res = await client.generateTransferCode();
  console.log(res);
  let newClient = await Client.startFromTransferCode(res.code);
  console.log(newClient);
  process.exit(0);
})()
  .catch(console.log);