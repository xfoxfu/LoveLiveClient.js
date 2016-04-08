/// <reference path="../references.d.ts" />

import chai = require("chai");
const expect = chai.expect;

// client
import Client = require("../");
describe("Client", () => {
  describe("#calculateHash", () => {
    it(`data: string`, () => {
      let client = new Client();
      expect(client.calculateHash("{}")).to.eql("f8420b09e5ae0bc09f36f8c928dfaccf3b91d6ab");
    });
    it(`data: object`, () => {
      let client = new Client();
      expect(client.calculateHash({})).to.eql("f8420b09e5ae0bc09f36f8c928dfaccf3b91d6ab");
    });
  });
});
