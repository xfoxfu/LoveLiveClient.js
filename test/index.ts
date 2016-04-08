/// <reference path="../references.d.ts" />

import chai = require("chai");
const expect = chai.expect;
const utils = require("utility");

// Client
import Client = require("../");
describe("Client", () => {
  describe(".calculateHash", () => {
    it(`(data: string)`, () => {
      expect(Client.calculateHash("{}")).to.eql("f8420b09e5ae0bc09f36f8c928dfaccf3b91d6ab");
    });
    it(`(data: object)`, () => {
      expect(Client.calculateHash({})).to.eql("f8420b09e5ae0bc09f36f8c928dfaccf3b91d6ab");
    });
  });
  describe(".buildUpRequestOptWithoutAuthentication", () => {
    it("(method, api, nonce)", () => {
      let should_result = {
        uri: "http://prod-jp.lovelive.ge.klabgames.net/main.php/module/api",
        method: "POST",
        headers: {
          "application-id": "626776655",
          accept: "*/*",
          "time-zone": "JST",
          "api-model": "straightforward",
          "Client-version": "17.6",
          host: "prod-jp.lovelive.ge.klabgames.net",
          os: "Android",
          "accept-encoding": "gzip,deflate",
          debug: "1",
          region: "392",
          "bundle-version": "3.2",
          "os-version": "A0001 oneplus MSM8974 6.0.1",
          "platform-type": "2",
          authorize: `consumerKey=lovelive_test&timeStamp=${utils.timestamp()}&version=1.1&nonce=a`
        },
        json: true
      };
      expect(Client.buildUpRequestOptWithoutAuthentication("module", "api", "a")).to.eql(should_result);
    });
    it("(method, api, nonce, data, token)", () => {
      let should_result = {
        uri: "http://prod-jp.lovelive.ge.klabgames.net/main.php/module/api",
        method: "POST",
        headers: {
          "application-id": "626776655",
          accept: "*/*",
          "time-zone": "JST",
          "api-model": "straightforward",
          "Client-version": "17.6",
          host: "prod-jp.lovelive.ge.klabgames.net",
          os: "Android",
          "accept-encoding": "gzip,deflate",
          debug: "1",
          region: "392",
          "bundle-version": "3.2",
          "os-version": "A0001 oneplus MSM8974 6.0.1",
          "platform-type": "2",
          authorize: `consumerKey=lovelive_test&timeStamp=${utils.timestamp()}&version=1.1&nonce=1&token=token`,
          "x-message-code": "9ad6b39d5806e8ebb971e1dc5d723bcfa0ec9394"
        },
        json: true,
        formData: { request_data: `{"test":true}` }
      };
      expect(Client.buildUpRequestOptWithoutAuthentication("module", "api", "1", { test: true }, "token")).to.eql(should_result);
    });
  });
});