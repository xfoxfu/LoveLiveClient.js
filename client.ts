/// <reference path="./ref.d.ts" />

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
      export interface topInfo {
        result: {
          friend_action_cnt: number;
          friend_greet_cnt: number;
          friend_variety_cnt: number;
          present_cnt: number;
          free_gacha_flag: boolean;
          server_datetime: string;
          server_timestamp: number;
          next_free_gacha_timestamp: number;
          notice_friend_datetime: string;
          notice_mail_datetime: string
        };
        status: number;
        commandNum: boolean;
        timeStamp: string;
      };
      export interface topInfoOnce {
        new_achievement_cnt: number;
        unaccomplished_achievement_cnt: number;
        handover_expire_status: number;
        live_daily_reward_exist: boolean;
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
      export interface liveStatus {
        normal_live_status_list: {
          live_difficulty_id: number;
          status: number;
          hi_score: number;
          hi_combo_count: number;
          clear_cnt: number;
          achieved_goal_id_list: number[]
        }[];
        special_live_status_list: {
          live_difficulty_id: number;
          status: number;
          hi_score: number;
          hi_combo_count: number;
          clear_cnt: number;
          achieved_goal_id_list: number[]
        }[];
        marathon_live_status_list: {
          live_difficulty_id: number;
          status: number;
          hi_score: number;
          hi_combo_count: number;
          clear_cnt: number;
          achieved_goal_id_list: number[]
        }[];
      };
      export interface schedule {
        event_list: {
          event_id: number;
          event_category_id: number;
          name: string;
          open_date: string;
          start_date: string;
          end_date: string;
          close_date: string;
          banner_asset_name: string;
          banner_se_asset_name: string;
          result_banner_asset_name: string;
          description: string;
        }[];
        live_list: {
          live_difficulty_id: number;
          start_date: string;
          end_date: string;
          is_random: boolean;
          dangerous: boolean;
          use_quad_point: boolean;
        }[];
        limited_bonus_list: any[]; // TODO
      };
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
    export namespace marathon {
      export interface marathonInfo extends Array<any> { }; // TODO
    };
    export namespace payment {
      export interface productList {
        product_list: {
          product_id: string;
          name: string;
          price: number;
          product_type: number;
          item_list: {
            item_id: number;
            add_type: number;
            amount: number;
            is_freebie: boolean;
          }[];
          limit_status?: {
            end_date: string;
            term_end_date: string;
            remaining_time: string;
            remaining_count: number;
          };
        }[];
      };
    }
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
};
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
  server: string;
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
  }
};
export let getClientClass = (headers: any, maxRetry?: number, server?: string,
  calculateHash?: ICalculateHashFunction,
  delay?: IDelayFunction) => {
  let config: IConfig = {
    calculateHash: calculateHash || ((data: string) => Promise.resolve(data)),
    delay: delay || predefinedFunctions.delay.fastest,
    maxRetry: maxRetry || 10,
    headers: headers,
    server: server || "http://prod-jp.lovelive.ge.klabgames.net/main.php/"
  };
  let Client = class Client {
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
    private nonce = 2;
    /**
     * client operations
     */
    constructor(key: string, passwd: string) {
      this.user.loginKey = key;
      this.user.loginPasswd = passwd;
    };
    startGame = async () => {
      await this.initialize();
      await this.api.user.userInfo();
      await this.api.personalnotice.get();
      await this.tosCheckAndAgree();
      await this.api.platformAccount.isConnectedLlAccount();
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
    // When Node.js adapts to v8 shipped with Chrome 49, use this line instead of the following 3 lines.
    // static async register(name = "Node-LLSIFClient", leader = 1): Promise<Client> {
    static register = async (name?: string, leader?: number) => {
      const defaultNames = `幻の学院生 明るい学院生 期待の学院生 純粋な学院生 素直な学院生 元気な学院生 天然な学院生 勇敢な学院生 気になる学院生 真面目な学院生 不思議な学院生 癒し系な学院生 心優しい学院生 さわやかな学院生 頼りになる学院生 さすらいの学院生 正義感あふれる学院生 カラオケ好きの学院生`.split(" ");
      if (!name) name = defaultNames[lib.randomInt(0, defaultNames.length - 1)];
      // When v8 supports destructing, use the feature
      let accountCredits = await Client.generateCreditalPair();
      let client = new Client(accountCredits[0], accountCredits[1]);
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
      await client.api.multi.unitAllAndDeck();
      let availableUnits: number[] = [];
      for (let unit of (await client.api.login.unitList()).unit_initial_set) {
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
    };
    static startFromTransferCode = async (code: string) => {
      // When v8 supports, use better code
      // When v8 supports destructing, use the feature
      let accountCredits = await Client.generateCreditalPair();
      let client = new Client(accountCredits[0], accountCredits[1]);
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
            commandNum: `${uuid.v4()}.${utils.timestamp()}.${this.nonce}`
          }, data));
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
          return (await this.callAPIPlain<HTTPInterfaces.Response.login.authkey>("login/authkey", "1")).authorize_token;
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
            throw "Invaid api result: key or passwd mismatch";
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
          { module: "live", action: "liveStatus" },
          { module: "live", action: "schedule" },
          { module: "marathon", action: "marathonInfo" },
          { module: "login", action: "topInfoOnce" },
          { module: "unit", action: "unitAll" },
          { module: "unit", action: "deckInfo" },
          { module: "payment", action: "productList" },
          { module: "scenario", action: "scenarioStatus" },
          { module: "subscenario", action: "subscenarioStatus" },
          { module: "user", action: "showAllItem" },
          { module: "battle", action: "battleInfo" },
          { module: "banner", action: "bannerList" },
          { module: "notice", action: "noticeMarquee" },
          { module: "festival", action: "festivalInfo" },
          { module: "eventscenario", action: "status" },
          { module: "navigation", action: "specialCutin" },
          { module: "album", action: "albumAll" },
          { module: "award", action: "awardInfo" },
          { module: "background", action: "backgroundInfo" },
          { module: "online", action: "info" },
          { module: "challenge", action: "challengeInfo" }),
        unitAllAndDeck: async () => await this.callMultipleAPI<[
          HTTPInterfaces.MultiResponseEachBase<HTTPInterfaces.Response.unit.unitAll>,
          HTTPInterfaces.MultiResponseEachBase<HTTPInterfaces.Response.unit.deckInfo>
        ]>({ module: "unit", action: "unitAll" },
          { module: "unit", action: "deckInfo" })
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
        execute: async () => this.callAPIDetailed<HTTPInterfaces.Response.lbonus.login>("lbonus", "execute")
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
    };
  };
  return Client;
};