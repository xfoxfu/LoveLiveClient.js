/// <reference path="./ref.d.ts" />
"use strict";

/**
 * ResponseBase<T>
 * version: 4.0
 */
export interface ResponseBase<T> {
  response_data: T;
  status_code: number;
  release_info: {
    id: number;
    key: string;
  }[];
};
/**
 * MultiResponseEachBase<T>
 * version: 4.0
 */
export interface MultiResponseEachBase<T> {
  result: T;
  status: number;
  commandNum: string;
  timeStamp: string;
  mgd?: number;
};
/**
 * SimpleRequestBase
 * version: 4.0
 */
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
  /*
   * for dates:
   * All dates are formatted like 2016-07-06 06:51:04.
   * TODO parse them
   */
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
      member_category_list: {
        member_category: number;
        unit_initial_set: {
          unit_initial_set_id: number;
          unit_list: number[];
          center_unit_id: number
        }[];
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
      energy_full_time: string;
      energy_full_need_time: number;
      over_max_energy: number;
      friend_max: number;
      invite_code: string;
      unlock_random_live_muse: number;
      unlock_random_live_aqours: number;
      insert_date: string;
      update_date: string;
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
      unit_skill_exp: number;
      max_hp: number;
      unit_removable_skill_capacity: number;
      favorite_flag: boolean;
      display_rank: number;
      is_rank_max: boolean;
      is_love_max: boolean;
      is_level_max: boolean;
      is_skill_level_max: boolean;
      is_removable_skill_capacity_max: boolean;
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
    export interface supporterAll extends Array<any> { }; // TODO
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
    export interface execute {
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
        end_date: string;
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
          unit_owning_user_id: number;
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
          unit_owning_user_id: number;
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
          unit_owning_user_id: number;
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
  };
  export namespace secretbox {
    /**
     * secretbox/all
     * version: 4.0
     */
    export interface all {
      use_cache: number;
      is_unit_max: boolean;
      item_list: {
        item_id: number;
        amount: number;
      }[];
      gauge_info: {
        max_gauge_point: number;
        gauge_point: number;
      };
      member_category_list: {
        member_category: number;
        tab_list: {
          secret_box_tab_id: number;
          title_img_asset: string;
          title_img_se_asset: string;
          page_list: {
            secret_box_page_id: number;
            page_layout: number;
            default_img_info: {
              banner_img_asset: string;
              banner_se_img_asset: string;
              img_asset: string;
              url: string;
            };
            limited_img_info: {
              banner_img_asset: string;
              banner_se_img_asset: string;
              img_asset: string;
              url: string;
              start_date: string;
              end_date: string;
            }[];
            effect_list: {
              unit_id: number;
              normal_unit_img_asset: string;
              rankup_unit_img_asset: string;
              type: number;
              start_date: string;
              end_date: string;
            }[];
            secret_box_list: {
              secret_box_id: number;
              name: string;
              title_asset: string;
              description: string;
              start_date: string;
              end_date: string;
              add_gauge: number;
              multi_type: number;
              multi_count: number;
              is_pay_cost: boolean;
              is_pay_multi_cost: boolean;
              within_single_limit: number;
              within_multi_limit: number;
              cost: {
                priority: number;
                type: number;
                item_id?: number;
                amount: number;
                multi_amount: number;
              };
              pon_count: number;
              pon_upper_limit: number;
              display_type: number;
            }[];
          }[];
        }[];
      }[];
    };
    /**
     * secretbox/pon
     * version: 4.0
     */
    export interface pon {
      is_unit_max: boolean;
      item_list: {
        item_id: number;
        amount: number;
      }[];
      gauge_info: {
        max_gauge_point: number;
        gauge_point: number;
        added_gauge_point: number;
      };
      secret_box_page_id: number;
      secret_box_info: {
        secret_box_id: number;
        name: string;
        title_asset?: string;
        description: string;
        start_date: string;
        end_date: string;
        add_gauge: number;
        multi_type: number;
        multi_count: number;
        is_pay_cost: boolean;
        is_pay_multi_cost: boolean;
        within_single_limit: number;
        within_multi_limit: number;
        cost: {
          priority: number;
          type: number;
          item_id?: any; // TODO
          amount: number;
        };
        next_cost: {
          priority: number;
          type: number;
          item_id?: any; // TODO
          amount: number;
          multi_amount: number;
        };
        pon_count: number;
        pon_upper_limit: number;
        display_type: number;
      };
      secret_box_items: {
        unit: {
          unit_rarity_id: number;
          add_type: number;
          amount: number;
          item_category_id: number;
          unit_id: number;
          unit_owning_user_id: number;
          is_support_member: boolean;
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
          unit_skill_exp: number;
          display_rank: number;
          unit_removable_skill_capacity: number;
        }[];
        item: {
          owning_item_id: number;
          item_id: number;
          add_type: number;
          amount: number;
          item_category_id: number;
          reward_box_flag: boolean;
        }[];
      };
      before_user_info: {
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
        friend_max: number;
        tutorial_state: number;
      };
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
        friend_max: number;
        tutorial_state: number;
      };
      next_free_muse_gacha_timestamp: number;
      next_free_aqours_gacha_timestamp: number;
    };
    /**
     * secretbox/multi
     * version: 4.0
     */
    export interface multi {
      is_unit_max: boolean;
      item_list: {
        item_id: number;
        amount: number;
      }[];
      gauge_info: {
        max_gauge_point: number;
        gauge_point: number;
        added_gauge_point: number;
      };
      secret_box_info: {
        secret_box_id: number;
        name: string;
        title_asset?: string;
        description: string;
        start_date: string;
        end_date: string;
        add_gauge: number;
        multi_type: number;
        multi_count: number;
        is_pay_cost: boolean;
        is_pay_multi_cost: boolean;
        within_single_limit: number;
        within_multi_limit: number;
        cost: {
          priority: number;
          type: number;
          item_id?: any; // TODO
          amount: number;
          multi_amount: number;
        };
        pon_count: number;
        pon_upper_limit: number;
        display_type: number;
      };
      secret_box_page_id: number;
      secret_box_id: number;
      secret_box_items: {
        unit: {
          unit_rarity_id: number;
          add_type: number;
          amount: number;
          item_category_id: number;
          unit_id: number;
          unit_owning_user_id: number;
          is_support_member: boolean;
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
          unit_skill_exp: number;
          display_rank: number;
          unit_removable_skill_capacity: number;
        }[];
        item: {
          owning_item_id: number;
          item_id: number;
          add_type: number;
          amount: number;
          item_category_id: number;
          reward_box_flag: boolean;
        }[];
      };
      before_user_info: {
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
        friend_max: number;
        tutorial_state: number;
      };
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
        friend_max: number;
        tutorial_state: number;
      };
      next_free_muse_gacha_timestamp: number;
      next_free_aqours_gacha_timestamp: number;
    };
  };
  export namespace reward {
    export interface rewardList {
      item_count: number;
      limit: number;
      order: number;
      items: {
        incentive_id: number;
        incentive_item_id: number;
        add_type: number;
        amount: number;
        rank_max_flag: boolean;
        item_category_id: number;
        incentive_type: number;
        incentive_message: string;
        insert_date: string;
        remaining_time: string;
        item_option?: any;
        level?: number;
      }[];
    };
    export interface open {
      opened_num: number;
      success: {
        incentive_id: number;
        item_id: number;
        add_type: number;
        amount: number;
        item_category_id: number;
        reward_box_flag: boolean;
      }[];
      fail: any[]; // TODO
      bushimo_reward_info: any[]; // TODO
    };
    export interface openAll {
      reward_num: number;
      opened_num: number;
      total_num: number;
      order: number;
      upper_limit: boolean;
      reward_item_list: {
        incentive_id: number;
        item_id: number;
        add_type: number;
        amount: number;
        item_category_id: number;
        reward_box_flag: boolean;
        unit_id?: number;
        unit_owning_user_id?: number;
        is_support_member?: boolean;
        exp?: number;
        next_exp?: number;
        max_hp?: number;
        level?: number;
        skill_level?: number;
        rank?: number;
        love?: number;
        is_rank_max?: boolean;
        is_level_max?: boolean;
        is_love_max?: boolean;
        new_unit_flag?: boolean;
        unit_skill_exp?: number;
        display_rank?: number;
        unit_removable_skill_capacity?: number;
      }[];
      bushimo_reward_info: any[]; // TODO
      unit_support_list: {
        unit_id: number;
        amount: number;
      }[];
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
  export namespace secretbox {
    export interface pon {
      secret_box_id: number;
      cost_priority: number;
    };
    export interface multi {
      secret_box_id: number;
      cost_priority: number;
      cost: number; // for 11-gems, this is 11.
    };
  };
  export namespace reward {
    export interface rewardList {
      order: number;
      filter: number[]; // TODO
      category: number;
    };
    export interface open {
      incentive_id:number;
    };
    export interface openAll {
      order: number;
      filter: number[]; // TODO
      category: number;
    };
  };
};
  /* tslint:enable */