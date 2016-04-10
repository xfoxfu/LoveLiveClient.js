/// <reference path="../references.d.ts" />

import chai = require("chai");
const expect = chai.expect;
const utils = require("utility");
import Client = require("../");

(async () => {
  Client.setConfig(require("./config.json"));
  let client = new Client("07ac0488-dc80-4e8c-8f00-9109a6487853",
    "479458ef91101e2c5050806041d4d9adea0dcadbc09b627248d19116acb4635f5c534cd6128f5f691c185783d8e5b8c33437c840764f03984e7341d4fa88548c");
  console.log(client.user);
  await client.startGame();
  await client.playSong();
  console.log(await client.generateTransferCode());
})();