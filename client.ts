/// <reference path="./references.d.ts" />

import request = require("request-promise");
import * as Request from "request";
const utils = require("utility");
import uuid = require("node-uuid");
import merge = require("merge");
import crypto = require("crypto-promise");
const RequestErrors = require("request-promise/errors");

namespace lib {
  export let randomInt = (min: number, max: number) => (Math.floor(Math.random() * (max - min)) + min);
  export let randomDec = (min: number, max: number) => (Math.random() * (max - min) + min);
  export let delay = (ms: number) => new Promise(r => setTimeout(r, ms || 0));
}
export namespace HTTPInterfaces {
  export interface ResponseBase<T> {
    response_data: T;
    status_code: number;
  };
  export interface MultiResponseEachBase<T> {
    result: T;
    status: number;
    commandNum: string;
    timeStamp: string;
  };
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
    export namespace lbonus {
      export interface login {
        login_count: number;
        days_from_first_login: number;
        before_lbonus_point: number;
        after_lbonus_point: number;
        last_login_date: string;
        show_next_item: boolean;
        items: {
          point: {
            incentive_id: number;
            incentive_item_id: number;
            amount: number;
            add_type: number;
          }[];
        };
        card_info: {
          start_date: string;
          end_date: string;
          lbonus_count: number;
          items: {
            lbonus_point: number;
            incentive_item_id: number;
            amount: number;
            add_type: number;
          }[];
        };
        sheets: {
          nlbonus_id: number;
          nlbonus_item_num: number;
          detail_text: string;
          bg_asset: string;
          show_next_item: boolean;
          items: {
            nlbonus_item_id: number;
            seq: number;
            amount: number;
            add_type: number;
            incentive_item_id: number;
          }[];
          get_item: {
            amount: number;
            add_type: number;
            incentive_item_id: number;
          };
          stamp_num: number;
        }[];
        bushimo_reward_info: any[]; // TODO
        accomplished_achievement_list: {
          achievement_id: number;
          count: number;
          is_accomplished: boolean;
          insert_date: string;
          end_date: any; // TODO
          remaining_time: string;
          is_new: boolean;
          for_display: boolean;
          reward_list: {
            item_id: number;
            add_type: number;
            amount: number;
            item_category_id: number;
            reward_box_flag: boolean;
          }[];
        }[];
        new_achievement_cnt: number;
        unaccomplished_achievement_cnt: number;
        after_user_info: {
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
          current_energy: number;
          energy_max: number;
          energy_full_time: string;
          over_max_energy: number;
          friend_max: number;
          tutorial_state: number;
        };
        added_achievement_list: any[]; // TODO
      };
    };
    export namespace personalnotice {
      export interface get {
        has_notice: boolean;
        notice_id: number;
        type: number;
        title: number;
        contents: number;
      };
    };
    export namespace platformAccount {
      export interface isConnectedLlAccount {
        is_connected: boolean;
      };
    };
    export namespace handover {
      interface code {
        code: string;
        expire_date: string;
      };
      export interface start extends code { };
      export interface renew extends code { };
    };
    export namespace live {
      export interface partyList {
        party_list: {
          user_info: {
            user_id: number;
            name: string;
            level: number;
          };
          center_unit_info: {
            love: number;
            unit_id: number;
            level: number;
            smile: number;
            cute: number;
            cool: number;
            is_rank_max: boolean;
            is_love_max: boolean;
            is_level_max: boolean;
            max_hp: number;
            unit_skill_level: number;
          };
          setting_award_id: number;
          available_social_point: number;
          friend_status: number;
        }[];
      };
      export interface deckList {
        unit_deck_list: {
          unit_deck_id: number;
          main_flag: boolean;
          deck_name: string;
          unit_list: {
            unit_owning_user_id: number;
          }[];
          party_info: {
            user_info: {
              user_id: number;
              name: string;
              level: number;
            };
            center_unit_info: {
              unit_id: number;
              level: number;
              smile: number;
              cute: number;
              cool: number;
              is_rank_max: boolean;
              is_love_max: boolean;
              is_level_max: boolean;
            };
            setting_award_id: number;
          };
          subtotal_smile: number;
          subtotal_cute: number;
          subtotal_cool: number;
          subtotal_skill: number;
          subtotal_hp: number;
          total_smile: number;
          total_cute: number;
          total_cool: number;
          total_skill: number;
          total_hp: number;
          prepared_hp_damage: number;
        }[];
      };
      export interface play {
        rank_info: {
          rank: number;
          rank_min: number;
          rank_max: number;
        }[];
        live_info: {
          live_difficulty_id: number;
          is_random: boolean;
          dangerous: boolean;
          use_quad_point: boolean;
          notes_speed: boolean;
          notes_list: {
            timing_sec: number;
            notes_attribute: number;
            notes_level: number;
            effect: number;
            effect_value: number;
            position: number;
          }[];
        }[];
        is_marathon_event: boolean;
        marathon_event_id: number;
        energy_full_time: string;
        over_max_energy: number;
        live_se_id: number;
      };
      export interface reward {
        live_info: {
          live_difficulty_id: number;
          is_random: boolean;
          dangerous: boolean;
          use_quad_point: boolean;
        }[];
        rank: number;
        combo_rank: number;
        total_love: number;
        is_high_score: boolean;
        hi_score: number;
        base_reward_info: {
          player_exp: number;
          player_exp_unit_max: {
            before: number;
            after: number;
          };
          player_exp_friend_max: {
            before: number;
            after: number;
          };
          player_exp_lp_max: {
            before: number;
            after: number;
          };
          game_coin: number;
          game_coin_reward_box_flag: boolean;
          social_point: number;
        };
        reward_unit_list: {
          live_clear: {
            add_type: number;
            unit_id: number;
            unit_owning_user_id: any; // TODO
            exp: number;
            next_exp: number;
            max_hp: number;
            level: number;
            skill_level: number;
            rank: number;
            love: number;
            is_rank_max: boolean;
            is_level_max: boolean;
            is_love_max: boolean;
            new_unit_flag: boolean;
            reward_box_flag: boolean;
          }[];
          live_rank: {
            add_type: number;
            unit_id: number;
            unit_owning_user_id: any; // TODO
            exp: number;
            next_exp: number;
            max_hp: number;
            level: number;
            skill_level: number;
            rank: number;
            love: number;
            is_rank_max: boolean;
            is_level_max: boolean;
            is_love_max: boolean;
            new_unit_flag: boolean;
            reward_box_flag: boolean;
          }[];
          live_combo: {
            add_type: number;
            unit_id: number;
            unit_owning_user_id: any; // TODO
            exp: number;
            next_exp: number;
            max_hp: number;
            level: number;
            skill_level: number;
            rank: number;
            love: number;
            is_rank_max: boolean;
            is_level_max: boolean;
            is_love_max: boolean;
            new_unit_flag: boolean;
            reward_box_flag: boolean;
          }[];
        };
        unlocked_subscenario_ids: any[]; // TODO
        unit_list: {
          unit_owning_user_id: number;
          unit_id: number;
          position: number;
          level: number;
          unit_skill_level: number;
          before_love: number;
          love: number;
          max_love: number;
          is_rank_max: boolean;
          is_love_max: boolean;
          is_level_max: boolean
        }[];
        before_user_info: {
          level: number;
          exp: number;
          previous_exp: number;
          next_exp: number;
          game_coin: number;
          sns_coin: number;
          social_point: number;
          unit_max: number;
          energy_max: number;
          friend_max: number;
          tutorial_state: number;
          energy_full_time: string;
          over_max_energy: number;
        };
        after_user_info: {
          level: number;
          exp: number;
          previous_exp: number;
          next_exp: number;
          game_coin: number;
          sns_coin: number;
          social_point: number;
          unit_max: number;
          energy_max: number;
          friend_max: number;
          tutorial_state: number;
          energy_full_time: string;
          over_max_energy: number;
        };
        next_level_info: {
          level: number;
          from_exp: number
        }[];
        goal_accomp_info: {
          achieved_ids: any[]; // TODO
          rewards: any[];
        };
        special_reward_info: any[];
        event_info: any[];
        daily_reward_info: any[];
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
interface ICalculateHashFunction { (data: string): Promise<string>; };
interface IDelayFunction { (apiAddr: string): Promise<any>; };
export interface IConfig {
  calculateHash: ICalculateHashFunction;
  delay: IDelayFunction;
  maxRetry: number;
  headers: {
    "Application-ID": string;
    Accept: string;
    "Time-Zone": string;
    "Api-Model": string;
    "Client-Version": string;
    Host: string;
    OS: string;
    "Accept-Encoding": string;
    Debug: string;
    Region: string;
    "Bundle-Version": string;
    "OS-Version": string;
    "Platform-Type": string;
    Authorize?: string;
    "Content-Type"?: string;
    "X-Message-Code"?: string;
  };
};
export namespace predefinedFunctions {
  export namespace calculateHash {
    export let LLMCG = (token: string): ICalculateHashFunction => (async (data: string) => (await request({
      url: "http://llmcg.xfox.pw/api",
      json: true,
      method: "POST",
      body: {
        data: data,
        token: token
      }
    }))["X-Message-Code"]);
    export let withKey = (key: string): ICalculateHashFunction => (
      async (data: string) => await crypto.hmac("sha1", key)(data, "utf8").toString("hex")
    );
  };
  export namespace delay {
    interface IMaxMinPair {
      min: number;
      max: number;
    }
    export interface IConfig {
      tosAgree: IMaxMinPair;
      userChangeName: IMaxMinPair;
      loginUnitSelect: IMaxMinPair;
      liveReward: IMaxMinPair;
      handoverExec: IMaxMinPair;
      default: IMaxMinPair;
    }
    export let custom = (config: IConfig) => (async (apiAddr: string) => {
      switch (apiAddr) {
        case "tos/tosAgree": {
          await lib.delay(lib.randomInt(config.tosAgree.min, config.tosAgree.max));
          break;
        };
        case "user/changeName": {
          await lib.delay(lib.randomInt(config.userChangeName.min, config.userChangeName.max));
          break;
        };
        case "login/unitSelect": {
          await lib.delay(lib.randomInt(config.loginUnitSelect.min, config.loginUnitSelect.max));
          break;
        };
        case "live/reward": {
          await lib.delay(lib.randomInt(config.liveReward.min, config.liveReward.max));
          break;
        };
        case "handover/exec": {
          await lib.delay(lib.randomInt(config.handoverExec.min, config.handoverExec.max));
          break;
        };
        default: {
          await lib.delay(lib.randomInt(config.default.min, config.default.max));
          break;
        };
      };
    });
    export let fastest = () => Promise.resolve();
    export let defaultTimes: IConfig = {
      tosAgree: { min: 2000, max: 3000 },
      userChangeName: { min: 3000, max: 5000 },
      loginUnitSelect: { min: 3000, max: 7000 },
      liveReward: { min: 150000, max: 180000 },
      handoverExec: { min: 5000, max: 10000 },
      default: { min: 300, max: 500 }
    };
  }
};
export namespace Errors {
  export class ApiError extends Error {
    httpCode: number;
    apiCode: number;
    request: Request.Options;
    constructor(httpStatus: number, apiStatus: number, requestOptions: Request.Options) {
      super(`API Error with HTTP Status "${httpStatus}" and API Status "${apiStatus}"`);
      this.name = "APIError";
      this.httpCode = httpStatus;
      this.apiCode = apiStatus;
      this.request = requestOptions;
    };
  };
  export class ClientNotInitializedError extends Error {
    constructor() {
      super("Client not initialized.");
      this.name = "ClientNotInitializedError";
    }
  };
};
export let getClientClass = (config: IConfig = {
  calculateHash: (data: string) => Promise.resolve(data),
  delay: predefinedFunctions.delay.fastest,
  maxRetry: 10,
  headers: {
    "Application-ID": "626776655",
    Accept: "*/*",
    "Time-Zone": "JST",
    "Api-Model": "straightforward",
    "Client-Version": "17.9",
    Host: "prod-jp.lovelive.ge.klabgames.net",
    OS: "Android",
    "Accept-Encoding": "gzip,deflate",
    Debug: "1",
    Region: "392",
    "Bundle-Version": "3.2",
    "OS-Version": "Nexus 6 google shamu 5.0",
    "Platform-Type": "2"
  }
}) => {
  if (!config.calculateHash) config.calculateHash = (data: string) => Promise.resolve(data);
  if (!config.delay) config.delay = predefinedFunctions.delay.fastest;
  if (!config.maxRetry) config.maxRetry = 10;
  return class Client {
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
    private static async buildUpRequestOpt(module: string, action: string, nonce: string, data?: any, token?: string, customHeaders?: any): Promise<Request.Options> {
      return await Client.buildUpRequestOptPlain(`${module}/${action}`, nonce, data, token, customHeaders);
    };
    private static async buildUpRequestOptPlain(apiAddr: string, nonce: string, data?: any, token?: string, customHeaders?: any): Promise<Request.Options> {
      await config.delay(apiAddr);
      let result: Request.Options = {
        uri: `http://prod-jp.lovelive.ge.klabgames.net/main.php/${apiAddr}`,
        method: "POST",
        headers: merge(config.headers, customHeaders),
        json: true,
        gzip: true
      };
      result.headers["Authorize"] = `consumerKey=lovelive_test&timeStamp=${utils.timestamp()}&version=1.1&nonce=${nonce}`;
      if (token) {
        result.headers["Authorize"] = `${result.headers["Authorize"]}&token=${token}`;
      }
      if (data) {
        result.formData = { request_data: JSON.stringify(data) };
        result.headers["X-Message-Code"] = await this.calculateHash(data);
      }
      return result;
    };
    private static async request<T>(options: Request.Options): Promise<T> {
      for (let i = 1; i <= config.maxRetry; i++) {
        try {
          let result: HTTPInterfaces.ResponseBase<T> = await request(options);
          return result.response_data;
        } catch (err) {
          if (err.name = "RequestError") {
          } else if (err.name === "StatusCodeError") {
            if (!((err.statusCode >= 502) && (err.statusCode <= 504))) {
              throw new Errors.ApiError(err.statusCode, 0, options);
            }
          } else {
            throw err;
          }
        }
      }
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
      await this.api.user.userInfo();
      await this.api.personalnotice.get();
      await this.tosCheckAndAgree();
      await this.api.platformAccount.isConnectedLlAccount();
      await this.api.lbonus.execute();
      // TODO simulate webview
      await this.api.multi.getStartUpInformation();
    }
    async generateTransferCode() {
      // TODO validate expiration
      return (await this.api.handover.start()).response_data;
    }
    async regenerateTransferCode() {
      return (await this.api.handover.renew()).response_data;
    }
    async playSong() {
      let parties = await this.api.live.partyList(3);
      let decks = await this.api.live.deckList(parties.response_data.party_list[0].user_info.user_id);
      let songInfo = await this.api.live.play(parties.response_data.party_list[0].user_info.user_id, 1, 3);
      return await this.api.live.reward(143, 38, 0, 0, 0,
        35, 181, 3,
        25684, 0, 0,
        songInfo.response_data.is_marathon_event ? songInfo.response_data.marathon_event_id : 0,
        songInfo.response_data.is_marathon_event ? 35 : 0);
    }
    /**
     * create user
     */
    private static generateCreditalPair(): [string, string] {
      return [uuid.v4(), crypto.hash("sha512")([uuid.v4(), Date.now()].toString()).toString("hex")];
    }
    // When Node.js adapts to v8 shipped with Chrome 49, use this line instead of the following 3 lines.
    // static async register(name = "Node-LLSIFClient", leader = 1): Promise<Client> {
    static async register(name?: string, leader?: number): Promise<Client> {
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
      await client.tosCheckAndAgree();
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
    static async startFromTransferCode(code: string) {
      // When v8 supports, use better code
      // When v8 supports destructing, use the feature
      let accountCredits = Client.generateCreditalPair();
      let client = new Client(accountCredits[0], accountCredits[1]);
      client.user.token = await client.api.login.authkey();
      await client.api.login.startUp();
      await client.api.login.startWithoutInvite();
      await client.buildUpUserToken();
      await client.api.user.userInfo();
      await client.tosCheckAndAgree();
      let result = (await client.api.handover.exec(code)).status_code;
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
    async tosCheckAndAgree() {
      let tosCheckResult = await this.api.tos.tosCheck();
      if (!tosCheckResult.response_data.is_agreed) {
        await this.api.tos.tosAgree(tosCheckResult.response_data.tos_id);
      }
    }
    /**
     * api basic
     */
    private async buildUpRequestOptWithCredital<TRequest>(module: string, api: string, nonce: string): Promise<Request.Options> {
      if ((!this.user.loginKey) && (!this.user.loginPasswd) && (!this.user.token)) {
        throw new Errors.ClientNotInitializedError();
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
        throw new Errors.ClientNotInitializedError();
      }
      let result = Client.buildUpRequestOpt(module, api, nonce, data, this.user.token, this.user.id ? { "User-ID": this.user.id } : {});
      return await result;
    }
    private async requestWithCredital<TResult>(module: string, api: string): Promise<HTTPInterfaces.ResponseBase<TResult>> {
      return await Client.request<HTTPInterfaces.ResponseBase<TResult>>(
        await this.buildUpRequestOptWithCredital(module, api, (this.nonce++).toString())
      );
    }
    async requestDetailed<TResult>(module: string, api: string, data?: any): Promise<HTTPInterfaces.ResponseBase<TResult>>;
    async requestDetailed<TResult, TRequestData>(module: string, api: string, data: TRequestData): Promise<HTTPInterfaces.ResponseBase<TResult>>;
    async requestDetailed(module: string, api: string, data: any) {
      let dataToSend = merge(<HTTPInterfaces.DetailedRequestBase>{
        module: module,
        action: api,
        timeStamp: utils.timestamp().toString(),
        commandNum: `${uuid.v4()}.${utils.timestamp()}.${this.nonce++}`
      }, data);
      return await Client.request(await this.buildUpRequestOptPlain(module, api, this.nonce.toString(), dataToSend));
    }
    async performMultipleRequest<TResult>(requests: { module: string, api: string, data?: any }[]): Promise<TResult> {
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
          let result = await this.requestWithCredital<HTTPInterfaces.Response.login.startUp>("login", "startUp");
          if (result["response_data"]["login_key"] !== this.user.loginKey ||
            result["response_data"]["login_passwd"] !== this.user.loginPasswd) {
            throw "Invaid api result: key or passwd mismatch";
          }
        },
        startWithoutInvite: async () => this.requestWithCredital<
          HTTPInterfaces.Response.login.startWithoutInvite>("login", "startWithoutInvite"),
        unitList: async () => this.requestDetailed<
          HTTPInterfaces.Response.login.unitList>("login", "unitList"),
        // set the center of initial team
        unitSelect: async (unitId: number) => this.requestDetailed<HTTPInterfaces.Response.login.unitSelect,
          HTTPInterfaces.RequestData.login.unitSelect>("login", "unitSelect", {
            unit_initial_set_id: unitId
          })
      },
      user: {
        userInfo: async () => this.requestDetailed<HTTPInterfaces.Response.user.userInfo>("user", "userInfo"),
        changeName: async (nickname: string) => this.requestDetailed<HTTPInterfaces.Response.user.changeName,
          HTTPInterfaces.RequestData.user.changeName>("user", "changeName", { name: nickname })
      },
      tos: {
        tosCheck: async () => this.requestDetailed<HTTPInterfaces.Response.tos.tosCheck>("tos", "tosCheck"),
        tosAgree: async (tosId: number) => this.requestDetailed<
          HTTPInterfaces.Response.tos.tosAgree>("tos", "tosAgree", { tos_id: tosId })
      },
      tutorial: {
        // set state to 1 to skip it
        progress: async (state: number) => this.requestDetailed<HTTPInterfaces.Response.tutorial.progress,
          HTTPInterfaces.RequestData.tutorial.progress>("tutorial", "progress", { tutorial_state: state }),
        skip: async () => this.requestDetailed<HTTPInterfaces.Response.tutorial.skip>("tutorial", "skip")
      },
      multi: {
        getStartUpInformation: async () => this.performMultipleRequest([ // TODO type annotation
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
        ]),
        unitAllAndDeck: async () => await this.performMultipleRequest<[
          HTTPInterfaces.MultiResponseEachBase<HTTPInterfaces.Response.unit.unitAll>,
          HTTPInterfaces.MultiResponseEachBase<HTTPInterfaces.Response.unit.deckInfo>
        ]>([
          { module: "unit", api: "unitAll" },
          { module: "unit", api: "deckInfo" }
        ])
      },
      unit: {
        merge: async (base: number, partners: number[]) => this.requestDetailed<
          HTTPInterfaces.Response.unit.merge,
          HTTPInterfaces.RequestData.unit.merge>("unit", "merge",
          { base_owning_unit_user_id: base, unit_owning_user_ids: partners }),
        rankUp: async (base: number, partners: number[]) => this.requestDetailed<
          HTTPInterfaces.Response.unit.rankUp,
          HTTPInterfaces.RequestData.unit.rankUp>("unit", "rankUp", {
            base_owning_unit_user_id: base,
            unit_owning_user_ids: partners
          })
      },
      lbonus: {
        execute: async () => this.requestDetailed<HTTPInterfaces.Response.lbonus.login>("lbonus", "execute")
      },
      personalnotice: {
        get: async () => this.requestDetailed<
          HTTPInterfaces.Response.personalnotice.get>("personalnotice", "get")
      },
      platformAccount: {
        isConnectedLlAccount: async () => this.requestDetailed<
          HTTPInterfaces.Response.platformAccount.isConnectedLlAccount>("platformAccount", "isConnectedLlAccount")
      },
      handover: {
        start: async () => this.requestDetailed<
          HTTPInterfaces.Response.handover.start>("handover", "start"),
        exec: async (code: string) => this.requestDetailed("handover", "exec", {
          handover: code
        }),
        renew: async () => this.requestDetailed<
          HTTPInterfaces.Response.handover.renew>("handover", "renew"),
      },
      live: {
        // get available accompany friends list
        partyList: async (songId: number) => this.requestDetailed<
          HTTPInterfaces.Response.live.partyList>("live", "partyList", {
            live_difficulty_id: songId
          }),
        deckList: async (accompanyFriendId: number) => this.requestDetailed<
          HTTPInterfaces.Response.live.deckList>("live", "deckList", {
            party_user_id: accompanyFriendId
          }),
        play: async (songId: number, accompanyFriendId: number, deckId: number) =>
          this.requestDetailed<HTTPInterfaces.Response.live.play>("live", "play", {
            live_difficulty_id: songId,
            party_user_id: accompanyFriendId,
            unit_deck_id: deckId
          }),
        reward: async (
          perfect: number, great: number, good: number, bad: number, miss: number,
          love: number, maxCombo: number, liveDifficultyID: number,
          smile: number, cute: number, cool: number,
          eventID: number, eventPoint: number) => {
          return await this.requestDetailed("live", "reward", {
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
    };
  };
};