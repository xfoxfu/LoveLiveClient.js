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
  let result = await client.api.secretbox.all();
  console.log(result);
  let scout = result.member_category_list[0].tab_list[0].page_list[0].secret_box_list[0];
  console.log(await client.api.secretbox.pon(scout.secret_box_id, scout.cost.priority));
  console.log(await client.api.secretbox.multi(scout.secret_box_id, scout.cost.priority, scout.multi_count));
  process.exit(0);
})()
  .catch(console.log);