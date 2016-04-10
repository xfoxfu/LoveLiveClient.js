/// <reference path="../references.d.ts" />

import chai = require("chai");
const expect = chai.expect;
const utils = require("utility");
import Client = require("../");

(async () => {
  let client = await Client.register();
  console.log(client.user);
})();