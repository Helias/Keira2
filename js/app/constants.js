/*jslint browser: true, eqeq: true, white: true, plusplus: true */
/*global angular, console, alert*/

(function () {
  'use strict';

  var app = angular.module('keira2');

  /* Constants mostly taken from https://github.com/Discover-/SAI-Editor/blob/master/SAI-Editor/Enumerators/PublicEnums.cs */

  /* Init arrays */
  app.constants = [];
  app.saiConstants = [];
  app.modalConstants = [];


  /* UNIT_FLAG constants */
  app.constants.unitFlag = {
    NONE              : 0x00000000,
    SERVER_CONTROLLED : 0x00000001,
    NON_ATTACKABLE    : 0x00000002,
    DISABLE_MOVE      : 0x00000004,
    PVP_ATTACKABLE    : 0x00000008,
    RENAME            : 0x00000010,
    PREPARATION       : 0x00000020,
    UNK_6             : 0x00000040,
    NOT_ATTACKABLE_1  : 0x00000080,
    IMMUNE_TO_PC      : 0x00000100,
    IMMUNE_TO_NPC     : 0x00000200,
    LOOTING           : 0x00000400,
    PET_IN_COMBAT     : 0x00000800,
    PVP               : 0x00001000,
    SILENCED          : 0x00002000,
    UNK_14            : 0x00004000,
    UNK_15            : 0x00008000,
    UNK_16            : 0x00010000,
    PACIFIED          : 0x00020000,
    STUNNED           : 0x00040000,
    IN_COMBAT         : 0x00080000,
    TAXI_FLIGHT       : 0x00100000,
    DISARMED          : 0x00200000,
    CONFUSED          : 0x00400000,
    FLEEING           : 0x00800000,
    PLAYER_CONTROLLED : 0x01000000,
    NOT_SELECTABLE    : 0x02000000,
    SKINNABLE         : 0x04000000,
    MOUNT             : 0x08000000,
    UNK_28            : 0x10000000,
    UNK_29            : 0x20000000,
    SHEATHE           : 0x40000000
  };

  /* NPC_FLAG constants */
  app.constants.npcFlag = {
    NONE               : 0x00000000,
    GOSSIP             : 0x00000001,
    QUESTGIVER         : 0x00000002,
    UNK1               : 0x00000004,
    UNK2               : 0x00000008,
    TRAINER            : 0x00000010,
    TRAINER_CLASS      : 0x00000020,
    TRAINER_PROFESSION : 0x00000040,
    VENDOR             : 0x00000080,
    VENDOR_AMMO        : 0x00000100,
    VENDOR_FOOD        : 0x00000200,
    VENDOR_POISON      : 0x00000400,
    VENDOR_REAGENT     : 0x00000800,
    REPAIR             : 0x00001000,
    FLIGHTMASTER       : 0x00002000,
    SPIRITHEALER       : 0x00004000,
    SPIRITGUIDE        : 0x00008000,
    INNKEEPER          : 0x00010000,
    BANKER             : 0x00020000,
    PETITIONER         : 0x00040000,
    TABARDDESIGNER     : 0x00080000,
    BATTLEMASTER       : 0x00100000,
    AUCTIONEER         : 0x00200000,
    STABLEMASTER       : 0x00400000,
    GUILD_BANKER       : 0x00800000,
    SPELLCLICK         : 0x01000000,
    PLAYER_VEHICLE     : 0x02000000
  };

  /* GameObject Flags */
  app.constants.goFlag = {
    NONE           : 0x00000000,
    IN_USE         : 0x00000001,
    LOCKED         : 0x00000002,
    INTERACT_COND  : 0x00000004,
    TRANSPORT      : 0x00000008,
    NOT_SELECTABLE : 0x00000010,
    NODESPAWN      : 0x00000020,
    TRIGGERED      : 0x00000040,
    DAMAGED        : 0x00000200,
    DESTROYED      : 0x00000400
  };

  /* Dynamic Flags */
  app.constants.dynamicFlag = {
    NONE                      : 0x0000,
    LOOTABLE                  : 0x0001,
    TRACK_UNIT                : 0x0002,
    TAPPED                    : 0x0004,
    TAPPED_BY_PLAYER          : 0x0008,
    SPECIALINFO               : 0x0010,
    DEAD                      : 0x0020,
    REFER_A_FRIEND            : 0x0040,
    TAPPED_BY_ALL_THREAT_LIST : 0x0080
  };

  /* Unit Field Bytes1 Types */
  app.constants.unitFieldBytes1Type = {
    STAND_STAND_STATE_TYPE : 0,
    PET_TALENTS_TYPE       : 1,
    STAND_FLAGS_TYPE       : 2,
    BYTES1_FLAGS_TYPE      : 3
  };

  /* Unit Stand State Types */
  app.constants.unitStandStateType = {
    STAND            : 0,
    SIT              : 1,
    SIT_CHAIR        : 2,
    SLEEP            : 3,
    SIT_LOW_CHAIR    : 4,
    SIT_MEDIUM_CHAIR : 5,
    SIT_HIGH_CHAIR   : 6,
    DEAD             : 7,
    KNEEL            : 8,
    SUBMERGED        : 9
  };

  /* Unit Stand Flags */
  app.constants.unitStandFlags = {
    NONE        : 0x00,
    UNK1        : 0x01,
    CREEP       : 0x02,
    UNTRACKABLE : 0x04,
    UNK4        : 0x08,
    UNK5        : 0x10,
    ALL         : 0xFF
  };

  /* Unit Bytes1 Flags */
  app.constants.unitBytes1Flags = {
    UNIT_BYTE1_FLAG_ALWAYS_STAND : 0x01,
    UNIT_BYTE1_FLAG_HOVER        : 0x02,
    UNIT_BYTE1_FLAG_UNK_3        : 0x04,
    UNIT_BYTE1_FLAG_ALL          : 0xFF
  };

  /*  SAI event constants */
  app.saiConstants.event = {
    UPDATE_IC : 0,
    UPDATE_OOC : 1,
    HEALT_PCT : 2,
    MANA_PCT : 3,
    AGGRO : 4,
    KILL : 5,
    DEATH : 6,
    EVADE : 7,
    SPELLHIT : 8,
    RANGE : 9,
    OOC_LOS : 10,
    RESPAWN : 11,
    TARGET_HEALTH_PCT : 12,
    VICTIM_CASTING : 13,
    FRIENDLY_HEALTH : 14,
    FRIENDLY_IS_CC : 15,
    FRIENDLY_MISSING_BUFF : 16,
    SUMMONED_UNIT : 17,
    TARGET_MANA_PCT : 18,
    ACCEPTED_QUEST : 19,
    REWARD_QUEST : 20,
    REACHED_HOME : 21,
    RECEIVE_EMOTE : 22,
    HAS_AURA : 23,
    TARGET_BUFFED : 24,
    RESET : 25,
    IC_LOS : 26,
    PASSENGER_BOARDED : 27,
    PASSENGER_REMOVED : 28,
    CHARMED : 29,
    CHARMED_TARGET : 30,
    SPELLHIT_TARGET : 31,
    DAMAGED : 32,
    DAMAGED_TARGET : 33,
    MOVEMENTINFORM : 34,
    SUMMON_DESPAWNED : 35,
    CORPSE_REMOVED : 36,
    AI_INIT : 37,
    DATA_SET : 38,
    WAYPOINT_START : 39,
    WAYPOINT_REACHED : 40,
    TRANSPORT_ADDPLAYER_NYI : 41,
    TRANSPORT_ADDCREATURE_NYI : 42,
    TRANSPORT_REMOVE_PLAYER_NYI : 43,
    TRANSPORT_RELOCATE_NYI : 44,
    INSTANCE_PLAYER_ENTER_NYI : 45,
    AREATRIGGER_ONTRIGGER : 46,
    QUEST_ACCEPTED_NYI : 47,
    QUEST_OBJ_COPLETETION_NYI : 48,
    QUEST_COMPLETION_NYI : 49,
    QUEST_REWARDED_NYI : 50,
    QUEST_FAIL_NYI : 51,
    TEXT_OVER : 52,
    RECEIVE_HEAL : 53,
    JUST_SUMMONED : 54,
    WAYPOINT_PAUSED : 55,
    WAYPOINT_RESUMED : 56,
    WAYPOINT_STOPPED : 57,
    WAYPOINT_ENDED : 58,
    TIMED_EVENT_TRIGGERED : 59,
    UPDATE : 60,
    LINK : 61,
    GOSSIP_SELECT : 62,
    JUST_CREATED : 63,
    GOSSIP_HELLO : 64,
    FOLLOW_COMPLETED : 65,
    DUMMY_EFFECT_NYI : 66,
    IS_BEHIND_TARGET : 67,
    GAME_EVENT_START : 68,
    GAME_EVENT_END : 69,
    GO_STATE_CHANGED : 70,
    GO_EVENT_INFORM : 71,
    ACTION_DONE : 72,
    ON_SPELLCLICK : 73,
    FRIENDLY_HEALTH_PCT : 74,
    DISTANCE_CREATURE : 75,
    DISTANCE_GAMEOBJECT : 76,
    MAX : 77
  };

  /* SAI action constants */
  app.saiConstants.action = {
    NONE : 0,
    TALK : 1,
    SET_FACTION : 2,
    MORPH_TO_ENTRY_OR_MODEL : 3,
    SOUND : 4,
    EMOTE : 5,
    FAIL_QUEST : 6,
    ADD_QUEST : 7,
    SET_REACT_STATE : 8,
    ACTIVATE_GOBJECT : 9,
    RANDOM_EMOTE : 10,
    CAST : 11,
    SUMMON_CREATURE : 12,
    THREAT_SINGLE_PCT : 13,
    THREAT_ALL_PCT : 14,
    CALL_AREAEXPLOREDOREVENTHAPPENS : 15,
    UNUSED_16 : 16,
    SET_EMOTE_STATE : 17,
    SET_UNIT_FLAG : 18,
    REMOVE_UNIT_FLAG : 19,
    AUTO_ATTACK : 20,
    COMBAT_MOVEMENT : 21,
    SET_EVENT_PHASE : 22,
    INC_EVENT_PHASE : 23,
    EVADE : 24,
    FLEE_FOR_ASSIST : 25,
    CALL_GROUPEVENTHAPPENS : 26,
    CALL_CASTEDCREATUREORGO : 27,
    REMOVEAURASFROMSPELL : 28,
    FOLLOW : 29,
    RANDOM_PHASE : 30,
    RANDOM_PHASE_RANGE : 31,
    RESET_GOBJECT : 32,
    KILLED_MONSTER : 33,
    SET_INST_DATA : 34,
    SET_INST_DATA64 : 35,
    UPDATE_TEMPLATE : 36,
    DIE : 37,
    SET_IN_COMBAT_WITH_ZONE : 38,
    CALL_FOR_HELP : 39,
    SET_SHEATH : 40,
    FORCE_DESPAWN : 41,
    SET_INVINCIBILITY_HP_LEVEL : 42,
    MOUNT_TO_ENTRY_OR_MODEL : 43,
    SET_PHASE_MASK : 44,
    SET_DATA : 45,
    MOVE_FORWARD : 46,
    SET_VISIBILITY : 47,
    SET_ACTIVE : 48,
    ATTACK_START : 49,
    SUMMON_GO : 50,
    KILL_UNIT : 51,
    ACTIVATE_TAXI : 52,
    WP_START : 53,
    WP_PAUSE : 54,
    WP_STOP : 55,
    ADD_ITEM : 56,
    REMOVE_ITEM : 57,
    INSTALL_AI_TEMPLATE : 58,
    SET_RUN : 59,
    SET_FLY : 60,
    SET_SWIM : 61,
    TELEPORT : 62,
    UNUSED_63 : 63,
    STORE_TARGET_LIST : 64,
    WP_RESUME : 65,
    SET_ORIENTATION : 66,
    CREATE_TIMED_EVENT : 67,
    PLAYMOVIE : 68,
    MOVE_TO_POS : 69,
    RESPAWN_TARGET : 70,
    EQUIP : 71,
    CLOSE_GOSSIP : 72,
    TRIGGER_TIMED_EVENT : 73,
    REMOVE_TIMED_EVENT : 74,
    ADD_AURA : 75,
    OVERRIDE_SCRIPT_BASE_OBJECT : 76,
    RESET_SCRIPT_BASE_OBJECT : 77,
    CALL_SCRIPT_RESET : 78,
    SET_RANGED_MOVEMENT : 79,
    CALL_TIMED_ACTIONLIST : 80,
    SET_NPC_FLAG : 81,
    ADD_NPC_FLAG : 82,
    REMOVE_NPC_FLAG : 83,
    SIMPLE_TALK : 84,
    INVOKER_CAST : 85,
    CROSS_CAST : 86,
    CALL_RANDOM_TIMED_ACTIONLIST : 87,
    CALL_RANDOM_RANGE_TIMED_ACTIONLIST : 88,
    RANDOM_MOVE : 89,
    SET_UNIT_FIELD_BYTES_1 : 90,
    REMOVE_UNIT_FIELD_BYTES_1 : 91,
    INTERRUPT_SPELL : 92,
    SEND_GO_CUSTOM_ANIM : 93,
    SET_DYNAMIC_FLAG : 94,
    ADD_DYNAMIC_FLAG : 95,
    REMOVE_DYNAMIC_FLAG : 96,
    JUMP_TO_POS : 97,
    SEND_GOSSIP_MENU : 98,
    GO_SET_LOOT_STATE : 99,
    SEND_TARGET_TO_TARGET : 100,
    SET_HOME_POS : 101,
    SET_HEALTH_REGEN : 102,
    SET_ROOT : 103,
    SET_GO_FLAG : 104,
    ADD_GO_FLAG : 105,
    REMOVE_GO_FLAG : 106,
    SUMMON_CREATURE_GROUP : 107,
    SET_POWER : 108,
    ADD_POWER : 109,
    REMOVE_POWER : 110,
    GAME_EVENT_STOP : 111,
    GAME_EVENT_START : 112,
    START_CLOSEST_WAYPOINT : 113,
    MAX : 114
  };

  /* SAI target constants */
  app.saiConstants.target = {
    NONE : 0,
    SELF : 1,
    VICTIM : 2,
    HOSTILE_SECOND_AGGRO : 3,
    HOSTILE_LAST_AGGRO : 4,
    HOSTILE_RANDOM : 5,
    HOSTILE_RANDOM_NOT_TOP : 6,
    ACTION_INVOKER : 7,
    POSITION : 8,
    CREATURE_RANGE : 9,
    CREATURE_GUID : 10,
    CREATURE_DISTANCE : 11,
    STORED : 12,
    GAMEOBJECT_RANGE : 13,
    GAMEOBJECT_GUID : 14,
    GAMEOBJECT_DISTANCE : 15,
    INVOKER_PARTY : 16,
    PLAYER_RANGE : 17,
    PLAYER_DISTANCE : 18,
    CLOSEST_CREATURE : 19,
    CLOSEST_GAMEOBJECT : 20,
    CLOSEST_PLAYER : 21,
    ACTION_INVOKER_VEHICLE : 22,
    OWNER_OR_SUMMONER : 23,
    THREAT_LIST : 24,
    CLOSEST_ENEMY : 25,
    CLOSEST_FRIENDLY : 26,
    MAX : 27
  };

  /* SAI template constants */
  app.saiConstants.templates = {
    BASIC           : 0,
    CASTER          : 1,
    TURRET          : 2,
    PASSIVE         : 3,
    CAGED_GO_PART   : 4,
    CAGED_NPC_PART  : 5
  };

  /* SAI phase masks */
  app.saiConstants.phaseMask = {
    ALWAYS : 0x000,
    1      : 0x001,
    2      : 0x002,
    3      : 0x004,
    4      : 0x008,
    5      : 0x010,
    6      : 0x020,
    7      : 0x040,
    8      : 0x080,
    9      : 0x100
  };

  /* SAI event flags */
  app.saiConstants.eventFlags = {
    NONE           : 0x00,
    NOT_REPEATABLE : 0x01,
    NORMAL_DUNGEON : 0x02,
    HEROIC_DUNGEON : 0x04,
    NORMAL_RAID    : 0x08,
    HEROIC_RAID    : 0x10,
    DEBUG_ONLY     : 0x80
  };

  /* creature family constants */
  app.modalConstants.family = [];
  app.modalConstants.family[1] = "Wolf";
  app.modalConstants.family[2] = "Cat";
  app.modalConstants.family[3] = "Spider";
  app.modalConstants.family[4] = "Bear";
  app.modalConstants.family[5] = "Boar";
  app.modalConstants.family[6] = "Crocolisk";
  app.modalConstants.family[7] = "Carrion Bird";
  app.modalConstants.family[8] = "Crab";
  app.modalConstants.family[9] = "Gorilla";
  app.modalConstants.family[11] = "Raptor";
  app.modalConstants.family[12] = "Tallstrider";
  app.modalConstants.family[15] = "Felhunter";
  app.modalConstants.family[16] = "Voidwalker";
  app.modalConstants.family[17] = "Succubus";
  app.modalConstants.family[19] = "Doomguard";
  app.modalConstants.family[20] = "Scorpid";
  app.modalConstants.family[21] = "Turtle";
  app.modalConstants.family[23] = "Imp";
  app.modalConstants.family[24] = "Bat";
  app.modalConstants.family[25] = "Hyena";
  app.modalConstants.family[26] = "Bird of Prey";
  app.modalConstants.family[27] = "Wind Serpent";
  app.modalConstants.family[28] = "Remote Control";
  app.modalConstants.family[29] = "Felguard";
  app.modalConstants.family[30] = "Dragonhawk";
  app.modalConstants.family[31] = "Ravager";
  app.modalConstants.family[32] = "Warp Stalker";
  app.modalConstants.family[33] = "Sporebat";
  app.modalConstants.family[34] = "Nether Ray";
  app.modalConstants.family[35] = "Serpent";
  app.modalConstants.family[37] = "Moth";
  app.modalConstants.family[38] = "Chimaera";
  app.modalConstants.family[39] = "Devilsaur";
  app.modalConstants.family[40] = "Ghoul";
  app.modalConstants.family[41] = "Silithid";
  app.modalConstants.family[42] = "Worm";
  app.modalConstants.family[43] = "Rhino";
  app.modalConstants.family[44] = "Wasp";
  app.modalConstants.family[45] = "Core Hound";
  app.modalConstants.family[46] = "Spirit Beast";

  /* faction constants */
  app.modalConstants.faction =[];
  app.modalConstants.faction[1] = "PLAYER, Human";
  app.modalConstants.faction[2] = "PLAYER, Orc";
  app.modalConstants.faction[3] = "PLAYER, Dwarf";
  app.modalConstants.faction[4] = "PLAYER, Night Elf";
  app.modalConstants.faction[5] = "PLAYER, Undead";
  app.modalConstants.faction[6] = "PLAYER, Tauren ";
  app.modalConstants.faction[7] = "Creature";
  app.modalConstants.faction[10] = "Escortee";
  app.modalConstants.faction[11] = "Stormwind ";
  app.modalConstants.faction[12] = "Stormwind";
  app.modalConstants.faction[14] = "Monster";
  app.modalConstants.faction[15] = "Creature";
  app.modalConstants.faction[16] = "Monster";
  app.modalConstants.faction[17] = "Defias Brotherhood";
  app.modalConstants.faction[18] = "Murloc";
  app.modalConstants.faction[19] = "Gnoll - Redridge";
  app.modalConstants.faction[20] = "Gnoll - Riverpaw";
  app.modalConstants.faction[21] = "Undead, Scourge";
  app.modalConstants.faction[22] = "Beast - Spider";
  app.modalConstants.faction[23] = "Gnomeregan Exiles";
  app.modalConstants.faction[24] = "Worgen";
  app.modalConstants.faction[25] = "Kobold";
  app.modalConstants.faction[26] = "Kobold";
  app.modalConstants.faction[27] = "Defias Brotherhood";
  app.modalConstants.faction[28] = "Troll, Bloodscalp";
  app.modalConstants.faction[29] = "Orgrimmar";
  app.modalConstants.faction[30] = "Troll, Skullsplitter";
  app.modalConstants.faction[31] = "Prey";
  app.modalConstants.faction[32] = "Beast - Wolf";
  app.modalConstants.faction[33] = "Escortee";
  app.modalConstants.faction[34] = "Defias Brotherhood";
  app.modalConstants.faction[35] = "Friendly";
  app.modalConstants.faction[36] = "Trogg";
  app.modalConstants.faction[37] = "Troll, Frostmane";
  app.modalConstants.faction[38] = "Beast - Wolf";
  app.modalConstants.faction[39] = "Gnoll-Shadowhide";
  app.modalConstants.faction[40] = "Orc,Blackrock";
  app.modalConstants.faction[41] = "Villian";
  app.modalConstants.faction[42] = "Victim";
  app.modalConstants.faction[43] = "Villian";
  app.modalConstants.faction[44] = "Beast-Bear";
  app.modalConstants.faction[45] = "Ogre";
  app.modalConstants.faction[46] = "Kurzen's Mercenaries";
  app.modalConstants.faction[47] = "Venture Company";
  app.modalConstants.faction[48] = "Beast-Raptor";
  app.modalConstants.faction[49] = "Basilisk";
  app.modalConstants.faction[50] = "Dragonflight,Green";
  app.modalConstants.faction[51] = "Lost Ones";
  app.modalConstants.faction[52] = "Gizlock's Dummy";
  app.modalConstants.faction[53] = "Human,Night Watch";
  app.modalConstants.faction[54] = "Dark Iron Dwarves";
  app.modalConstants.faction[55] = "Ironforge";
  app.modalConstants.faction[56] = "Human,Night Watch";
  app.modalConstants.faction[57] = "Ironforge";
  app.modalConstants.faction[58] = "Creature";
  app.modalConstants.faction[59] = "Trogg";
  app.modalConstants.faction[60] = "Dragonflight,Red";
  app.modalConstants.faction[61] = "Gnoll-Mosshide";
  app.modalConstants.faction[62] = "Orc,Dragonmaw";
  app.modalConstants.faction[63] = "Gnome-Leper";
  app.modalConstants.faction[64] = "Gnomeregan Exiles";
  app.modalConstants.faction[65] = "Orgrimmar";
  app.modalConstants.faction[66] = "Leopard";
  app.modalConstants.faction[67] = "Scarlet Crusade";
  app.modalConstants.faction[68] = "Undercity";
  app.modalConstants.faction[69] = "Ratchet";
  app.modalConstants.faction[70] = "Gnoll-Rothide";
  app.modalConstants.faction[71] = "Undercity";
  app.modalConstants.faction[72] = "Beast-Gorilla";
  app.modalConstants.faction[73] = "Beast-Carrion Bird";
  app.modalConstants.faction[74] = "Naga";
  app.modalConstants.faction[76] = "Dalaran";
  app.modalConstants.faction[77] = "Forlorn Spirit";
  app.modalConstants.faction[78] = "Darkhowl";
  app.modalConstants.faction[79] = "Darnassus";
  app.modalConstants.faction[80] = "Darnassus";
  app.modalConstants.faction[81] = "Grell";
  app.modalConstants.faction[82] = "Furbolg";
  app.modalConstants.faction[83] = "Horde Generic";
  app.modalConstants.faction[84] = "Alliance Generic";
  app.modalConstants.faction[85] = "Orgrimmar";
  app.modalConstants.faction[86] = "Gizlock's Charm";
  app.modalConstants.faction[87] = "Syndicate";
  app.modalConstants.faction[88] = "Hillsbrad Militia";
  app.modalConstants.faction[89] = "Scarlet Crusade";
  app.modalConstants.faction[90] = "Demon";
  app.modalConstants.faction[91] = "Elemental";
  app.modalConstants.faction[92] = "Spirit";
  app.modalConstants.faction[93] = "Monster";
  app.modalConstants.faction[94] = "Treasure";
  app.modalConstants.faction[95] = "Gnoll-Mudsnout";
  app.modalConstants.faction[96] = "HIllsbrad,Southshore Mayor";
  app.modalConstants.faction[97] = "Syndicate";
  app.modalConstants.faction[98] = "Undercity";
  app.modalConstants.faction[99] = "Victim";
  app.modalConstants.faction[100] = "Treasure";
  app.modalConstants.faction[101] = "Treasure";
  app.modalConstants.faction[102] = "Treasure";
  app.modalConstants.faction[103] = "Dragonflight,Black";
  app.modalConstants.faction[104] = "Thunder Bluff";
  app.modalConstants.faction[105] = "Thunder Bluff";
  app.modalConstants.faction[106] = "Horde Generic";
  app.modalConstants.faction[107] = "Troll,Frostmane";
  app.modalConstants.faction[108] = "Syndicate";
  app.modalConstants.faction[109] = "Quilboar,Razormane 2";
  app.modalConstants.faction[110] = "Quilboar,Razormane 2";
  app.modalConstants.faction[111] = "Quilboar,Bristleback";
  app.modalConstants.faction[112] = "Quilboar,Bristleback";
  app.modalConstants.faction[113] = "Escortee";
  app.modalConstants.faction[114] = "Treasure";
  app.modalConstants.faction[115] = "PLAYER,Gnome";
  app.modalConstants.faction[116] = "PLAYER,Troll";
  app.modalConstants.faction[118] = "Undercity";
  app.modalConstants.faction[119] = "Bloodsail Buccaneers";
  app.modalConstants.faction[120] = "Booty Bay";
  app.modalConstants.faction[121] = "Booty Bay";
  app.modalConstants.faction[122] = "Ironforge";
  app.modalConstants.faction[123] = "Stormwind";
  app.modalConstants.faction[124] = "Darnassus";
  app.modalConstants.faction[125] = "Orgrimmar";
  app.modalConstants.faction[126] = "Darkspear Trolls";
  app.modalConstants.faction[127] = "Villian";
  app.modalConstants.faction[128] = "Blackfathom";
  app.modalConstants.faction[129] = "Makrura";
  app.modalConstants.faction[130] = "Centaur,Kolkar";
  app.modalConstants.faction[131] = "Centaur,Galak";
  app.modalConstants.faction[132] = "Gelkis Clan Centaur";
  app.modalConstants.faction[133] = "Magram Clan Centaur";
  app.modalConstants.faction[134] = "Maraudine";
  app.modalConstants.faction[148] = "Monster";
  app.modalConstants.faction[149] = "Theramore";
  app.modalConstants.faction[150] = "Theramore";
  app.modalConstants.faction[151] = "Theramore";
  app.modalConstants.faction[152] = "Quilboar,Razorfen";
  app.modalConstants.faction[153] = "Quilboar,Razorfen";
  app.modalConstants.faction[154] = "Quilboar,Deathshead";
  app.modalConstants.faction[168] = "Enemy";
  app.modalConstants.faction[188] = "Ambient";
  app.modalConstants.faction[189] = "Creature";
  app.modalConstants.faction[190] = "Ambient";
  app.modalConstants.faction[208] = "Nethergarde Caravan";
  app.modalConstants.faction[209] = "Nethergarde Caravan";
  app.modalConstants.faction[210] = "Alliance Generic";
  app.modalConstants.faction[230] = "Southsea Freebooters";
  app.modalConstants.faction[231] = "Escortee";
  app.modalConstants.faction[232] = "Escortee";
  app.modalConstants.faction[233] = "Undead,Scourge";
  app.modalConstants.faction[250] = "Escortee";
  app.modalConstants.faction[270] = "Wailing Caverns";
  app.modalConstants.faction[290] = "Escortee";
  app.modalConstants.faction[310] = "Silithid";
  app.modalConstants.faction[311] = "Silithid";
  app.modalConstants.faction[312] = "Beast-Spider";
  app.modalConstants.faction[330] = "Wailing Caverns";
  app.modalConstants.faction[350] = "Blackfathom";
  app.modalConstants.faction[370] = "Armies of C'Thun";
  app.modalConstants.faction[371] = "Silvermoon Remnant";
  app.modalConstants.faction[390] = "Booty Bay";
  app.modalConstants.faction[410] = "Basilisk";
  app.modalConstants.faction[411] = "Beast-Bat";
  app.modalConstants.faction[412] = "The Defilers";
  app.modalConstants.faction[413] = "Scorpid";
  app.modalConstants.faction[414] = "Timbermaw Hold";
  app.modalConstants.faction[415] = "Titan";
  app.modalConstants.faction[416] = "Titan";
  app.modalConstants.faction[430] = "Taskmaster Fizzule";
  app.modalConstants.faction[450] = "Wailing Caverns";
  app.modalConstants.faction[470] = "Titan";
  app.modalConstants.faction[471] = "Ravenholdt";
  app.modalConstants.faction[472] = "Syndicate";
  app.modalConstants.faction[473] = "Ravenholdt";
  app.modalConstants.faction[474] = "Gadgetzan";
  app.modalConstants.faction[475] = "Gadgetzan";
  app.modalConstants.faction[494] = "Gnomeregan Bug";
  app.modalConstants.faction[495] = "Escortee";
  app.modalConstants.faction[514] = "Harpy";
  app.modalConstants.faction[534] = "Alliance Generic";
  app.modalConstants.faction[554] = "Burning Blade";
  app.modalConstants.faction[574] = "Shadowsilk Poacher";
  app.modalConstants.faction[575] = "Searing Spider";
  app.modalConstants.faction[594] = "Trogg";
  app.modalConstants.faction[614] = "Victim";
  app.modalConstants.faction[634] = "Monster";
  app.modalConstants.faction[635] = "Cenarion Circle";
  app.modalConstants.faction[636] = "Timbermaw Hold";
  app.modalConstants.faction[637] = "Ratchet";
  app.modalConstants.faction[654] = "Troll,Witherbark";
  app.modalConstants.faction[655] = "Centaur,Kolkar";
  app.modalConstants.faction[674] = "Dark Iron Dwarves";
  app.modalConstants.faction[694] = "Alliance Generic";
  app.modalConstants.faction[695] = "Hydraxian Waterlords";
  app.modalConstants.faction[714] = "Horde Generic";
  app.modalConstants.faction[734] = "Dark Iron Dwarves";
  app.modalConstants.faction[735] = "Goblin,Dark Iron Bar Patron";
  app.modalConstants.faction[736] = "Goblin,Dark Iron Bar Patron";
  app.modalConstants.faction[754] = "Dark Iron Dwarves";
  app.modalConstants.faction[774] = "Escortee";
  app.modalConstants.faction[775] = "Escortee";
  app.modalConstants.faction[776] = "Brood of Nozdormu";
  app.modalConstants.faction[777] = "Might of Kalimdor";
  app.modalConstants.faction[778] = "Giant";
  app.modalConstants.faction[794] = "Argent Dawn";
  app.modalConstants.faction[795] = "Troll,Vilebranch";
  app.modalConstants.faction[814] = "Argent Dawn";
  app.modalConstants.faction[834] = "Elemental";
  app.modalConstants.faction[854] = "Everlook";
  app.modalConstants.faction[855] = "Everlook";
  app.modalConstants.faction[874] = "Wintersaber Trainers";
  app.modalConstants.faction[875] = "Gnomeregan Exiles";
  app.modalConstants.faction[876] = "Darkspear Trolls";
  app.modalConstants.faction[877] = "Darkspear Trolls";
  app.modalConstants.faction[894] = "Theramore";
  app.modalConstants.faction[914] = "Training Dummy";
  app.modalConstants.faction[934] = "Furbolg,Uncorrupted";
  app.modalConstants.faction[954] = "Demon";
  app.modalConstants.faction[974] = "Undead,Scourge";
  app.modalConstants.faction[994] = "Cenarion Circle";
  app.modalConstants.faction[995] = "Thunder Bluff";
  app.modalConstants.faction[996] = "Cenarion Circle";
  app.modalConstants.faction[1014] = "Shatterspear Trolls";
  app.modalConstants.faction[1015] = "Shatterspear Trolls";
  app.modalConstants.faction[1034] = "Horde Generic";
  app.modalConstants.faction[1054] = "Alliance Generic";
  app.modalConstants.faction[1055] = "Alliance Generic";
  app.modalConstants.faction[1074] = "Orgrimmar";
  app.modalConstants.faction[1075] = "Theramore";
  app.modalConstants.faction[1076] = "Darnassus";
  app.modalConstants.faction[1077] = "Theramore";
  app.modalConstants.faction[1078] = "Stormwind";
  app.modalConstants.faction[1080] = "Friendly";
  app.modalConstants.faction[1081] = "Elemental";
  app.modalConstants.faction[1094] = "Beast-Boar";
  app.modalConstants.faction[1095] = "Training Dummy";
  app.modalConstants.faction[1096] = "Theramore";
  app.modalConstants.faction[1097] = "Darnassus";
  app.modalConstants.faction[1114] = "Dragonflight,Black-Bait";
  app.modalConstants.faction[1134] = "Undercity";
  app.modalConstants.faction[1154] = "Undercity";
  app.modalConstants.faction[1174] = "Orgrimmar";
  app.modalConstants.faction[1194] = "Battleground Neutral";
  app.modalConstants.faction[1214] = "Frostwolf Clan";
  app.modalConstants.faction[1215] = "Frostwolf Clan";
  app.modalConstants.faction[1216] = "Stormpike Guard";
  app.modalConstants.faction[1217] = "Stormpike Guard";
  app.modalConstants.faction[1234] = "Sulfuron Firelords";
  app.modalConstants.faction[1235] = "Sulfuron Firelords";
  app.modalConstants.faction[1236] = "Sulfuron Firelords";
  app.modalConstants.faction[1254] = "Cenarion Circle";
  app.modalConstants.faction[1274] = "Creature";
  app.modalConstants.faction[1275] = "Creature";
  app.modalConstants.faction[1294] = "Gizlock";
  app.modalConstants.faction[1314] = "Horde Generic";
  app.modalConstants.faction[1315] = "Alliance Generic";
  app.modalConstants.faction[1334] = "Stormpike Guard";
  app.modalConstants.faction[1335] = "Frostwolf Clan";
  app.modalConstants.faction[1354] = "Shen'dralar";
  app.modalConstants.faction[1355] = "Shen'dralar";
  app.modalConstants.faction[1374] = "Ogre(Captain Kromcrush)";
  app.modalConstants.faction[1375] = "Treasure";
  app.modalConstants.faction[1394] = "Dragonflight,Black";
  app.modalConstants.faction[1395] = "Silithid Attackers";
  app.modalConstants.faction[1414] = "Spirit Guide-Alliance";
  app.modalConstants.faction[1415] = "Spirit Guide-Horde";
  app.modalConstants.faction[1434] = "Jaedenar";
  app.modalConstants.faction[1454] = "Victim";
  app.modalConstants.faction[1474] = "Thorium Brotherhood";
  app.modalConstants.faction[1475] = "Thorium Brotherhood";
  app.modalConstants.faction[1494] = "Horde Generic";
  app.modalConstants.faction[1495] = "Horde Generic";
  app.modalConstants.faction[1496] = "Horde Generic";
  app.modalConstants.faction[1514] = "Silverwing Sentinels";
  app.modalConstants.faction[1515] = "Warsong Outriders";
  app.modalConstants.faction[1534] = "Stormpike Guard";
  app.modalConstants.faction[1554] = "Frostwolf Clan";
  app.modalConstants.faction[1555] = "Darkmoon Faire";
  app.modalConstants.faction[1574] = "Zandalar Tribe";
  app.modalConstants.faction[1575] = "Stormwind";
  app.modalConstants.faction[1576] = "Silvermoon Remnant";
  app.modalConstants.faction[1577] = "The League of Arathor";
  app.modalConstants.faction[1594] = "Darnassus";
  app.modalConstants.faction[1595] = "Orgrimmar";
  app.modalConstants.faction[1596] = "Stormpike Guard";
  app.modalConstants.faction[1597] = "Frostwolf Clan";
  app.modalConstants.faction[1598] = "The Defilers";
  app.modalConstants.faction[1599] = "The League of Arathor";
  app.modalConstants.faction[1600] = "Darnassus";
  app.modalConstants.faction[1601] = "Brood of Nozdormu";
  app.modalConstants.faction[1602] = "Silvermoon City";
  app.modalConstants.faction[1603] = "Silvermoon City";
  app.modalConstants.faction[1604] = "Silvermoon City";
  app.modalConstants.faction[1605] = "Dragonflight,Bronze";
  app.modalConstants.faction[1606] = "Creature";
  app.modalConstants.faction[1607] = "Creature";
  app.modalConstants.faction[1608] = "Cenarion Circle";
  app.modalConstants.faction[1610] = "PLAYER,BloodElf";
  app.modalConstants.faction[1611] = "Ironforge";
  app.modalConstants.faction[1612] = "Orgrimmar";
  app.modalConstants.faction[1613] = "Might of Kalimdor";
  app.modalConstants.faction[1614] = "Monster";
  app.modalConstants.faction[1615] = "Steamwheedle Cartel";
  app.modalConstants.faction[1616] = "RC Objects";
  app.modalConstants.faction[1617] = "RC Enemies";
  app.modalConstants.faction[1618] = "Ironforge";
  app.modalConstants.faction[1619] = "Orgrimmar";
  app.modalConstants.faction[1620] = "Enemy";
  app.modalConstants.faction[1621] = "Blue";
  app.modalConstants.faction[1622] = "Red";
  app.modalConstants.faction[1623] = "Tranquillien";
  app.modalConstants.faction[1624] = "Argent Dawn";
  app.modalConstants.faction[1625] = "Argent Dawn";
  app.modalConstants.faction[1626] = "Undead,Scourge";
  app.modalConstants.faction[1627] = "Farstriders";
  app.modalConstants.faction[1628] = "Tranquillien";
  app.modalConstants.faction[1629] = "PLAYER,Draenei";
  app.modalConstants.faction[1630] = "Scourge Invaders";
  app.modalConstants.faction[1634] = "Scourge Invaders";
  app.modalConstants.faction[1635] = "Steamwheedle Cartel";
  app.modalConstants.faction[1636] = "Farstriders";
  app.modalConstants.faction[1637] = "Farstriders";
  app.modalConstants.faction[1638] = "Exodar";
  app.modalConstants.faction[1639] = "Exodar";
  app.modalConstants.faction[1640] = "Exodar";
  app.modalConstants.faction[1641] = "Warsong Outriders";
  app.modalConstants.faction[1642] = "Silverwing Sentinels";
  app.modalConstants.faction[1643] = "Troll,Forest";
  app.modalConstants.faction[1644] = "The Sons of Lothar";
  app.modalConstants.faction[1645] = "The Sons of Lothar";
  app.modalConstants.faction[1646] = "Exodar";
  app.modalConstants.faction[1647] = "Exodar";
  app.modalConstants.faction[1648] = "The Sons of Lothar";
  app.modalConstants.faction[1649] = "The Sons of Lothar";
  app.modalConstants.faction[1650] = "TheMag'har";
  app.modalConstants.faction[1651] = "TheMag'har";
  app.modalConstants.faction[1652] = "TheMag'har";
  app.modalConstants.faction[1653] = "TheMag'har";
  app.modalConstants.faction[1654] = "Exodar";
  app.modalConstants.faction[1655] = "Exodar";
  app.modalConstants.faction[1656] = "Silvermoon City";
  app.modalConstants.faction[1657] = "Silvermoon City";
  app.modalConstants.faction[1658] = "Silvermoon City";
  app.modalConstants.faction[1659] = "Cenarion Expedition";
  app.modalConstants.faction[1660] = "Cenarion Expedition";
  app.modalConstants.faction[1661] = "Cenarion Expedition";
  app.modalConstants.faction[1662] = "Fel Orc";
  app.modalConstants.faction[1663] = "Fel Orc Ghost";
  app.modalConstants.faction[1664] = "Sons of Lothar Ghosts";
  app.modalConstants.faction[1665] = "None";
  app.modalConstants.faction[1666] = "Honor Hold";
  app.modalConstants.faction[1667] = "Honor Hold";
  app.modalConstants.faction[1668] = "Thrallmar";
  app.modalConstants.faction[1669] = "Thrallmar";
  app.modalConstants.faction[1670] = "Thrallmar";
  app.modalConstants.faction[1671] = "Honor Hold";
  app.modalConstants.faction[1672] = "Test Faction 1";
  app.modalConstants.faction[1673] = "To WoW-Flag";
  app.modalConstants.faction[1674] = "Test Faction 4";
  app.modalConstants.faction[1675] = "Test Faction 3";
  app.modalConstants.faction[1676] = "ToWoW-Flag Trigger Horde(DND)";
  app.modalConstants.faction[1677] = "ToWoW-Flag Trigger Alliance(DND)";
  app.modalConstants.faction[1678] = "Ethereum";
  app.modalConstants.faction[1679] = "Broken";
  app.modalConstants.faction[1680] = "Elemental";
  app.modalConstants.faction[1681] = "Earth Elemental";
  app.modalConstants.faction[1682] = "Fighting Robots";
  app.modalConstants.faction[1683] = "Actor Good";
  app.modalConstants.faction[1684] = "Actor Evil";
  app.modalConstants.faction[1685] = "Stillpine Furbolg";
  app.modalConstants.faction[1686] = "Stillpine Furbolg";
  app.modalConstants.faction[1687] = "Crazed Owlkin";
  app.modalConstants.faction[1688] = "Chess Alliance";
  app.modalConstants.faction[1689] = "Chess Horde";
  app.modalConstants.faction[1690] = "Chess Alliance";
  app.modalConstants.faction[1691] = "Chess Horde";
  app.modalConstants.faction[1692] = "Monster Spar";
  app.modalConstants.faction[1693] = "Monster Spar Buddy";
  app.modalConstants.faction[1694] = "Exodar";
  app.modalConstants.faction[1695] = "Silvermoon City";
  app.modalConstants.faction[1696] = "The Violet Eye";
  app.modalConstants.faction[1697] = "Fel Orc";
  app.modalConstants.faction[1698] = "Exodar";
  app.modalConstants.faction[1699] = "Exodar";
  app.modalConstants.faction[1700] = "Exodar";
  app.modalConstants.faction[1701] = "Sunhawks";
  app.modalConstants.faction[1702] = "Sunhawks";
  app.modalConstants.faction[1703] = "Training Dummy";
  app.modalConstants.faction[1704] = "Fel Orc";
  app.modalConstants.faction[1705] = "Fel Orc";
  app.modalConstants.faction[1706] = "Fungal Giant";
  app.modalConstants.faction[1707] = "Sporeggar";
  app.modalConstants.faction[1708] = "Sporeggar";
  app.modalConstants.faction[1709] = "Sporeggar";
  app.modalConstants.faction[1710] = "Cenarion Expedition";
  app.modalConstants.faction[1711] = "Monster,Predator";
  app.modalConstants.faction[1712] = "Monster,Prey";
  app.modalConstants.faction[1713] = "Monster,Prey";
  app.modalConstants.faction[1714] = "Sunhawks";
  app.modalConstants.faction[1715] = "VoidAnomaly";
  app.modalConstants.faction[1716] = "Hyjal Defenders";
  app.modalConstants.faction[1717] = "Hyjal Defenders";
  app.modalConstants.faction[1718] = "Hyjal Defenders";
  app.modalConstants.faction[1719] = "Hyjal Defenders";
  app.modalConstants.faction[1720] = "Hyjal Invaders";
  app.modalConstants.faction[1721] = "Kurenai";
  app.modalConstants.faction[1722] = "Kurenai";
  app.modalConstants.faction[1723] = "Kurenai";
  app.modalConstants.faction[1724] = "Kurenai";
  app.modalConstants.faction[1725] = "Earthen Ring";
  app.modalConstants.faction[1726] = "Earthen Ring";
  app.modalConstants.faction[1727] = "Earthen Ring";
  app.modalConstants.faction[1728] = "Cenarion Expedition";
  app.modalConstants.faction[1729] = "Thrallmar";
  app.modalConstants.faction[1730] = "The Consortium";
  app.modalConstants.faction[1731] = "The Consortium";
  app.modalConstants.faction[1732] = "Alliance Generic";
  app.modalConstants.faction[1733] = "Alliance Generic";
  app.modalConstants.faction[1734] = "Horde Generic";
  app.modalConstants.faction[1735] = "Horde Generic";
  app.modalConstants.faction[1736] = "Monster Spar Buddy";
  app.modalConstants.faction[1737] = "Honor Hold";
  app.modalConstants.faction[1738] = "Arakkoa";
  app.modalConstants.faction[1739] = "Zangarmarsh Banner(Alliance)";
  app.modalConstants.faction[1740] = "Zangarmarsh Banner(Horde)";
  app.modalConstants.faction[1741] = "The Sha'tar";
  app.modalConstants.faction[1742] = "Zangarmarsh Banner(Neutral)";
  app.modalConstants.faction[1743] = "The Aldor";
  app.modalConstants.faction[1744] = "The Scryers";
  app.modalConstants.faction[1745] = "Silvermoon City";
  app.modalConstants.faction[1746] = "The Scryers";
  app.modalConstants.faction[1747] = "Caverns of Time-Thrall";
  app.modalConstants.faction[1748] = "Caverns of Time-Durnholde";
  app.modalConstants.faction[1749] = "Caverns of Time-Southshore Guards";
  app.modalConstants.faction[1750] = "Shadow Council Covert";
  app.modalConstants.faction[1751] = "Monster";
  app.modalConstants.faction[1752] = "Dark Portal Attacker,Legion";
  app.modalConstants.faction[1753] = "Dark Portal Attacker,Legion";
  app.modalConstants.faction[1754] = "Dark Portal Attacker,Legion";
  app.modalConstants.faction[1755] = "Dark Portal Defender,Alliance";
  app.modalConstants.faction[1756] = "Dark Portal Defender,Alliance";
  app.modalConstants.faction[1757] = "Dark Portal Defender,Alliance";
  app.modalConstants.faction[1758] = "Dark Portal Defender,Horde";
  app.modalConstants.faction[1759] = "Dark Portal Defender,Horde";
  app.modalConstants.faction[1760] = "Dark Portal Defender,Horde";
  app.modalConstants.faction[1761] = "Inciter Trigger";
  app.modalConstants.faction[1762] = "Inciter Trigger 2";
  app.modalConstants.faction[1763] = "Inciter Trigger 3";
  app.modalConstants.faction[1764] = "Inciter Trigger 4";
  app.modalConstants.faction[1765] = "Inciter Trigger 5";
  app.modalConstants.faction[1766] = "Argent Dawn";
  app.modalConstants.faction[1767] = "Argent Dawn";
  app.modalConstants.faction[1768] = "Demon";
  app.modalConstants.faction[1769] = "Demon";
  app.modalConstants.faction[1770] = "Actor Good";
  app.modalConstants.faction[1771] = "Actor Evil";
  app.modalConstants.faction[1772] = "Mana Creature";
  app.modalConstants.faction[1773] = "Khadgar's Servant";
  app.modalConstants.faction[1774] = "Friendly";
  app.modalConstants.faction[1775] = "The Sha'tar";
  app.modalConstants.faction[1776] = "The Aldor";
  app.modalConstants.faction[1777] = "The Aldor";
  app.modalConstants.faction[1778] = "The Scale of the Sands";
  app.modalConstants.faction[1779] = "Keepers of Time";
  app.modalConstants.faction[1780] = "Bladespire Clan";
  app.modalConstants.faction[1781] = "Bloodmaul Clan";
  app.modalConstants.faction[1782] = "Bladespire Clan";
  app.modalConstants.faction[1783] = "Bloodmaul Clan";
  app.modalConstants.faction[1784] = "Bladespire Clan";
  app.modalConstants.faction[1785] = "Bloodmaul Clan";
  app.modalConstants.faction[1786] = "Demon";
  app.modalConstants.faction[1787] = "Monster";
  app.modalConstants.faction[1788] = "The Consortium";
  app.modalConstants.faction[1789] = "Sunhawks";
  app.modalConstants.faction[1790] = "Bladespire Clan";
  app.modalConstants.faction[1791] = "Bloodmaul Clan";
  app.modalConstants.faction[1792] = "FelOrc";
  app.modalConstants.faction[1793] = "Sunhawks";
  app.modalConstants.faction[1794] = "Protectorate";
  app.modalConstants.faction[1795] = "Protectorate";
  app.modalConstants.faction[1796] = "Ethereum";
  app.modalConstants.faction[1797] = "Protectorate";
  app.modalConstants.faction[1798] = "Arcane Annihilator(DNR)";
  app.modalConstants.faction[1799] = "Ethereum Sparbuddy";
  app.modalConstants.faction[1800] = "Ethereum";
  app.modalConstants.faction[1801] = "Horde";
  app.modalConstants.faction[1802] = "Alliance";
  app.modalConstants.faction[1803] = "Ambient";
  app.modalConstants.faction[1804] = "Ambient";
  app.modalConstants.faction[1805] = "The Aldor";
  app.modalConstants.faction[1806] = "Friendly";
  app.modalConstants.faction[1807] = "Protectorate";
  app.modalConstants.faction[1808] = "Kirin'Var-Belmara";
  app.modalConstants.faction[1809] = "Kirin'Var-Cohlien";
  app.modalConstants.faction[1810] = "Kirin'Var-Dathric";
  app.modalConstants.faction[1811] = "Kirin'Var-Luminrath";
  app.modalConstants.faction[1812] = "Friendly";
  app.modalConstants.faction[1813] = "Servant of Illidan";
  app.modalConstants.faction[1814] = "Monster Spar Buddy";
  app.modalConstants.faction[1815] = "Beast-Wolf";
  app.modalConstants.faction[1816] = "Friendly";
  app.modalConstants.faction[1818] = "Lower City";
  app.modalConstants.faction[1819] = "Alliance Generic";
  app.modalConstants.faction[1820] = "Ashtongue Deathsworn";
  app.modalConstants.faction[1821] = "Spirits of Shadowmoon 1";
  app.modalConstants.faction[1822] = "Spirits of Shadowmoon 2";
  app.modalConstants.faction[1823] = "Ethereum";
  app.modalConstants.faction[1824] = "Netherwing";
  app.modalConstants.faction[1825] = "Demon";
  app.modalConstants.faction[1826] = "Servant of Illidan";
  app.modalConstants.faction[1827] = "Wyrmcult";
  app.modalConstants.faction[1828] = "Treant";
  app.modalConstants.faction[1829] = "Leotheras Demon I";
  app.modalConstants.faction[1830] = "Leotheras Demon II";
  app.modalConstants.faction[1831] = "Leotheras Demon III";
  app.modalConstants.faction[1832] = "Leotheras Demon IV";
  app.modalConstants.faction[1833] = "Leotheras Demon V";
  app.modalConstants.faction[1834] = "Azaloth";
  app.modalConstants.faction[1835] = "Horde Generic";
  app.modalConstants.faction[1836] = "The Consortium";
  app.modalConstants.faction[1837] = "Sporeggar";
  app.modalConstants.faction[1838] = "The Scryers";
  app.modalConstants.faction[1839] = "Rock Flayer";
  app.modalConstants.faction[1840] = "Flayer Hunter";
  app.modalConstants.faction[1841] = "Shadowmoon Shade";
  app.modalConstants.faction[1842] = "Legion Communicator";
  app.modalConstants.faction[1843] = "Servant of Illidan";
  app.modalConstants.faction[1844] = "The Aldor";
  app.modalConstants.faction[1845] = "The Scryers";
  app.modalConstants.faction[1846] = "Ravenswood Ancients";
  app.modalConstants.faction[1847] = "Monster Spar";
  app.modalConstants.faction[1848] = "Monster Spar Buddy";
  app.modalConstants.faction[1849] = "Servant of Illidan";
  app.modalConstants.faction[1850] = "Netherwing";
  app.modalConstants.faction[1851] = "Lower City";
  app.modalConstants.faction[1852] = "Chess,Friendly to All Chess";
  app.modalConstants.faction[1853] = "Servant of Illidan";
  app.modalConstants.faction[1854] = "The Aldor";
  app.modalConstants.faction[1855] = "The Scryers";
  app.modalConstants.faction[1856] = "Sha'tari Skyguard";
  app.modalConstants.faction[1857] = "Friendly";
  app.modalConstants.faction[1858] = "Ashtongue Deathsworn";
  app.modalConstants.faction[1859] = "Maiev";
  app.modalConstants.faction[1860] = "Skettis Shadowy Arakkoa";
  app.modalConstants.faction[1862] = "Skettis Arakkoa";
  app.modalConstants.faction[1863] = "Orc,Dragonmaw";
  app.modalConstants.faction[1864] = "Dragonmaw Enemy";
  app.modalConstants.faction[1865] = "Orc,Dragonmaw";
  app.modalConstants.faction[1866] = "Ashtongue Deathsworn";
  app.modalConstants.faction[1867] = "Maiev";
  app.modalConstants.faction[1868] = "Monster Spar Buddy";
  app.modalConstants.faction[1869] = "Arakkoa";
  app.modalConstants.faction[1870] = "Sha'tari Skyguard";
  app.modalConstants.faction[1871] = "Skettis Arakkoa";
  app.modalConstants.faction[1872] = "Ogri'la";
  app.modalConstants.faction[1873] = "Rock Flayer";
  app.modalConstants.faction[1874] = "Ogri'la";
  app.modalConstants.faction[1875] = "The Aldor";
  app.modalConstants.faction[1876] = "The Scryers";
  app.modalConstants.faction[1877] = "Orc,Dragonmaw";
  app.modalConstants.faction[1878] = "Frenzy";
  app.modalConstants.faction[1879] = "Skyguard Enemy";
  app.modalConstants.faction[1880] = "Orc,Dragonmaw";
  app.modalConstants.faction[1881] = "Skettis Arakkoa";
  app.modalConstants.faction[1882] = "Servant of Illidan";
  app.modalConstants.faction[1883] = "Theramore Deserter";
  app.modalConstants.faction[1884] = "Tuskarr";
  app.modalConstants.faction[1885] = "Vrykul";
  app.modalConstants.faction[1886] = "Creature";
  app.modalConstants.faction[1887] = "Creature";
  app.modalConstants.faction[1888] = "Northsea Pirates";
  app.modalConstants.faction[1889] = "UNUSED";
  app.modalConstants.faction[1890] = "Troll,Amani";
  app.modalConstants.faction[1891] = "Valiance Expedition";
  app.modalConstants.faction[1892] = "Valiance Expedition";
  app.modalConstants.faction[1893] = "Valiance Expedition";
  app.modalConstants.faction[1894] = "Vrykul";
  app.modalConstants.faction[1895] = "Vrykul";
  app.modalConstants.faction[1896] = "Darkmoon Faire";
  app.modalConstants.faction[1897] = "The Hand of Vengeance";
  app.modalConstants.faction[1898] = "Valiance Expedition";
  app.modalConstants.faction[1899] = "Valiance Expedition";
  app.modalConstants.faction[1900] = "The Hand of Vengeance";
  app.modalConstants.faction[1901] = "Horde Expedition";
  app.modalConstants.faction[1902] = "Actor Evil";
  app.modalConstants.faction[1904] = "Actor Evil";
  app.modalConstants.faction[1905] = "Tamed Plaguehound";
  app.modalConstants.faction[1906] = "Spotted Gryphon";
  app.modalConstants.faction[1907] = "Test Faction 1";
  app.modalConstants.faction[1908] = "Test Faction 1";
  app.modalConstants.faction[1909] = "Beast-Raptor";
  app.modalConstants.faction[1910] = "Vrykul(AncientSpirit1)";
  app.modalConstants.faction[1911] = "Vrykul(AncientSiprit2)";
  app.modalConstants.faction[1912] = "Vrykul(AncientSiprit3)";
  app.modalConstants.faction[1913] = "CTF-Flag-Alliance";
  app.modalConstants.faction[1914] = "Vrykul";
  app.modalConstants.faction[1915] = "Test";
  app.modalConstants.faction[1916] = "Maiev";
  app.modalConstants.faction[1917] = "Creature";
  app.modalConstants.faction[1918] = "Horde Expedition";
  app.modalConstants.faction[1919] = "Vrykul Gladiator";
  app.modalConstants.faction[1920] = "Valgarde Combatant";
  app.modalConstants.faction[1921] = "The Taunka";
  app.modalConstants.faction[1922] = "The Taunka";
  app.modalConstants.faction[1923] = "The Taunka";
  app.modalConstants.faction[1924] = "Monster,Zone Force Reaction 1";
  app.modalConstants.faction[1925] = "Monster";
  app.modalConstants.faction[1926] = "Explorer's League";
  app.modalConstants.faction[1927] = "Explorer's League";
  app.modalConstants.faction[1928] = "The Hand of Vengeance";
  app.modalConstants.faction[1929] = "The Hand of Vengeance";
  app.modalConstants.faction[1930] = "Ram Racing Powerup DND";
  app.modalConstants.faction[1931] = "Ram Racing Trap DND";
  app.modalConstants.faction[1932] = "Elemental";
  app.modalConstants.faction[1933] = "Friendly";
  app.modalConstants.faction[1934] = "Actor Good";
  app.modalConstants.faction[1935] = "Actor Good";
  app.modalConstants.faction[1936] = "Craig's Squirrels";
  app.modalConstants.faction[1937] = "Craig's Squirrels";
  app.modalConstants.faction[1938] = "Craig's Squirrels";
  app.modalConstants.faction[1939] = "Craig's Squirrels";
  app.modalConstants.faction[1940] = "Craig's Squirrels";
  app.modalConstants.faction[1941] = "Craig's Squirrels";
  app.modalConstants.faction[1942] = "Craig's Squirrels";
  app.modalConstants.faction[1943] = "Craig's Squirrels";
  app.modalConstants.faction[1944] = "Craig's Squirrels";
  app.modalConstants.faction[1945] = "Craig's Squirrels";
  app.modalConstants.faction[1947] = "Craig's Squirrels";
  app.modalConstants.faction[1948] = "Blue";
  app.modalConstants.faction[1949] = "The Kalu' ak";
  app.modalConstants.faction[1950] = "The Kalu' ak";
  app.modalConstants.faction[1951] = "Darnassus";
  app.modalConstants.faction[1952] = "Holiday-WaterBarrel";
  app.modalConstants.faction[1953] = "Monster,Predator";
  app.modalConstants.faction[1954] = "Iron Dwarves";
  app.modalConstants.faction[1955] = "Iron Dwarves";
  app.modalConstants.faction[1956] = "Shattered Sun Offensive";
  app.modalConstants.faction[1957] = "Shattered Sun Offensive";
  app.modalConstants.faction[1958] = "Actor Evil";
  app.modalConstants.faction[1959] = "Actor Evil";
  app.modalConstants.faction[1960] = "Shattered Sun Offensive";
  app.modalConstants.faction[1961] = "Fighting Vanity Pet";
  app.modalConstants.faction[1962] = "Undead,Scourge";
  app.modalConstants.faction[1963] = "Demon";
  app.modalConstants.faction[1964] = "Undead,Scourge";
  app.modalConstants.faction[1965] = "Monster Spar";
  app.modalConstants.faction[1966] = "Murloc";
  app.modalConstants.faction[1967] = "Shattered Sun Offensive";
  app.modalConstants.faction[1968] = "Murloc,Winterfin";
  app.modalConstants.faction[1969] = "Murloc";
  app.modalConstants.faction[1970] = "Monster";
  app.modalConstants.faction[1971] = "Friendly,Force Reaction";
  app.modalConstants.faction[1972] = "Object,Force Reaction";
  app.modalConstants.faction[1973] = "Valiance Expedition";
  app.modalConstants.faction[1974] = "Valiance Expedition";
  app.modalConstants.faction[1975] = "Undead,Scourge";
  app.modalConstants.faction[1976] = "Valiance Expedition";
  app.modalConstants.faction[1977] = "Valiance Expedition";
  app.modalConstants.faction[1978] = "Warsong Offensive";
  app.modalConstants.faction[1979] = "Warsong Offensive";
  app.modalConstants.faction[1980] = "Warsong Offensive";
  app.modalConstants.faction[1981] = "Warsong Offensive";
  app.modalConstants.faction[1982] = "Undead,Scourge";
  app.modalConstants.faction[1983] = "Monster Spar";
  app.modalConstants.faction[1984] = "Monster Spar Buddy";
  app.modalConstants.faction[1985] = "Monster";
  app.modalConstants.faction[1986] = "Escortee";
  app.modalConstants.faction[1987] = "Cenarion Expedition";
  app.modalConstants.faction[1988] = "Undead,Scourge";
  app.modalConstants.faction[1989] = "Poacher";
  app.modalConstants.faction[1990] = "Ambient";
  app.modalConstants.faction[1991] = "Undead,Scourge";
  app.modalConstants.faction[1992] = "Monster";
  app.modalConstants.faction[1993] = "Monster Spar";
  app.modalConstants.faction[1994] = "Monster Spar Buddy";
  app.modalConstants.faction[1995] = "CTF-Flag-Alliance";
  app.modalConstants.faction[1997] = "CTF-Flag-Alliance";
  app.modalConstants.faction[1998] = "Holiday Monster";
  app.modalConstants.faction[1999] = "Monster,Prey";
  app.modalConstants.faction[2000] = "Monster,Prey";
  app.modalConstants.faction[2001] = "Furbolg,Redfang";
  app.modalConstants.faction[2003] = "Furbolg,Frostpaw";
  app.modalConstants.faction[2004] = "Valiance Expedition";
  app.modalConstants.faction[2005] = "Undead,Scourge";
  app.modalConstants.faction[2006] = "Kirin Tor";
  app.modalConstants.faction[2007] = "Kirin Tor";
  app.modalConstants.faction[2008] = "Kirin Tor";
  app.modalConstants.faction[2009] = "Kirin Tor";
  app.modalConstants.faction[2010] = "The Wyrmrest Accord";
  app.modalConstants.faction[2011] = "The Wyrmrest Accord";
  app.modalConstants.faction[2012] = "The Wyrmrest Accord";
  app.modalConstants.faction[2013] = "The Wyrmrest Accord";
  app.modalConstants.faction[2014] = "Azjol-Nerub";
  app.modalConstants.faction[2016] = "Azjol-Nerub";
  app.modalConstants.faction[2017] = "Azjol-Nerub";
  app.modalConstants.faction[2018] = "Undead,Scourge";
  app.modalConstants.faction[2019] = "The Taunka";
  app.modalConstants.faction[2020] = "Warsong Offensive";
  app.modalConstants.faction[2021] = "REUSE";
  app.modalConstants.faction[2022] = "Monster";
  app.modalConstants.faction[2023] = "Scourge Invaders";
  app.modalConstants.faction[2024] = "The Hand of Vengeance";
  app.modalConstants.faction[2025] = "The Silver Covenant";
  app.modalConstants.faction[2026] = "The Silver Covenant";
  app.modalConstants.faction[2027] = "The Silver Covenant";
  app.modalConstants.faction[2028] = "Ambient";
  app.modalConstants.faction[2029] = "Monster, Predator";
  app.modalConstants.faction[2030] = "Monster, Predator";
  app.modalConstants.faction[2031] = "Horde Generic";
  app.modalConstants.faction[2032] = "GrizzlyHills Trapper";
  app.modalConstants.faction[2033] = "Monster";
  app.modalConstants.faction[2034] = "Warsong Offensive";
  app.modalConstants.faction[2035] = "Undead, Scourge";
  app.modalConstants.faction[2036] = "Friendly";
  app.modalConstants.faction[2037] = "Valiance Expedition";
  app.modalConstants.faction[2038] = "Ambient";
  app.modalConstants.faction[2039] = "Monster";
  app.modalConstants.faction[2040] = "Valiance Expedition";
  app.modalConstants.faction[2041] = "The Wyrmrest Accord";
  app.modalConstants.faction[2042] = "Undead, Scourge";
  app.modalConstants.faction[2043] = "Undead, Scourge";
  app.modalConstants.faction[2044] = "Valiance Expedition";
  app.modalConstants.faction[2045] = "Warsong Offensive";
  app.modalConstants.faction[2046] = "Escortee";
  app.modalConstants.faction[2047] = "The Kalu' ak";
  app.modalConstants.faction[2048] = "Scourge Invaders";
  app.modalConstants.faction[2049] = "Scourge Invaders";
  app.modalConstants.faction[2050] = "Knights of the EbonBlade";
  app.modalConstants.faction[2051] = "Knights of the EbonBlade";
  app.modalConstants.faction[2052] = "Wrathgate Scourge";
  app.modalConstants.faction[2053] = "Wrathgate Alliance";
  app.modalConstants.faction[2054] = "Wrathgate Horde";
  app.modalConstants.faction[2055] = "Monster Spar";
  app.modalConstants.faction[2056] = "Monster Spar Buddy";
  app.modalConstants.faction[2057] = "Monster, ZoneForceReaction 2";
  app.modalConstants.faction[2058] = "CTF-Flag-Horde";
  app.modalConstants.faction[2059] = "CTF-Flag-Neutral";
  app.modalConstants.faction[2060] = "Frenzyheart Tribe";
  app.modalConstants.faction[2061] = "Frenzyheart Tribe";
  app.modalConstants.faction[2062] = "Frenzyheart Tribe";
  app.modalConstants.faction[2063] = "The Oracles";
  app.modalConstants.faction[2064] = "The Oracles";
  app.modalConstants.faction[2065] = "The Oracles";
  app.modalConstants.faction[2066] = "The Oracles";
  app.modalConstants.faction[2067] = "The Wyrmrest Accord";
  app.modalConstants.faction[2068] = "Undead, Scourge";
  app.modalConstants.faction[2069] = "Troll, Drakkari";
  app.modalConstants.faction[2070] = "Argent Crusade";
  app.modalConstants.faction[2071] = "Argent Crusade";
  app.modalConstants.faction[2072] = "Argent Crusade";
  app.modalConstants.faction[2073] = "Argent Crusade";
  app.modalConstants.faction[2074] = "Caverns of Time-Durnholde";
  app.modalConstants.faction[2075] = "CoT Scourge";
  app.modalConstants.faction[2076] = "CoT Arthas";
  app.modalConstants.faction[2077] = "CoT Arthas";
  app.modalConstants.faction[2078] = "CoT Stratholme Citizen";
  app.modalConstants.faction[2079] = "CoT Arthas";
  app.modalConstants.faction[2080] = "Undead, Scourge";
  app.modalConstants.faction[2081] = "Freya";
  app.modalConstants.faction[2082] = "Undead, Scourge";
  app.modalConstants.faction[2083] = "Undead, Scourge";
  app.modalConstants.faction[2084] = "Undead, Scourge";
  app.modalConstants.faction[2085] = "Undead, Scourge";
  app.modalConstants.faction[2086] = "Argent Dawn";
  app.modalConstants.faction[2087] = "Argent Dawn";
  app.modalConstants.faction[2088] = "Actor Evil";
  app.modalConstants.faction[2089] = "Scarlet Crusade";
  app.modalConstants.faction[2090] = "Mount-Taxi-Alliance";
  app.modalConstants.faction[2091] = "Mount-Taxi-Horde";
  app.modalConstants.faction[2092] = "Mount-Taxi-Neutral";
  app.modalConstants.faction[2093] = "Undead, Scourge";
  app.modalConstants.faction[2094] = "Undead, Scourge";
  app.modalConstants.faction[2095] = "Scarlet Crusade";
  app.modalConstants.faction[2096] = "Scarlet Crusade";
  app.modalConstants.faction[2097] = "Undead, Scourge";
  app.modalConstants.faction[2098] = "Elemental, Air";
  app.modalConstants.faction[2099] = "Elemental, Water";
  app.modalConstants.faction[2100] = "Undead, Scourge";
  app.modalConstants.faction[2101] = "Actor Evil";
  app.modalConstants.faction[2102] = "Actor Evil";
  app.modalConstants.faction[2103] = "Scarlet Crusade";
  app.modalConstants.faction[2104] = "Monster Spar";
  app.modalConstants.faction[2105] = "Monster Spar Buddy";
  app.modalConstants.faction[2106] = "Ambient";
  app.modalConstants.faction[2107] = "The Sons of Hodir";
  app.modalConstants.faction[2108] = "Iron Giants";
  app.modalConstants.faction[2109] = "Frost Vrykul";
  app.modalConstants.faction[2110] = "Friendly";
  app.modalConstants.faction[2111] = "Monster";
  app.modalConstants.faction[2112] = "The Sons of Hodir";
  app.modalConstants.faction[2113] = "Frost Vrykul";
  app.modalConstants.faction[2114] = "Vrykul";
  app.modalConstants.faction[2115] = "Actor Good";
  app.modalConstants.faction[2116] = "Vrykul";
  app.modalConstants.faction[2117] = "Actor Good";
  app.modalConstants.faction[2118] = "Earthen";
  app.modalConstants.faction[2119] = "Monster Referee";
  app.modalConstants.faction[2120] = "Monster Referee";
  app.modalConstants.faction[2121] = "The Sunreavers";
  app.modalConstants.faction[2122] = "The Sunreavers";
  app.modalConstants.faction[2123] = "The Sunreavers";
  app.modalConstants.faction[2124] = "Monster";
  app.modalConstants.faction[2125] = "Frost Vrykul";
  app.modalConstants.faction[2126] = "Frost Vrykul";
  app.modalConstants.faction[2127] = "Ambient";
  app.modalConstants.faction[2128] = "Hyldsmeet";
  app.modalConstants.faction[2129] = "The Sunreavers";
  app.modalConstants.faction[2130] = "The Silver Covenant";
  app.modalConstants.faction[2131] = "Argent Crusade";
  app.modalConstants.faction[2132] = "Warsong Offensive";
  app.modalConstants.faction[2133] = "Frost Vrykul";
  app.modalConstants.faction[2134] = "Argent Crusade";
  app.modalConstants.faction[2135] = "Friendly";
  app.modalConstants.faction[2136] = "Ambient";
  app.modalConstants.faction[2137] = "Friendly";
  app.modalConstants.faction[2138] = "Argent Crusade";
  app.modalConstants.faction[2139] = "ScourgeInvaders";
  app.modalConstants.faction[2140] = "Friendly";
  app.modalConstants.faction[2141] = "Friendly";
  app.modalConstants.faction[2142] = "Alliance";
  app.modalConstants.faction[2143] = "Valiance Expedition";
  app.modalConstants.faction[2144] = "Knights of the EbonBlade";
  app.modalConstants.faction[2145] = "Scourge Invaders";
  app.modalConstants.faction[2148] = "The Kalu'ak";
  app.modalConstants.faction[2150] = "Monster Spar Buddy";
  app.modalConstants.faction[2155] = "Ironforge";
  app.modalConstants.faction[2156] = "Monster, Predator";
  app.modalConstants.faction[2176] = "ActorGood";
  app.modalConstants.faction[2178] = "ActorGood";
  app.modalConstants.faction[2189] = "Hates Everything";
  app.modalConstants.faction[2190] = "Hates Everything";
  app.modalConstants.faction[2191] = "Hates Everything";
  app.modalConstants.faction[2209] = "Undead, Scourge";
  app.modalConstants.faction[2210] = "Silvermoon City";
  app.modalConstants.faction[2212] = "Undead,Scourge";
  app.modalConstants.faction[2214] = "Knights of the EbonBlade";
  app.modalConstants.faction[2216] = "The Ashen Verdict";
  app.modalConstants.faction[2217] = "The Ashen Verdict";
  app.modalConstants.faction[2218] = "The Ashen Verdict";
  app.modalConstants.faction[2219] = "The Ashen Verdict";
  app.modalConstants.faction[2226] = "Knights of the EbonBlade";
  app.modalConstants.faction[2230] = "ArgentCrusade";
  app.modalConstants.faction[2235] = "CTF-Flag-Horde 2";
  app.modalConstants.faction[2236] = "CTF-Flag-Alliance 2";

  /* creature type constants */
  app.modalConstants.type = [];
  app.modalConstants.type[1] = "Beast";
  app.modalConstants.type[2] = "Dragonkin";
  app.modalConstants.type[3] = "Demon";
  app.modalConstants.type[4] = "Elemental";
  app.modalConstants.type[5] = "Giant";
  app.modalConstants.type[6] = "Undead";
  app.modalConstants.type[7] = "Humanoid";
  app.modalConstants.type[8] = "Critter";
  app.modalConstants.type[9] = "Mechanical";
  app.modalConstants.type[10] = "Not specified";
  app.modalConstants.type[11] = "Totem";
  app.modalConstants.type[12] = "Non-combat Pet";
  app.modalConstants.type[13] = "Gas Cloud";

  /* race constants */
  app.modalConstants.race = [];
  app.modalConstants.race[0] = "HUMAN";
  app.modalConstants.race[1] = "ORC";
  app.modalConstants.race[2] = "DWARF";
  app.modalConstants.race[3] = "NIGHTELF";
  app.modalConstants.race[4] = "UNDEAD_PLAYER";
  app.modalConstants.race[5] = "TAUREN";
  app.modalConstants.race[6] = "GNOME";
  app.modalConstants.race[7] = "TROLL";
  app.modalConstants.race[8] = "GOBLIN (NOT USED)";
  app.modalConstants.race[9] = "BLOODELF";
  app.modalConstants.race[10] = "DRAENEI";
  app.modalConstants.race[11] = "FEL_ORC (NOT USED)";
  app.modalConstants.race[12] = "NAGA (NOT USED)";
  app.modalConstants.race[13] = "BROKEN (NOT USED)";
  app.modalConstants.race[14] = "SKELETON (NOT USED)";
  app.modalConstants.race[15] = "VRYKUL (NOT USED)";
  app.modalConstants.race[16] = "TUSKARR (NOT USED)";
  app.modalConstants.race[17] = "FOREST_TROLL (NOT USED)";
  app.modalConstants.race[18] = "TAUNKA (NOT USED)";
  app.modalConstants.race[19] = "NORTHREND_SKELETON (NOT USED)";
  app.modalConstants.race[20] = "ICE_TROLL (NOT USED)";

  /* creature classes constants */
  app.modalConstants.classes = [];
  app.modalConstants.classes[0] = "WARRIOR";
  app.modalConstants.classes[1] = "PALADIN";
  app.modalConstants.classes[2] = "HUNTER";
  app.modalConstants.classes[3] = "ROGUE";
  app.modalConstants.classes[4] = "PRIEST";
  app.modalConstants.classes[5] = "DEATH_KNIGHT ";
  app.modalConstants.classes[6] = "SHAMAN";
  app.modalConstants.classes[7] = "MAGE";
  app.modalConstants.classes[8] = "WARLOCK";
  app.modalConstants.classes[9] = "UNK";
  app.modalConstants.classes[10] = "DRUID";

  /* item classes constants */
  app.modalConstants.item_class = [];
  app.modalConstants.item_class[0] = "Consumable";
  app.modalConstants.item_class[1] = "Container";
  app.modalConstants.item_class[2] = "Weapon";
  app.modalConstants.item_class[3] = "Gem";
  app.modalConstants.item_class[4] = "Armor";
  app.modalConstants.item_class[5] = "Reagent";
  app.modalConstants.item_class[6] = "Projectile";
  app.modalConstants.item_class[7] = "Trade Goods";
  app.modalConstants.item_class[8] = "Generic (OBSOLETE)";
  app.modalConstants.item_class[9] = "Recipe";
  app.modalConstants.item_class[10] = "Money (OBSOLETE)";
  app.modalConstants.item_class[11] = "Quiver";
  app.modalConstants.item_class[12] = "Quest";
  app.modalConstants.item_class[13] = "Key";
  app.modalConstants.item_class[14] = "Permanent (OBSOLETE)";
  app.modalConstants.item_class[15] = "Miscellaneous";
  app.modalConstants.item_class[16] = "Glyph";

  /* InventorType constants */
  app.modalConstants.InventorType = [];
  app.modalConstants.InventorType[0] = "Non equipable";
  app.modalConstants.InventorType[1] = "Head";
  app.modalConstants.InventorType[2] = "Neck";
  app.modalConstants.InventorType[3] = "Shoulder";
  app.modalConstants.InventorType[4] = "Body (Shirt)";
  app.modalConstants.InventorType[5] = "Chest";
  app.modalConstants.InventorType[6] = "Waist (Belt)";
  app.modalConstants.InventorType[7] = "Legs (Pants)";
  app.modalConstants.InventorType[8] = "Feet (Boots)";
  app.modalConstants.InventorType[9] = "Wrists (Bracers)";
  app.modalConstants.InventorType[10] = "Hands (Gloves)";
  app.modalConstants.InventorType[11] = "Finger (Ring)";
  app.modalConstants.InventorType[12] = "Trinket";
  app.modalConstants.InventorType[13] = "WEAPON One Hand";
  app.modalConstants.InventorType[14] = "WEAPON Off Hand/SHIELD";
  app.modalConstants.InventorType[15] = "Ranged (Bows)";
  app.modalConstants.InventorType[16] = "Cloak (Back)";
  app.modalConstants.InventorType[17] = "2HWEAPON Two-Hand";
  app.modalConstants.InventorType[18] = "Bag (incl. Quivers)";
  app.modalConstants.InventorType[19] = "Tabard";
  app.modalConstants.InventorType[20] = "Robe";
  app.modalConstants.InventorType[21] = "Main Hand";
  app.modalConstants.InventorType[22] = "Off Hand (Misc Items)";
  app.modalConstants.InventorType[23] = "Holdable (Tome)";
  app.modalConstants.InventorType[24] = "Ammunition";
  app.modalConstants.InventorType[25] = "Thrown";
  app.modalConstants.InventorType[26] = "Ranged Right (Gun)";
  app.modalConstants.InventorType[27] = "Quiver";
  app.modalConstants.InventorType[28] = "Relic";

}());
