/// <reference path="../ref.d.ts" />

import chai = require("chai");
const expect = chai.expect;
const utils = require("utility");
import llsifclient = require("../");
let config = require("./config.json");
const Client = llsifclient.Client;

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