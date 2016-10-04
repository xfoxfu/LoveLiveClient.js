/// <reference path="./ref.d.ts" />

import request = require("request-promise");
import * as Request from "request";
const utils = require("utility");
import uuid = require("node-uuid");
import merge = require("merge");
import crypto = require("crypto-promise");
const RequestErrors = require("request-promise/errors");
import HTTPInterfaces = require("./httpInterfaces");

namespace lib {
  export let randomInt = (min: number, max: number) => (Math.floor(Math.random() * (max - min)) + min);
  export let randomDec = (min: number, max: number) => (Math.random() * (max - min) + min);
  export let delay = (ms: number) => new Promise(r => setTimeout(r, ms || 0));
}
export namespace Errors {
  export class ApiError<T> extends Error {
    httpCode: number;
    apiCode: number;
    request: Request.Options;
    response: T;
    constructor(httpStatus?: number, apiStatus?: number, requestOptions?: Request.Options, response?: T) {
      super(`API Error with HTTP Status "${httpStatus}" and API Status "${apiStatus}"`);
      this.name = "APIError";
      this.httpCode = httpStatus;
      this.apiCode = apiStatus;
      this.request = requestOptions;
      this.response = response;
    };
  };
  export class ClientNotInitializedError extends Error {
    constructor() {
      super("Client not initialized.");
      this.name = "ClientNotInitializedError";
    }
  };
  export class InvalidTransferCodeError extends Error {
    constructor() {
      super("Invalid transfer code.");
      this.name = "InvalidTransferCodeError";
    }
  };
  export class InvalidUsernamePasswordPair extends Error {
    constructor() {
      super("Invalid username or password.");
      this.name = "InvalidUsernamePasswordPairError";
    }
  };
  export class InvalidLeaderId extends Error {
    constructor() {
      super("Invalid leader id.");
      this.name = "InvalidLeaderIdError";
    }
  };
};
let config = {
  calculateHash: async (data: string) => (await crypto.hmac("sha1", process.env.LL_HMAC_KEY || "xx")(data, "utf8")).toString("hex"),
  delay: async (apiAddr: string) => {
    switch (apiAddr) {
      case "tos/tosAgree": {
        await lib.delay(lib.randomInt(2000, 3000));
        break;
      };
      case "user/changeName": {
        await lib.delay(lib.randomInt(3000, 5000));
        break;
      };
      case "login/unitSelect": {
        await lib.delay(lib.randomInt(3000, 7000));
        break;
      };
      case "live/partyList": {
        await lib.delay(lib.randomInt(3000, 5000));
        break;
      };
      case "live/deckList": {
        await lib.delay(lib.randomInt(3000, 7000));
        break;
      };
      case "live/play": {
        await lib.delay(lib.randomInt(2000, 3000));
        break;
      }
      case "live/reward": {
        await lib.delay(lib.randomInt(150000, 180000));
        break;
      };
      case "handover/exec": {
        await lib.delay(lib.randomInt(5000, 12000));
        break;
      };
      default: {
        await lib.delay(lib.randomInt(300, 500));
        break;
      };
    };
  },
  maxRetry: 10,
  headers: {
    "Host": "prod-jp.lovelive.ge.klabgames.net",
    "Accept": "*/*",
    "Accept-Encoding": "gzip,deflate",
    "API-Model": "straightforward",
    "Debug": "1",
    "Bundle-Version": "4.0.4",
    "Client-Version": process.env.LL_CLIENT_VERSION || "18.5",
    "OS-Version": process.env.LL_DEVICE || "Nexus 6 google shamu 5.0",
    "OS": "Android",
    "Platform-Type": "2",
    "Application-ID": "626776655",
    "Time-Zone": "JST",
    "Region": "392",
  },
  server: "http://prod-jp.lovelive.ge.klabgames.net/main.php/"
};
export class Client {
  /**
   * basic functions
   */
  private static async calculateHash(data: string | Object): Promise<string> {
    let plainText: string;
    if (typeof data === "string") {
      plainText = data;
    } else {
      plainText = JSON.stringify(data);
    }
    return await config.calculateHash(plainText);
  };
  // -->
  /**
   * instance properties
   */
  public user = {
    loginKey: "",
    loginPasswd: "",
    token: "",
    id: 0
  };
  private static GameModes = {
    muse: 1,
    aqours: 2
  };
  private gameMode = Client.GameModes.aqours;
  private nonce = 2;
  /**
   * client operations
   */
  constructor(key: string, passwd: string) {
    this.user.loginKey = key;
    this.user.loginPasswd = passwd;
  };
  setGameMode = (mode: "muse" | "aqours") => {
    switch (mode) {
      case "muse": {
        this.gameMode = Client.GameModes.muse;
        break;
      }
      case "aqours": {
        this.gameMode = Client.GameModes.aqours;
        break;
      }
      default: {
        this.gameMode = Client.GameModes.aqours;
        break;
      }
    }
  };
  startGame = async () => {
    await this.initialize();
    await this.api.user.userInfo();
    await this.api.personalnotice.get();
    await this.tosCheckAndAgree();
    await this.api.platformAccount.isConnectedLlAccount();
    await this.api.download.batch();
    await this.api.lbonus.execute();
    // TODO simulate webview
    await this.api.multi.getStartUpInformation();
  };
  generateTransferCode = async () => this.api.handover.start();
  regenerateTransferCode = async () => this.api.handover.renew();
  live = {
    getPartyUsers: (liveId: number) => this.api.live.partyList(liveId),
    getDecks: (partyUserId: number) => this.api.live.deckList(partyUserId),
    getSongInfo: (liveId: number, partyUserId: number, deckId: number) =>
      this.api.live.play(liveId, partyUserId, deckId),
    getReward: (liveId: number,
      perfect: number, great: number, good: number, bad: number, miss: number,
      love: number, maxCombo: number,
      smile: number, cute: number, cool: number,
      eventID: number, eventPoint: number) => this.api.live.reward(perfect,
        great, good, bad, miss,
        love, maxCombo, liveId,
        smile, cute, cool,
        eventID, eventPoint)
  };
  /**
   * create user
   */
  private static generateCreditalPair = async () => {
    return [uuid.v4(), (await crypto.hash("sha512")([uuid.v4(), Date.now()].toString())).toString("hex")];
  };
  static register = async (name?: string, leader?: number) => {
    const defaultNames = `幻の学院生 明るい学院生 期待の学院生 純粋な学院生 素直な学院生 元気な学院生 天然な学院生 勇敢な学院生 気になる学院生 真面目な学院生 不思議な学院生 癒し系な学院生 心優しい学院生 さわやかな学院生 頼りになる学院生 さすらいの学院生 正義感あふれる学院生 カラオケ好きの学院生`.split(" ");
    if (!name) name = defaultNames[lib.randomInt(0, defaultNames.length - 1)];
    // When v8 supports destructing, use the feature
    let [key, pass] = await Client.generateCreditalPair();
    let client = new Client(key, pass);
    client.resetNonce();
    client.user.token = await client.api.login.authkey();
    await client.api.login.startUp();
    await client.api.login.startWithoutInvite();
    await client.initialize();
    await client.api.user.userInfo();
    await client.tosCheckAndAgree();
    await client.api.user.changeName(name);
    await client.api.tutorial.progress(1);
    await client.api.multi.getStartUpInformation();
    let allAvailableUnits: number[] = [];
    let museAvailableUnits: number[] = [];
    let aqoursAvailableUnits: number[] = [];
    {
      let result = await client.api.login.unitList();
      for (let category of result.member_category_list) {
        for (let unit of category.unit_initial_set) {
          if (category.member_category === 1) {
            museAvailableUnits.push(unit.unit_initial_set_id);
          } else if (category.member_category === 2) {
            aqoursAvailableUnits.push(unit.unit_initial_set_id);
          }
          allAvailableUnits.push(unit.unit_initial_set_id);
        }
      }
    }
    if (!leader) leader = allAvailableUnits[lib.randomInt(0, museAvailableUnits.length - 1)];
    if (allAvailableUnits.indexOf(leader) >= 0) {
      if (museAvailableUnits.indexOf(leader) >= 0) {
        client.setGameMode("muse");
      }
      await client.api.login.unitSelect(leader);
    } else {
      throw new Errors.InvalidLeaderId();
    }
    await client.api.tutorial.skip();
    {
      let result = await client.api.multi.getDeckAndUnits();
      let base = result[0]["result"][0]["unit_owning_user_id"];
      let mergePartner = result[0]["result"][10]["unit_owning_user_id"];
      await client.api.unit.merge(base, [mergePartner]);
      await client.api.tutorial.skip();
      let rankUpPartner = result[0]["result"][9]["unit_owning_user_id"];
      await client.api.unit.rankUp(base, [rankUpPartner]);
      await client.api.tutorial.skip();
    }
    return client;
  };
  static startFromTransferCode = async (code: string) => {
    let [key, pass] = await Client.generateCreditalPair();
    let client = new Client(key, pass);
    client.resetNonce();
    client.user.token = await client.api.login.authkey();
    await client.api.login.startUp();
    await client.api.login.startWithoutInvite();
    await client.initialize();
    await client.api.user.userInfo();
    await client.tosCheckAndAgree();
    await client.api.handover.exec(code);
    return client;
  };
  initialize = async () => {
    this.resetNonce();
    this.user.token = await this.api.login.authkey();
    let result = await this.api.login.login();
    this.user.token = result.authorize_token;
    this.user.id = result.user_id;
  };
  tosCheckAndAgree = async () => {
    let tosCheckResult = await this.api.tos.tosCheck();
    if (!tosCheckResult.is_agreed) {
      await this.api.tos.tosAgree(tosCheckResult.tos_id);
    }
  };
  /**
   * api basic
   */
  resetNonce() {
    this.nonce = 1;
  }
  async callAPIPlain<TResult, TRequest>(apiAddr: string, data: TRequest): Promise<TResult>;
  async callAPIPlain<TResult>(apiAddr: string, data?: any): Promise<TResult>;
  async callAPIPlain<TResult>(apiAddr: string, data?: any) {
    await config.delay(apiAddr);
    let opt: Request.Options = {
      uri: `${config.server}${apiAddr}`,
      method: "POST",
      headers: config.headers,
      json: true,
      gzip: true
    };
    opt.headers["Authorize"] = `consumerKey=lovelive_test&timeStamp=${utils.timestamp()}&version=1.1&nonce=${this.nonce++}`;
    if (this.user.token) {
      opt.headers["Authorize"] = `${opt.headers["Authorize"]}&token=${this.user.token}`;
    }
    if (data) {
      opt.formData = { request_data: JSON.stringify(data) };
      opt.headers["X-Message-Code"] = await Client.calculateHash(data);
    }
    if (this.user.id) {
      opt.headers["User-ID"] = this.user.id;
    }
    for (let i = 1; i <= config.maxRetry; i++) {
      try {
        let result: HTTPInterfaces.ResponseBase<TResult> = await request(opt);
        return result.response_data;
      } catch (err) {
        if (err.name = "RequestError") {
          // ignore and retry
        } else if (err.name === "StatusCodeError") {
          if ((err.statusCode >= 502) && (err.statusCode <= 504)) {
            // ignore and retry
          } else {
            throw new Errors.ApiError(err.statusCode, err.response.status, opt, err.response);
          }
        } else {
          throw err;
        }
        if (i === config.maxRetry) {
          throw err;
        }
      }
    }
  };
  async callAPIDetailed<TResult>(module: string, action: string, data?: any): Promise<TResult>;
  async callAPIDetailed<TResult, TRequest>(module: string, action: string, data?: TRequest): Promise<TResult>;
  async callAPIDetailed<TResult, TRequest>(module: string, action: string, data?: TRequest) {
    return this.callAPIPlain<TResult, TRequest | HTTPInterfaces.DetailedRequestBase>(
      `${module}/${action}`, merge(
        <HTTPInterfaces.DetailedRequestBase>{
          module: module,
          action: action,
          timeStamp: utils.timestamp().toString(),
          commandNum: `${uuid.v4()}.${utils.timestamp()}.${this.nonce}`,
          mgd: this.gameMode
        }, data));
    /**
     * TODO
     * - for "platformAccount/isConnectedLlAccount" do not use "timeStamp", "commandNum"
     * - for "download/batch" do not use "timeStamp", "mgd"
     * - write an automatic API builder base on lua files
     */
  };
  async callMultipleAPI<TMultiResult>(...requests: { module: string, action: string, data?: any }[]) {
    let data: any[] = [];
    for (let request of requests) {
      data.push(merge({
        module: request.module,
        action: request.action,
        timeStamp: utils.timestamp().toString()
      }, request.data));
    }
    return this.callAPIPlain<TMultiResult>("api", data);
  };
  /**
   * api implement
   */
  api = {
    login: {
      /**
       * login/authkey
       * 
       * Get basically authentication key.
       * 
       * @return Promise<string>
       */
      authkey: async (): Promise<string> => {
        return (await this.callAPIPlain<HTTPInterfaces.Response.login.authkey>("login/authkey")).authorize_token;
      },
      /**
       * login/login
       * 
       * Get user-related token.
       * 
       * @return Promise<string>
       */
      login: async () =>
        await this.callAPIPlain<HTTPInterfaces.Response.login.login,
          HTTPInterfaces.RequestData.login.login>("login/login",
          {
            "login_key": this.user.loginKey, "login_passwd": this.user.loginPasswd
          }),
      startUp: async () => {
        let result = await this.callAPIPlain<
          HTTPInterfaces.Response.login.startUp>("login/startUp",
          {
            "login_key": this.user.loginKey, "login_passwd": this.user.loginPasswd
          });
        if (result.login_key !== this.user.loginKey ||
          result.login_passwd !== this.user.loginPasswd) {
          throw new Errors.InvalidUsernamePasswordPair();
        }
      },
      startWithoutInvite: async () => this.callAPIPlain<
        HTTPInterfaces.Response.login.startWithoutInvite>("login/startWithoutInvite",
        {
          "login_key": this.user.loginKey, "login_passwd": this.user.loginPasswd
        }),
      unitList: async () => this.callAPIDetailed<
        HTTPInterfaces.Response.login.unitList>("login", "unitList"),
      // set the center of initial team
      unitSelect: async (unitId: number) => this.callAPIDetailed<HTTPInterfaces.Response.login.unitSelect,
        HTTPInterfaces.RequestData.login.unitSelect>("login", "unitSelect", {
          unit_initial_set_id: unitId
        })
    },
    user: {
      userInfo: async () => this.callAPIDetailed<HTTPInterfaces.Response.user.userInfo>("user", "userInfo"),
      changeName: async (nickname: string) => this.callAPIDetailed<HTTPInterfaces.Response.user.changeName,
        HTTPInterfaces.RequestData.user.changeName>("user", "changeName", { name: nickname })
    },
    tos: {
      tosCheck: async () => this.callAPIDetailed<HTTPInterfaces.Response.tos.tosCheck>("tos", "tosCheck"),
      tosAgree: async (tosId: number) => this.callAPIDetailed<
        HTTPInterfaces.Response.tos.tosAgree>("tos", "tosAgree", { tos_id: tosId })
    },
    tutorial: {
      // set state to 1 to skip it
      progress: async (state: number) => this.callAPIDetailed<HTTPInterfaces.Response.tutorial.progress,
        HTTPInterfaces.RequestData.tutorial.progress>("tutorial", "progress", { tutorial_state: state }),
      skip: async () => this.callAPIDetailed<HTTPInterfaces.Response.tutorial.skip>("tutorial", "skip")
    },
    multi: {
      getStartUpInformation: async () => this.callMultipleAPI( // TODO type annotation
        { module: "login", action: "topInfo" },
        { module: "login", action: "topInfoOnce" },
        { module: "live", action: "liveStatus" },
        { module: "live", action: "schedule" },
        { module: "marathon", action: "marathonInfo" },
        { module: "battle", action: "battleInfo" },
        { module: "festival", action: "festivalInfo" },
        { module: "online", action: "info" },
        { module: "challenge", action: "challengeInfo" },
        { module: "unit", action: "unitAll" },
        { module: "unit", action: "deckInfo" },
        { module: "unit", action: "supporterAll" },
        { module: "unit", action: "removableSkillInfo" },
        { module: "album", action: "albumAll" },
        { module: "scenario", action: "scenarioStatus" },
        { module: "subscenario", action: "subscenarioStatus" },
        { module: "eventscenario", action: "status" },
        { module: "user", action: "showAllItem" },
        { module: "payment", action: "productList" },
        { module: "banner", action: "bannerList" },
        { module: "notice", action: "noticeMarquee" },
        { module: "user", action: "getNavi" },
        { module: "navigation", action: "specialCutin" },
        { module: "award", action: "awardInfo" },
        { module: "background", action: "backgroundInfo" },
        { module: "exchange", action: "owningPoint" }),
      getDeckAndUnits: async () => await this.callMultipleAPI<[
        HTTPInterfaces.MultiResponseEachBase<HTTPInterfaces.Response.unit.unitAll>,
        HTTPInterfaces.MultiResponseEachBase<HTTPInterfaces.Response.unit.deckInfo>
      ]>({ module: "unit", action: "unitAll" },
        { module: "unit", action: "deckInfo" },
        { module: "unit", action: "supporterAll" })
    },
    unit: {
      merge: async (base: number, partners: number[]) => this.callAPIDetailed<
        HTTPInterfaces.Response.unit.merge,
        HTTPInterfaces.RequestData.unit.merge>("unit", "merge",
        { base_owning_unit_user_id: base, unit_owning_user_ids: partners }),
      rankUp: async (base: number, partners: number[]) => this.callAPIDetailed<
        HTTPInterfaces.Response.unit.rankUp,
        HTTPInterfaces.RequestData.unit.rankUp>("unit", "rankUp", {
          base_owning_unit_user_id: base,
          unit_owning_user_ids: partners
        })
    },
    lbonus: {
      execute: async () => this.callAPIDetailed<HTTPInterfaces.Response.lbonus.execute>("lbonus", "execute")
    },
    personalnotice: {
      get: async () => this.callAPIDetailed<
        HTTPInterfaces.Response.personalnotice.get>("personalnotice", "get")
    },
    platformAccount: {
      isConnectedLlAccount: async () => this.callAPIDetailed<
        HTTPInterfaces.Response.platformAccount.isConnectedLlAccount>("platformAccount", "isConnectedLlAccount")
    },
    handover: {
      start: async () => this.callAPIDetailed<
        HTTPInterfaces.Response.handover.start>("handover", "start"),
      exec: async (code: string) => {
        try {
          return await this.callAPIDetailed("handover", "exec", {
            handover: code
          });
        } catch (err) {
          if (err instanceof Errors.ApiError && (err.apiCode === 600 && err.response.error_code === 407)) {
            throw new Errors.InvalidTransferCodeError();
          } else {
            throw err;
          }
        }
      },
      renew: async () => this.callAPIDetailed<
        HTTPInterfaces.Response.handover.renew>("handover", "renew"),
    },
    live: {
      // get available accompany friends list
      partyList: async (songId: number) => this.callAPIDetailed<
        HTTPInterfaces.Response.live.partyList>("live", "partyList", {
          live_difficulty_id: songId
        }),
      deckList: async (accompanyFriendId: number) => this.callAPIDetailed<
        HTTPInterfaces.Response.live.deckList>("live", "deckList", {
          party_user_id: accompanyFriendId
        }),
      play: async (songId: number, accompanyFriendId: number, deckId: number) =>
        this.callAPIDetailed<HTTPInterfaces.Response.live.play>("live", "play", {
          live_difficulty_id: songId,
          party_user_id: accompanyFriendId,
          unit_deck_id: deckId
        }),
      reward: async (
        perfect: number, great: number, good: number, bad: number, miss: number,
        love: number, maxCombo: number, liveDifficultyID: number,
        smile: number, cute: number, cool: number,
        eventID: number, eventPoint: number) => {
        return await this.callAPIDetailed< // TODO request type annotation
          HTTPInterfaces.Response.live.reward>("live", "reward", {
            "good_cnt": good,
            "miss_cnt": miss,
            "great_cnt": great,
            "love_cnt": love, // bond pt
            "max_combo": maxCombo,
            "score_smile": smile,
            "perfect_cnt": perfect,
            "bad_cnt": bad,
            "event_point": eventPoint,
            "live_difficulty_id": liveDifficultyID,
            "score_cute": cute,
            "score_cool": cool,
            "event_id": eventID
          });
      }
    },
    download: {
      batch: async () => this.callAPIDetailed("download", "batch", {
        os: "Android",
        excluded_package_ids: [0, 1],
        package_type: 4
      })
    },
    secretbox: {
      all: async () => this.callAPIDetailed<
        HTTPInterfaces.Response.secretbox.all>("secretbox", "all"),
      pon: async (boxId: number, costPriority: number) => this.callAPIDetailed<
        HTTPInterfaces.Response.secretbox.pon,
        HTTPInterfaces.RequestData.secretbox.pon>("secretbox", "pon", {
          secret_box_id: boxId,
          cost_priority: costPriority // in secretbox/all cost.priority
        }),
      multi: async (boxId: number, costPriority: number, count: number) => this.callAPIDetailed<
        HTTPInterfaces.Response.secretbox.multi,
        HTTPInterfaces.RequestData.secretbox.multi>("secretbox", "multi", {
          secret_box_id: boxId,
          cost_priority: costPriority, // in secretbox/all cost.priority
          cost: count
        })
    }
  };
};
