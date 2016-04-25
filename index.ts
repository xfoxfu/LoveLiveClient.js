/// <reference path="./references.d.ts" />

import crypto = require("crypto");
import request = require("request-promise");
import * as Request from "request";
const utils = require("utility");
import uuid = require("node-uuid");
import merge = require("merge");
let delay = (ms: number) => new Promise(r => setTimeout(r, ms));

let config = {
  "llmcg_token": "xxxxxxx",
  "headers": {
    "application-id": "626776655",
    "accept": "*/*",
    "time-zone": "JST",
    "api-model": "straightforward",
    "client-version": "17.6",
    "host": "prod-jp.lovelive.ge.klabgames.net",
    "os": "Android",
    "accept-encoding": "gzip,deflate",
    "debug": "1",
    "region": "392",
    "bundle-version": "3.2",
    "os-version": "A0001 oneplus MSM8974 6.0.1",
    "platform-type": "2"
  }
};
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
      url:"http://llmcg.xfox.pw/api",
      json: true,
      method: "POST",
      body: {
        data: plainText,
        token: config.llmcg_token
      }
    }))["X-Message-Code"];
  };
  private static async buildUpRequestOpt(module: string, api: string, nonce: string, data?: any, token?: string, customHeaders?: any): Promise<Request.Options> {
    if (data && token) {
      return await Client.buildUpRequestOptPlain(`${module}/${api}`, nonce, data, token, customHeaders);
    } else {
      return Client.buildUpRequestOptPlain(`${module}/${api}`, nonce);
    }
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
  async startGame() {
    await this.buildUpUserToken();
    await this.getUserInfo();
    await this.getPersonalNotice();
    await this.tosCheckAndAgree();
    await this.checkIfConnected();
    await this.getLBonus();
    await this.getStartUpInformation();
  }
  async generateTransferCode() {
    // TODO validate expiration
    return (await this.getTransferCode()).code;
  }
  async playSong(interval?: number) {
    if (!interval) interval = 0;
    let parties = await this.getLivePartyList(3);
    let decks = await this.getLiveDeckList(parties.response_data.party_list[0].user_info.user_id);
    let songInfo = await this.startLive(parties.response_data.party_list[0].user_info.user_id, 1, 3);
    await delay(interval);
    return await this.getLiveReward(143, 38, 0, 0, 0,
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
  static async register(name?: string, leader?: number): Promise<Client> {
    if (!name) name = "Node-LLSIFClient";
    if (!leader) leader = 1;
    // When v8 supports destructing, use the feature
    let accountCredits = Client.generateCreditalPair();
    let client = new Client(accountCredits[0], accountCredits[1]);
    client.user.token = await client.getInitialToken();
    await client.startUpNewAccount();
    await client.startWithoutInvite();
    await client.buildUpUserToken();
    await client.getUserInfo();
    await client.tosCheckAndAgree();
    await client.changeName(name);
    await client.tutorialProgress(1);
    await client.getStartUpInformation();
    await client.unitAllAndDeck();
    let availableUnits: number[] = [];
    for (let unit of (await client.getUnitList()).response_data.unit_initial_set) {
      availableUnits.push(unit.unit_initial_set_id);
    }
    if (availableUnits.indexOf(leader) >= 0) {
      await client.unitSelect(leader);
    } else {
      throw "Invaid leader id";
    }
    await client.skipTutorial();
    {
      let result = (await client.unitAllAndDeck())["response_data"];
      let base = result[0]["result"][0]["unit_owning_user_id"];
      let mergePartner = result[0]["result"][10]["unit_owning_user_id"];
      await client.unitMerge(base, mergePartner);
      await client.skipTutorial();
      let rankUpPartner = result[0]["result"][9]["unit_owning_user_id"];
      await client.unitRankUp(base, rankUpPartner);
      await client.skipTutorial();
    }
    return client;
  }
  static async startFromTransferCode(code: string) {
    // When v8 supports destructing, use the feature
    let accountCredits = Client.generateCreditalPair();
    let client = new Client(accountCredits[0], accountCredits[1]);
    client.user.token = await client.getInitialToken();
    await client.startUpNewAccount();
    await client.startWithoutInvite();
    await client.buildUpUserToken();
    await client.getUserInfo();
    await client.tosCheckAndAgree();
    let result = await client.applyTransferCode(code);
    if (result !== 200) {
      throw "Invaid transfer code!";
    }
    return client;
  }

  /**
   * api basic
   */
  private async buildUpRequestOptWithCredital(module: string, api: string, nonce: string, data: any): Promise<Request.Options> {
    if ((!this.user.loginKey) && (!this.user.loginPasswd) && (!this.user.token)) {
      throw "Client not initialized!";
    }
    data["login_key"] = this.user.loginKey;
    data["login_passwd"] = this.user.loginPasswd;
    let result = Client.buildUpRequestOpt(module, api, nonce, data, this.user.token, this.user.id ? { "User-ID": this.user.id } : {});
    return await result;
  }
  private async buildUpRequestOptPlain(module: string, api: string, nonce: string, data: any): Promise<Request.Options> {
    if (!this.user.token) {
      throw "Client not initialized!";
    }
    let result = Client.buildUpRequestOpt(module, api, nonce, data, this.user.token, this.user.id ? { "User-ID": this.user.id } : {});
    return await result;
  }
  // When Node.js adapts to v8 shipped with Chrome 49, use this line instead of the following 2 lines.
  // private async performRequestPlain<TResult>(module: string, api: string, data:any = {}): Promise<TResult> {
  private async performRequestPlain<TResult>(module: string, api: string, data?: any): Promise<TResult> {
    if (!data) data = {};
    return await request(await this.buildUpRequestOptWithCredital(module, api, (this.nonce++).toString(), data));
  }
  private async performRequestDetailed<TResult>(module: string, api: string, data?: any): Promise<TResult> {
    let dataToSend = {
      module: module,
      action: api,
      timeStamp: utils.timestamp(),
      commandNum: `${uuid.v4()}.${utils.timestamp()}.${this.nonce++}`
    };
    dataToSend = merge(dataToSend, data);
    return await request(await this.buildUpRequestOptPlain(module, api, this.nonce.toString(), dataToSend));
  }
  private async performMultipleRequest<TResult>(requests: { module: string, api: string, data?: any }[]) {
    let dataToSend: any[] = [];
    for (let request of requests) {
      dataToSend.push(merge({
        module: request.module,
        action: request.api,
        timestamp: utils.timestamp()
      }, request.data));
    }
    return await request(await Client.buildUpRequestOptPlain("api", (this.nonce++).toString(), dataToSend, this.user.token));
  }

  /**
   * api implement
   */
  async getInitialToken(): Promise<string> {
    let result = await request(await Client.buildUpRequestOpt("login", "authkey", "1"));
    return result["response_data"]["authorize_token"];
  }
  async getUserTokenAndId() {
    let result = await request(
      await Client.buildUpRequestOpt("login", "login", "2",
        { "login_key": this.user.loginKey, "login_passwd": this.user.loginPasswd }, await this.getInitialToken()));
    return <{ authorize_token: string; user_id: number; }>result["response_data"];
  }
  private async buildUpUserToken() {
    // When Node.js supports destructing, use it.
    let result = await this.getUserTokenAndId();
    this.user.token = result.authorize_token;
    this.user.id = result.user_id;
  }
  private async startUpNewAccount() {
    interface IStartUpResult {
      response_data: {
        login_key: string;
        login_passwd: string;
        user_id: number;
      };
      status_code: number;
    }
    let result = await this.performRequestPlain<IStartUpResult>("login", "startUp");
    if (result["response_data"]["login_key"] !== this.user.loginKey ||
      result["response_data"]["login_passwd"] !== this.user.loginPasswd) {
      throw "Invaid api result: key or passwd mismatch";
    }
  }
  private async startWithoutInvite() {
    interface IStartWithoutInviteResult {
      response_data: any[];
      status_code: number;
    }
    await this.performRequestPlain<IStartWithoutInviteResult>("login", "startWithoutInvite");
  }
  async getUserInfo() {
    interface IUserInfoResult {
      response_data: {
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
      status_code: number;
    }
    return await this.performRequestDetailed<IUserInfoResult>("user", "userInfo");
  }
  async tosCheckAndAgree() {
    interface ITosCheckResult {
      response_data: {
        tos_id: number;
        is_agreed: number;
      };
      status_code: number;
    }
    let tosCheckResult = await this.performRequestDetailed<ITosCheckResult>("tos", "tosCheck");
    if (!tosCheckResult["response_data"]["is_agreed"]) {
      await this.tosAgree(tosCheckResult["response_data"]["tos_id"]);
    }
  }
  private async tosAgree(tos_id: number) {
    await this.performRequestPlain("tos", "tosAgree", { tos_id: tos_id });
  }
  async changeName(nickname: string) {
    interface IChangeNameResult {
      response_data: {
        before_name: string;
        after_name: string;
      };
      status_code: number;
    }
    return await this.performRequestDetailed<IChangeNameResult>("user", "changeName", { name: nickname });
  }
  // set state to 1 to skip it
  private async tutorialProgress(state: number) {
    await this.performRequestDetailed("tutorial", "progress", { tutorial_state: state });
  }
  async getStartUpInformation() {
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
  }
  async getUnitList() {
    interface IUnitListResult {
      response_data: {
        unit_initial_set: {
          unit_initial_set_id: number;
          unit_list: number[];
          center_unit_id: number;
        }[];
      };
      status_code: number;
    }
    return await this.performRequestDetailed<IUnitListResult>("login", "unitList");
  }
  // set the center of initial team
  async unitSelect(unitId: number) {
    await this.performRequestDetailed("login", "unitSelect", { unit_initial_set_id: unitId });
  }
  async skipTutorial() {
    await this.performRequestDetailed("tutorial", "skip");
  }
  async unitAllAndDeck() {
    return await this.performMultipleRequest<{
      response_data: {

      };
      status_code: number;
    }[]>([
      { module: "unit", api: "unitAll" },
      { module: "unit", api: "deckInfo" }
    ]);
  }
  async unitMerge(base: number, partner: number) {
    await this.performRequestDetailed("unit", "merge",
      { "base_owning_unit_user_id": base, "unit_owning_user_ids": partner });
  }
  async unitRankUp(base: number, partner: number) {
    await this.performRequestDetailed("unit", "rankUp",
      { "base_owning_unit_user_id": base, "unit_owning_user_ids": partner });
  }
  async getLBonus() {
    await this.performRequestDetailed("lbonus", "execute");
  }
  async getPersonalNotice() {
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
  }
  async checkIfConnected(): Promise<boolean> {
    return (await this.performRequestDetailed<{
      response_data: {
        is_connected: boolean;
      };
      status_code: number;
    }>("platformAccount", "isConnectedLlAccount")).response_data.is_connected;
  }
  private async getTransferCode() {
    return (await this.performRequestDetailed<{
      response_data: {
        code: string;
        expire_data: string;
      };
      status_code: number;
    }>("handover", "start")).response_data;
  }
  private async applyTransferCode(code: string) {
    return (await this.performRequestDetailed<{
      response_data: any;
      status_code: number;
    }>("handover", "exec", { handover: code })).status_code;
  }
  // TODO find out how difficulty is calculated
  private async getLivePartyList(difficulty: number) {
    difficulty = 3;
    return await this.performRequestDetailed<{
      response_data: {
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
      };
      status_code: number;
    }>("live", "partyList", { live_difficulty_id: difficulty });
  }
  private async getLiveDeckList(party_user_id: number) {
    return await this.performRequestDetailed<{
      "response_data": {
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
      };
      "status_code": number;
    }>("live", "deckList", { party_user_id: party_user_id });
  }
  // TODO find out how difficulty is calculated
  private async startLive(partyUserID: number, unitDeckID: number, liveDifficultyID: number) {
    return await this.performRequestDetailed<{
      "response_data": {
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
      };
      "status_code": number;
    }>("live", "play", {
      live_difficulty_id: liveDifficultyID,
      party_user_id: partyUserID,
      unit_deck_id: unitDeckID
    });
  }
  private async getLiveReward(
    perfect: number, great: number, good: number, bad: number, miss: number,
    love: number, maxCombo: number, liveDifficultyID: number,
    smile: number, cute: number, cool: number,
    eventID: number, eventPoint: number) {
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
}