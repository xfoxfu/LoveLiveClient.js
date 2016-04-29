/// <reference path="./references.d.ts" />

import crypto = require("crypto");
import request = require("request-promise");
import * as Request from "request";
const utils = require("utility");
import uuid = require("node-uuid");
import merge = require("merge");
let delay = (ms: number) => new Promise(r => setTimeout(r, ms || 0));

let config = {
  "llmcg_token": "xxxxxxx",
  "headers": {
    "application-id": "626776655",
    "accept": "*/*",
    "time-zone": "JST",
    "api-model": "straightforward",
    "client-version": "17.9",
    "host": "prod-jp.lovelive.ge.klabgames.net",
    "os": "Android",
    "accept-encoding": "gzip,deflate",
    "debug": "1",
    "region": "392",
    "bundle-version": "3.2",
    "os-version": "Nexus 6 google shamu 5.0",
    "platform-type": "2"
  }
};
namespace lib {
  export let randomInt = (min: number, max: number) => (Math.floor(Math.random() * (max - min)) + min);
  export let randomDec = (min: number, max: number) => (Math.random() * (max - min) + min);
}
namespace HTTPInterfaces {
  export interface ResponseBase<T> {
    response_data: T;
    status_code: number;
  };
  export interface MultiResponseEachBase<T> {
    result: T;
    status: number;
    commandNum: string;
    timeStamp: string;
  }
  export interface SimpleRequestBase {
  };
  export interface DetailedRequestBase {
    module: string;
    action: string;
    commandNum: string;
    timeStamp: string;
  };
  export interface MultiRequestEachBase {
    module: string;
    action: string;
    timestamp: string;
  };
  /* tslint:disable:class-name */
  export namespace Response {
    export namespace login {
      export interface authkey {
        authorize_token: string;
      };
      export interface login {
        authorize_token: string;
        user_id: number;
        review_version: string;
        server_timestamp: number;
      };
      export interface startUp {
        login_key: string;
        login_passwd: string;
        user_id: number;
      };
      export interface startWithoutInvite extends Array<any> {
      };
      export interface unitList {
        unit_initial_set: {
          unit_initial_set_id: number;
          unit_list: number[];
          center_unit_id: number
        }[];
      };
      export interface unitSelect {
        unit_id: number[];
      };
    };
    export namespace user {
      export interface userInfo {
        user_id: number;
        name: string;
        level: number;
        exp: number;
        previous_exp: number;
        next_exp: number;
        game_coin: number;
        sns_coin: number;
        free_sns_coin: number;
        paid_sns_coin: number;
        social_point: number;
        unit_max: number;
        energy_max: number;
        energy_max_time: string; // 2016-04-01 19:32:46
        energy_full_need_time: number;
        over_max_energy: number;
        friend_max: number;
        invite_code: string;
        insert_date: string; // 2016-04-01 19:32:46
        update_date: string; // 2016-04-01 19:32:46
        tutorial_state: number;
      };
      export interface changeName {
        before_name: string;
        after_name: string;
      };
    };
    export namespace tos {
      export interface tosCheck {
        tos_id: number;
        is_agreed: number;
      };
      export interface tosAgree extends Array<any> {
      };
    };
    export namespace tutorial {
      export interface progress extends Array<any> {
      };
      export interface skip extends Array<any> {
      };
    };

    export namespace unit {
      export interface unitAll extends Array<{
        unit_owning_user_id: number;
        unit_id: number;
        exp: number;
        next_exp: number;
        level: number;
        max_level: number;
        rank: number;
        max_rank: number;
        love: number;
        max_love: number;
        unit_skill_level: number;
        max_hp: number;
        is_rank_max: boolean;
        favorite_flag: boolean;
        is_love_max: boolean;
        is_level_max: boolean;
        is_skill_level_max: boolean;
        insert_date: string;
      }> { };
      export interface deckInfo extends Array<{
        unit_deck_id: number;
        main_flag: boolean;
        deck_name: string;
        unit_owning_user_ids: {
          position: number;
          unit_owning_user_id: number;
        }[]
      }> { };
      export interface merge {
        before: {
          unit_owning_user_id: number;
          unit_id: number;
          exp: number;
          next_exp: number;
          level: number;
          max_level: number;
          rank: number;
          max_rank: number;
          love: number;
          max_love: number;
          unit_skill_level: number;
          max_hp: number;
          favorite_flag: boolean;
          is_rank_max: boolean;
          is_love_max: boolean;
          is_level_max: boolean;
        };
        after: {
          unit_owning_user_id: number;
          unit_id: number;
          exp: number;
          next_exp: number;
          level: number;
          max_level: number;
          rank: number;
          max_rank: number;
          love: number;
          max_love: number;
          unit_skill_level: number;
          max_hp: number;
          favorite_flag: boolean;
          is_rank_max: boolean;
          is_love_max: boolean;
          is_level_max: boolean;
        };
        before_user_info: {
          level: number;
          exp: number;
          next_exp: number;
          game_coin: number;
          sns_coin: number;
          social_point: number;
          unit_max: number;
          energy_max: number;
          friend_max: number;
        };
        after_user_info: {
          level: number;
          exp: number;
          next_exp: number;
          game_coin: number;
          sns_coin: number;
          social_point: number;
          unit_max: number;
          energy_max: number;
          friend_max: number;
        };
        use_game_coin: number;
        evolution_setting_id: number;
        bonus_value: number;
        open_subscenario_id: any; // TODO
        get_exchange_point_list: any[]; // TODO
      };
      export interface rankUp {
        before: {
          unit_owning_user_id: number;
          unit_id: number;
          exp: number;
          next_exp: number;
          level: number;
          max_level: number;
          rank: number;
          max_rank: number;
          love: number;
          max_love: number;
          unit_skill_level: number;
          max_hp: number;
          favorite_flag: number;
          is_rank_max: boolean;
          is_love_max: boolean;
          is_level_max: boolean;
        };
        after: {
          unit_owning_user_id: number;
          unit_id: number;
          exp: number;
          next_exp: number;
          level: number;
          max_level: number;
          rank: number;
          max_rank: number;
          love: number;
          max_love: number;
          unit_skill_level: number;
          max_hp: number;
          favorite_flag: number;
          is_rank_max: boolean;
          is_love_max: boolean;
          is_level_max: boolean;
        };
        before_user_info: {
          level: number;
          exp: number;
          next_exp: number;
          game_coin: number;
          sns_coin: number;
          social_point: number;
          unit_max: number;
          energy_max: number;
          friend_max: number;
        };
        after_user_info: {
          level: number;
          exp: number;
          next_exp: number;
          game_coin: number;
          sns_coin: number;
          social_point: number;
          unit_max: number;
          energy_max: number;
          friend_max: number;
        };
        use_game_coin: number;
        open_subscenario_id: any; // TODO
        get_exchange_point_list: any[]; // TODO
      };
    };
  };
  export namespace RequestData {
    export namespace login {
      export interface Credital {
        login_key: string;
        login_passwd: string;
      };
      export interface login extends Credital { };
      export interface startUp extends Credital { };
      export interface startUpWithoutInvite extends Credital { };
      export interface unitList { };
      export interface unitSelect {
        unit_initial_set_id: number;
      };
    };
    export namespace user {
      export interface changeName {
        name: string;
      };
    };
    export namespace tos {
      export interface tosAgree {
        tos_id: number;
      };
    };
    export namespace tutorial {
      export interface progress {
        tutorial_state: number;
      };
    };
    export namespace unit {
      export interface merge {
        base_owning_unit_user_id: number;
        unit_owning_user_ids: number[];
      };
      export interface rankUp {
        base_owning_unit_user_id: number;
        unit_owning_user_ids: number[];
      };
    };
  };
  /* tslint:enable */
}
export = class Client {
  /**
   * basic functions
   */
  static setConfig(conf: {
    llmcg_token: string;
    headers: {
      "application-id": string;
      "accept": string;
      "time-zone": string;
      "api-model": string;
      "client-version": string;
      "host": string;
      "os": string;
      "accept-encoding": string;
      "debug": string;
      "region": string;
      "bundle-version": string;
      "os-version": string;
      "platform-type": string;
      "authorize": string;
      "content-type"?: string;
      "x-message-code"?: string;
    };
  }) {
    config = conf;
  }
  private static async calculateHash(data: string | Object): Promise<string> {
    let plainText: string;
    if (typeof data === "string") {
      plainText = data;
    } else {
      plainText = JSON.stringify(data);
    }
    return (await request({
      url: "http://llmcg.xfox.pw/api",
      json: true,
      method: "POST",
      body: {
        data: plainText,
        token: config.llmcg_token
      }
    }))["X-Message-Code"];
  };
  private static async buildUpRequestOpt(module: string, api: string, nonce: string, data?: any, token?: string, customHeaders?: any): Promise<Request.Options> {
    return await Client.buildUpRequestOptPlain(`${module}/${api}`, nonce, data, token, customHeaders);
  };
  private static async buildUpRequestOptPlain(url: string, nonce: string, data?: any, token?: string, customHeaders?: any): Promise<Request.Options> {
    let result: Request.Options = {
      uri: `http://prod-jp.lovelive.ge.klabgames.net/main.php/${url}`,
      method: "POST",
      headers: merge(config.headers, customHeaders),
      json: true,
      gzip: true
    };
    result.headers["authorize"] = `consumerKey=lovelive_test&timeStamp=${utils.timestamp()}&version=1.1&nonce=${nonce}`;
    if (token) {
      result.headers["authorize"] = `${result.headers["authorize"]}&token=${token}`;
    }
    if (data) {
      result.formData = { request_data: JSON.stringify(data) };
      result.headers["x-message-code"] = await this.calculateHash(data);
    }
    return result;
  }

  /**
   * instance properties
   */
  public user = {
    loginKey: "",
    loginPasswd: "",
    token: "",
    id: 0
  };
  private nonce = 2;

  /**
   * client operations
   */
  constructor(key: string, passwd: string) {
    this.user.loginKey = key;
    this.user.loginPasswd = passwd;
  }
  async startGame(delays?: { tos?: number }) {
    await this.buildUpUserToken();
    await this.api.user.userInfo();
    await this.api.getPersonalNotice();
    await this.tosCheckAndAgree(delays.tos); // delay
    await this.api.checkIfConnected();
    await this.api.getLBonus();
    // TODO simulate webview
    await this.api.multi.getStartUpInformation();
  }
  async generateTransferCode() {
    // TODO validate expiration
    return await this.api.getTransferCode();
  }
  async regenerateTransferCode() {
    return await this.api.renewTransferCode();
  }
  async playSong(interval?: number) {
    if (!interval) interval = 0;
    let parties = await this.api.getLivePartyList(3);
    let decks = await this.api.getLiveDeckList(parties.response_data.party_list[0].user_info.user_id);
    let songInfo = await this.api.startLive(parties.response_data.party_list[0].user_info.user_id, 1, 3);
    await delay(interval);
    return await this.api.getLiveReward(143, 38, 0, 0, 0,
      35, 181, 3,
      25684, 0, 0,
      songInfo.response_data.is_marathon_event ? songInfo.response_data.marathon_event_id : 0,
      songInfo.response_data.is_marathon_event ? 35 : 0);
  }
  /**
   * create user
   */
  private static generateCreditalPair(): [string, string] {
    return [uuid.v4(), crypto.createHash("sha512").update([uuid.v4(), Date.now()].toString()).digest("hex")];
  }
  // When Node.js adapts to v8 shipped with Chrome 49, use this line instead of the following 3 lines.
  // static async register(name = "Node-LLSIFClient", leader = 1): Promise<Client> {
  static async register(delays?: {
    tos?: number;
    selectLeader?: number;
    setName?: number;
  }, name?: string, leader?: number): Promise<Client> {
    const defaultNames = `幻の学院生 明るい学院生 期待の学院生 純粋な学院生 素直な学院生 元気な学院生 天然な学院生 勇敢な学院生 気になる学院生 真面目な学院生 不思議な学院生 癒し系な学院生 心優しい学院生 さわやかな学院生 頼りになる学院生 さすらいの学院生 正義感あふれる学院生 カラオケ好きの学院生`.split(" ");
    if (!name) name = defaultNames[lib.randomInt(0, defaultNames.length - 1)];
    // When v8 supports destructing, use the feature
    let accountCredits = Client.generateCreditalPair();
    let client = new Client(accountCredits[0], accountCredits[1]);
    client.user.token = await client.api.login.authkey();
    await client.api.login.startUp();
    await client.api.login.startWithoutInvite();
    await client.buildUpUserToken();
    await client.api.user.userInfo();
    await client.tosCheckAndAgree(delays.tos); // with delay
    await delay(delays.setName); // delay
    await client.api.user.changeName(name);
    await client.api.tutorial.progress(1);
    await client.api.multi.getStartUpInformation();
    await client.api.multi.unitAllAndDeck();
    let availableUnits: number[] = [];
    for (let unit of (await client.api.login.unitList()).response_data.unit_initial_set) {
      availableUnits.push(unit.unit_initial_set_id);
    }
    if (!leader) leader = lib.randomInt(0, availableUnits.length - 1);
    if (availableUnits.indexOf(leader) >= 0) {
      await delay(delays.selectLeader); // delay
      await client.api.login.unitSelect(leader);
    } else {
      throw "Invaid leader id";
    }
    await client.api.tutorial.skip();
    {
      let result = (await client.api.multi.unitAllAndDeck())["response_data"];
      let base = result[0]["result"][0]["unit_owning_user_id"];
      let mergePartner = result[0]["result"][10]["unit_owning_user_id"];
      await client.api.unit.merge(base, [mergePartner]);
      await client.api.tutorial.skip();
      let rankUpPartner = result[0]["result"][9]["unit_owning_user_id"];
      await client.api.unit.rankUp(base, [rankUpPartner]);
      await client.api.tutorial.skip();
    }
    return client;
  }
  static async startFromTransferCode(code: string, delays?: { tos?: number, code?: number }) {
    // When v8 supports, use better code
    // When v8 supports destructing, use the feature
    let accountCredits = Client.generateCreditalPair();
    let client = new Client(accountCredits[0], accountCredits[1]);
    client.user.token = await client.api.login.authkey();
    await client.api.login.startUp();
    await client.api.login.startWithoutInvite();
    await client.buildUpUserToken();
    await client.api.user.userInfo();
    await client.tosCheckAndAgree(delays.tos); // delay
    await delay(delays.code); // delay
    let result = await client.api.applyTransferCode(code);
    if (result !== 200) {
      throw "Invaid transfer code!";
    }
    return client;
  }
  async buildUpUserToken() {
    // When Node.js supports destructing, use it.
    let result = await this.api.login.login();
    this.user.token = result.authorize_token;
    this.user.id = result.user_id;
  }
  async tosCheckAndAgree(interval?: number) {
    let tosCheckResult = await this.api.tos.tosCheck();
    if (!tosCheckResult["response_data"]["is_agreed"]) {
      await delay(interval);
      await this.api.tos.tosAgree(tosCheckResult["response_data"]["tos_id"]);
    }
  }
  /**
   * api basic
   */
  private async buildUpRequestOptWithCredital<TRequest>(module: string, api: string, nonce: string): Promise<Request.Options> {
    if ((!this.user.loginKey) && (!this.user.loginPasswd) && (!this.user.token)) {
      throw "Client not initialized!";
    }
    let data = {
      login_key: this.user.loginKey,
      login_passwd: this.user.loginPasswd
    };
    let result = Client.buildUpRequestOpt(module, api, nonce, data, this.user.token, this.user.id ? { "User-ID": this.user.id } : {});
    return await result;
  }
  private async buildUpRequestOptPlain<TRequest>(module: string, api: string, nonce: string, data: TRequest): Promise<Request.Options> {
    if (!this.user.token) {
      throw "Client not initialized!";
    }
    let result = Client.buildUpRequestOpt(module, api, nonce, data, this.user.token, this.user.id ? { "User-ID": this.user.id } : {});
    return await result;
  }
  private async performRequestPlain<TResult>(module: string, api: string): Promise<HTTPInterfaces.ResponseBase<TResult>> {
    return await request(await this.buildUpRequestOptWithCredital(module, api, (this.nonce++).toString()));
  }
  private async performRequestDetailed<TResult>(module: string, api: string, data?: any): Promise<HTTPInterfaces.ResponseBase<TResult>>;
  private async performRequestDetailed<TResult, TRequestData>(module: string, api: string, data: TRequestData): Promise<HTTPInterfaces.ResponseBase<TResult>>;
  private async performRequestDetailed(module: string, api: string, data: any) {
    let dataToSend = merge(<HTTPInterfaces.DetailedRequestBase>{
      module: module,
      action: api,
      timeStamp: utils.timestamp().toString(),
      commandNum: `${uuid.v4()}.${utils.timestamp()}.${this.nonce++}`
    }, data);
    return await request(await this.buildUpRequestOptPlain(module, api, this.nonce.toString(), dataToSend));
  }
  private async performMultipleRequest<TResult>(requests: { module: string, api: string, data?: any }[]): Promise<TResult> {
    let dataToSend: any[] = [];
    for (let request of requests) {
      dataToSend.push(merge({
        module: request.module,
        action: request.api,
        timeStamp: utils.timestamp().toString()
      }, request.data));
    }
    return await request(await Client.buildUpRequestOptPlain("api", (this.nonce++).toString(), dataToSend, this.user.token));
  }
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
        let result: HTTPInterfaces.ResponseBase<HTTPInterfaces.Response.login.authkey> =
          await request(await Client.buildUpRequestOpt("login", "authkey", "1"));
        return result.response_data.authorize_token;
      },
      /**
       * login/login
       * 
       * Get user-related token.
       * 
       * @return Promise<string>
       */
      login: async () => {
        let result: HTTPInterfaces.ResponseBase<HTTPInterfaces.Response.login.login> =
          await request(
            await Client.buildUpRequestOpt("login", "login", "2",
              { "login_key": this.user.loginKey, "login_passwd": this.user.loginPasswd }, await this.api.login.authkey()));
        return result.response_data;
      },
      startUp: async () => {
        let result = await this.performRequestPlain<HTTPInterfaces.Response.login.startUp>("login", "startUp");
        if (result["response_data"]["login_key"] !== this.user.loginKey ||
          result["response_data"]["login_passwd"] !== this.user.loginPasswd) {
          throw "Invaid api result: key or passwd mismatch";
        }
      },
      startWithoutInvite: async () => {
        await this.performRequestPlain<HTTPInterfaces.Response.login.startWithoutInvite>("login", "startWithoutInvite");
      },
      unitList: async () => {
        return await this.performRequestDetailed<HTTPInterfaces.Response.login.unitList>("login", "unitList");
      },
      // set the center of initial team
      unitSelect: async (unitId: number) => {
        await this.performRequestDetailed<HTTPInterfaces.Response.login.unitSelect,
          HTTPInterfaces.RequestData.login.unitSelect>("login", "unitSelect", {
            unit_initial_set_id: unitId
          });
      }
    },
    user: {
      userInfo: async () => {
        return await this.performRequestDetailed<HTTPInterfaces.Response.user.userInfo>("user", "userInfo");
      },
      changeName: async (nickname: string) => {
        return await this.performRequestDetailed<HTTPInterfaces.Response.user.changeName,
          HTTPInterfaces.RequestData.user.changeName>("user", "changeName", { name: nickname });
      }
    },
    tos: {
      tosCheck: async () => {
        return await this.performRequestDetailed<HTTPInterfaces.Response.tos.tosCheck>("tos", "tosCheck");
      },
      tosAgree: async (tosId: number) => {
        return await this.performRequestDetailed<HTTPInterfaces.Response.tos.tosAgree>("tos", "tosAgree", { tos_id: tosId });
      }
    },
    tutorial: {
      // set state to 1 to skip it
      progress: async (state: number) => {
        await this.performRequestDetailed<HTTPInterfaces.Response.tutorial.progress,
          HTTPInterfaces.RequestData.tutorial.progress>("tutorial", "progress", { tutorial_state: state });
      },
      skip: async () => {
        await this.performRequestDetailed<HTTPInterfaces.Response.tutorial.skip>("tutorial", "skip");
      }
    },
    multi: {
      getStartUpInformation: async () => { // TODO type annotation
        return await this.performMultipleRequest([
          { module: "login", api: "topInfo" },
          { module: "live", api: "liveStatus" },
          { module: "live", api: "schedule" },
          { module: "marathon", api: "marathonInfo" },
          { module: "login", api: "topInfoOnce" },
          { module: "unit", api: "unitAll" },
          { module: "unit", api: "deckInfo" },
          { module: "payment", api: "productList" },
          { module: "scenario", api: "scenarioStatus" },
          { module: "subscenario", api: "subscenarioStatus" },
          { module: "user", api: "showAllItem" },
          { module: "battle", api: "battleInfo" },
          { module: "banner", api: "bannerList" },
          { module: "notice", api: "noticeMarquee" },
          { module: "festival", api: "festivalInfo" },
          { module: "eventscenario", api: "status" },
          { module: "navigation", api: "specialCutin" },
          { module: "album", api: "albumAll" },
          { module: "award", api: "awardInfo" },
          { module: "background", api: "backgroundInfo" },
          { module: "online", api: "info" },
          { module: "challenge", api: "challengeInfo" }
        ]);
      },
      unitAllAndDeck: async () => {
        return await this.performMultipleRequest<[
          HTTPInterfaces.MultiResponseEachBase<HTTPInterfaces.Response.unit.unitAll>,
          HTTPInterfaces.MultiResponseEachBase<HTTPInterfaces.Response.unit.deckInfo>
        ]>([
          { module: "unit", api: "unitAll" },
          { module: "unit", api: "deckInfo" }
        ]);
      }
    },
    unit: {
      merge: async (base: number, partners: number[]) => {
        await this.performRequestDetailed<HTTPInterfaces.Response.unit.merge,
          HTTPInterfaces.RequestData.unit.merge>("unit", "merge",
          { "base_owning_unit_user_id": base, "unit_owning_user_ids": partners });
      },
      rankUp: async (base: number, partners: number[]) => {
        await this.performRequestDetailed<HTTPInterfaces.Response.unit.rankUp,
          HTTPInterfaces.RequestData.unit.rankUp>("unit", "rankUp", {
            base_owning_unit_user_id: base,
            unit_owning_user_ids: partners
          });
      }
    },
    getLBonus: async () => {
      await this.performRequestDetailed("lbonus", "execute");
    },
    getPersonalNotice: async () => {
      return await this.performRequestDetailed<{
        response_data: {
          "has_notice": boolean;
          "notice_id": number;
          "type": number;
          "title": number;
          "contents": number;
        };
        status_code: number;
      }>("personalnotice", "get");
    },
    checkIfConnected: async (): Promise<boolean> => {
      return (await this.performRequestDetailed<{
        is_connected: boolean;
      }>("platformAccount", "isConnectedLlAccount")).response_data.is_connected;
    },
    getTransferCode: async () => {
      return (await this.performRequestDetailed<{
        response_data: {
          code: string;
          expire_date: string;
        };
        status_code: number;
      }>("handover", "start")).response_data;
    },
    applyTransferCode: async (code: string) => {
      return (await this.performRequestDetailed<{
        response_data: any;
        status_code: number;
      }>("handover", "exec", { handover: code })).status_code;
    },
    renewTransferCode: async () => {
      return (await this.performRequestDetailed<{
        response_data: {
          code: string;
          expire_date: string;
        };
        status_code: number;
      }>("handover", "renew")).response_data;
    },
    // TODO find out how difficulty is calculated
    getLivePartyList: async (difficulty: number) => {
      difficulty = 3;
      return await this.performRequestDetailed<{
        party_list: {
          "user_info": {
            "user_id": number;
            "name": string;
            "level": number;
          };
          "center_unit_info": {
            "love": number;
            "unit_id": number;
            "level": number;
            "smile": number;
            "cute": number;
            "cool": number;
            "is_rank_max": boolean;
            "is_love_max": boolean;
            "is_level_max": boolean;
            "max_hp": number;
            "unit_skill_level": number;
          };
          "setting_award_id": number;
          "available_social_point": number;
          "friend_status": number;
        }[];
      }>("live", "partyList", { live_difficulty_id: difficulty });
    },
    getLiveDeckList: async (party_user_id: number) => {
      return await this.performRequestDetailed<{
        "unit_deck_list": {
          "unit_deck_id": number;
          "main_flag": boolean;
          "deck_name": string;
          "unit_list": {
            "unit_owning_user_id": number;
          }[];
          "party_info": {
            "user_info": {
              "user_id": number;
              "name": string;
              "level": number;
            };
            "center_unit_info": {
              "unit_id": number;
              "level": number;
              "smile": number;
              "cute": number;
              "cool": number;
              "is_rank_max": boolean;
              "is_love_max": boolean;
              "is_level_max": boolean;
            };
            "setting_award_id": number;
          };
          "subtotal_smile": number;
          "subtotal_cute": number;
          "subtotal_cool": number;
          "subtotal_skill": number;
          "subtotal_hp": number;
          "total_smile": number;
          "total_cute": number;
          "total_cool": number;
          "total_skill": number;
          "total_hp": number;
          "prepared_hp_damage": number;
        }[];
      }>("live", "deckList", { party_user_id: party_user_id });
    },
    // TODO find out how difficulty is calculated
    startLive: async (partyUserID: number, unitDeckID: number, liveDifficultyID: number) => {
      return await this.performRequestDetailed<{
        "rank_info": {
          "rank": number;
          "rank_min": number;
          "rank_max": number;
        }[];
        "live_info": {
          "live_difficulty_id": number;
          "is_random": boolean;
          "dangerous": boolean;
          "use_quad_point": boolean;
          "notes_speed": boolean;
          "notes_list": {
            "timing_sec": number;
            "notes_attribute": number;
            "notes_level": number;
            "effect": number;
            "effect_value": number;
            "position": number;
          }[];
        }[];
        "is_marathon_event": boolean;
        "marathon_event_id": number;
        "energy_full_time": string;
        "over_max_energy": number;
        "live_se_id": number;
      }>("live", "play", {
        live_difficulty_id: liveDifficultyID,
        party_user_id: partyUserID,
        unit_deck_id: unitDeckID
      });
    },
    getLiveReward: async (
      perfect: number, great: number, good: number, bad: number, miss: number,
      love: number, maxCombo: number, liveDifficultyID: number,
      smile: number, cute: number, cool: number,
      eventID: number, eventPoint: number) => {
      return await this.performRequestDetailed("live", "reward", {
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
  };
};