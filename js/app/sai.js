/*jslint browser: true, white: true, plusplus: true */
/*global angular, console, alert*/

(function () {
  'use strict';

  var app = angular.module('keira2');

  app.controller("SmartAIController", function ($scope, $http, $stateParams, $modal) {

    /* read ONLY values, do NOT bind them with ng-model in the view */
    $scope.sourceType = $stateParams.sourceType;
    $scope.entryOrGuid = $stateParams.sourceType;

    /* All SAI tabs, disabled by default.
    *  Only one tab can be active at a time */
    $scope.saiTabs = {
      search : false,
      editor : false,
      script : false
    };

    /* source_type constants */
    $scope.sourceTypesConst = {
      CREATURE          : 0, 0 : "Creature",
      GAMEOBJECT        : 1, 1 : "GameObject",
      AREATRIGGER       : 2, 2 : "AreaTrigger",
      EVENT             : 3, 3 : "Event",
      GOSSIP            : 4, 4 : "Gossip",
      QUEST             : 5, 5 : "Quest",
      SPELL             : 6, 6 : "Spell",
      TRANSPORT         : 7, 7 : "Transport",
      INSTANCE          : 8, 8 : "Instance",
      TIMED_ACTIONLIST  : 9, 9 : "Timed Actionlist"
    };

    /* Init objects */
    $scope.event_type = {};

    /* Init arrays */
    $scope.smart_scripts  = [];
    $scope.event_type.param1 = ["InitialMin", "InitialMin", "HPMin%", "ManaMin%", "", "CooldownMin", "", "", "SpellID", "MinDist", "NoHostile", "type", "HPMin%", "RepeatMin", "HPDeficit", "Radius", "SpellId", "CretureId (0 all)", "ManaMin%", "QuestID (0 any)", "QuestID (0 any)", "", "EmoteId", "SpellID", "SpellID", "", "NoHostile", "CooldownMin", "CooldownMin", "", "", "SpellId", "MinDmg", "MinDmg", "MovementType (any)", "Entry", "", "", "Field", "PointId (0 any)", "PointId (0 any)", "", "Entry (0 any)", "", "PointId", "Team (0 any)", "TriggerId (0 any)", "", "", "", "", "", "GroupId (from creatue_text)", "MinHeal", "", "PointId (0 any)", "PointId (0 any)", "PointId (0 any)", "PointId (0 any)", "Id", "InitialMin", "", "menu_ID", "", "", "", "spellId", "CooldownMin", "game_event.eventEntry", "game_event.eventEntry", "State (0 - Active, 1 - Ready, 2 - Active alternative)", "EventId", "EventId", "", "minHpPct", "database guid", "database guid", "counterID"];
    $scope.event_type.param2 = ["InitialMax", "InitialMax", "HPMax%", "ManaMax%", "", "CooldownMax", "", "", "School", "MaxDist", "MaxRange", "MapId", "HPMax%", "RepeatMax", "Radius", "RepeatMin", "Radius", "CooldownMin", "ManaMax%", "", "", "", "CooldownMin", "Stacks", "Stacks", "", "MaxRange", "CooldownMax", "CooldownMax", "", "", "School", "MaxDmg", "MaxDmg", "PointID", "CooldownMin", "", "", "Value", "pathId (0 any)", "pathId (0 any)", "", "", "", "", "CooldownMin", "", "", "", "", "", "", "CreatureId (0 any)", "MaxHeal", "", "pathID (0 any)", "pathID (0 any)", "pathID (0 any)", "pathID (0 any)", "", "InitialMax", "", "ID", "", "", "", "effectIndex", "CooldownMax", "", "", "", "", "", "", "maxHpPct", "database entry", "database entry", "value"];
    $scope.event_type.param3 = ["RepeatMin", "RepeatMin", "RepeatMin", "RepeatMin", "", "Player only (0/1)", "", "", "CooldownMin", "RepeatMin", "CooldownMin", "ZoneId", "RepeatMin", "Spell id (0 any)", "RepeatMin", "RepeatMax", "RepeatMin", "CooldownMax", "RepeatMin", "", "", "", "CooldownMax", "RepeatMin", "RepeatMin", "", "CooldownMin", "", "", "", "", "RepeatMin", "RepeatMin", "RepeatMin", "", "CooldownMax", "", "", "CooldownMin", "", "", "", "", "", "", "CooldownMax", "", "", "", "", "", "", "", "CooldownMin", "", "", "", "", "", "", "RepeatMin", "", "", "", "", "", "", "", "", "", "", "", "", "", "repeatMin", "distance", "distance", "cooldownMin"];
    $scope.event_type.param4 = ["RepeatMax", "RepeatMax", "RepeatMax", "RepeatMax", "", "Creature entry (if param3 is 0)", "", "", "CooldownMax", "RepeatMax", "CooldownMax", "", "RepeatMax", "", "RepeatMax", "", "RepeatMax", "", "RepeatMax", "", "", "", "condition", "RepeatMax", "RepeatMax", "", "CooldownMax", "", "", "", "", "RepeatMax", "RepeatMax", "RepeatMax", "", "", "", "", "CooldownMax", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "CooldownMax", "", "", "", "", "", "", "RepeatMax", "", "", "", "", "", "", "", "", "", "", "", "", "", "repeatMax", "repeat interval (ms)", "repeat interval (ms)", "cooldownMax"];

    $scope.action_type = {};
    $scope.action_type.param1 = ["", "Creature_text.groupid", "FactionID (or 0 for default)", "Creature_template.entry(param1)", "SoundId", "EmoteId", "QuestID", "QuestID", "State", "", "EmoteId1", "SpellId", "Creature_template.entry", "Threat% inc", "Threat% inc", "QuestID", "", "EmoteId", "(may be more than one field OR'd together)", "(may be more than one field OR'd together)", "AllowAttackState (0 = Stop attack, anything else means continue attacking)", "AllowCombatMovement (0 = Stop combat based movement, anything else continue attacking)", "smart_scripts.event_phase_mask", "Increment", "", "0/1 (If you want the fleeing NPC to say attempts to flee text on flee, use 1 on param1. For no message use 0.)", "QuestID", "Creature_template.entry", "Spellid", "Distance (0 = Default value)", "smart_scripts.event_phase_mask1", "smart_scripts.event_phase_mask minimum", "", "Creature_template.entry", "Field", "Field", "Creature_template.entry", "", "", "Radius in yards that other creatures must be to acknowledge the cry for help.", "Sheath (0-unarmed, 1-melee, 2-ranged)", "timer", "flat hp value", "Creature_template.entry", "Creature.phasemask", "Field", "Distance in yards", "0/1", "", "", "Gameobject_template.entry", "", "TaxiID", "walk = 0 run = 1", "time (in ms)", "despawnTime", "Item_template.entry", "Item_template.entry", "TemplateID", "0 = Off / 1 = On", "0 = On / 1 = Off", "0 = Off / 1 = On", "MapID", "counterID", "varID", "", "This depends on whet target script have if SMART_TARGET_SELF than Facing will be set like in HomePosition, When SMART_TARGET_POSITION you need to set target_o. 0 = North, West = 1.5, South = 3, East = 4.5", "id", "entry", "PointId", "Respawntime in seconds for gameobjects (parameter for gameobjects only)", "Creature_equip_template.entry", "", "id(>1)", "id(>1)", "SpellId", "", "", "", "attackDistance", "EntryOrGuid", "Creature_template.npcflag", "Creature_template.npcflag", "Creature_template.npcflag", "Creature_text.groupID", "SpellID", "SpellID", "EntryOrGuid 1", "EntryOrGuid 1", "Radius", "Value", "Value", "With delay (0/1)", "animprogress (0-255)", "dynamicflag.", "dynamicflags", "dynamicflags", "Speed XY", "Gossip_menu_option.menuId", "LootState (0 - Not ready, 1 - Ready, 2 - Activated, 3 - Just deactivated)", "Id", "", "0/1", "0/1", "gameobject_template.flags", "gameobject_template.flags", "gameobject_template.flags", "creature_summon_groups.groupId", "Power type", "Power type", "Power type", "wp1"];
    $scope.action_type.param2 = ["", "Duration to wait before TEXT_OVER event is triggered.", "", "Creature_template.modelID(param2)", "onlySelf", "", "", "", "", "", "EmoteId2", "Cast Flags", "Summon type", "Threat% dec", "Threat% dec", "", "", "", "type If false set Creature_template.unit_flags If true set Creature_template.unit_flags2", "type If false set Creature_template.unit_flags If true set Creature_template.unit_flags2", "", "", "", "Decrement", "", "", "", "SpellId", "", "Angle (0 = Default value)", "smart_scripts.event_phase_mask2", "smart_scripts.event_phase_mask maximum", "", "", "Data", "", "Team (updates creature_template to given entry)", "", "", "0/1 (say calls for help text)", "", "", "percent hp value", "Creature_template.modelID", "", "Data", "", "", "", "", "De-spawn time in seconds.", "", "", "Waypoints.entry", "", "Quest_template.id", "count", "count", "", "", "", "", "", "value", "", "", "", "InitialMin", "", "", "", "Slotmask", "", "", "", "", "", "", "", "attackAngle", "timer update type(0 OOC, 1 IC, 2 ALWAYS)", "", "", "", "", "castFlags", "castFlags", "EntryOrGuid 2", "EntryOrGuid 2", "", "Type", "Type", "SpellId", "", "", "", "", "Speed Z", "Gossip_menu_option.npc_text_id", "", "", "", "", "", "", "", "", "Attack invoker (0/1)", "New power", "Power to add", "Power to remove", "wp2"];
    $scope.action_type.param3 = ["", "", "", "", "", "", "", "", "", "", "EmoteId3...", "", "duration in ms", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "End creature_template.entry", "smart_scripts.event_phase_mask 3", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "canRepeat", "", "fail (0/1)", "", "", "", "", "", "", "", "reset (0/1)", "", "", "", "InitialMax", "", "", "", "slot1 (item_template.entry)", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "CasterTargetType (caster is selected here, use it as target_type)", "EntryOrGuid 3", "", "", "", "", "Instant (0/1)", "", "", "", "", "Target X", "", "", "", "", "", "", "", "", "", "", "", "", "", "wp3"];
    $scope.action_type.param4 = ["", "", "", "", "", "", "", "", "", "", "", "", "attackInvoker", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "credit", "smart_scripts.event_phase_mask 4", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "Quest_template.id", "", "", "", "", "", "", "", "", "", "", "", "", "", "RepeatMin(only if it repeats)", "", "", "", "Slot2 (item_template.entry)", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "CasterTarget (target_param1)", "EntryOrGuid 4", "", "", "", "", "", "", "", "", "", "Target Y", "", "", "", "", "", "", "", "", "", "", "", "", "", "wp4"];
    $scope.action_type.param5 = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "creditType (0monsterkill, 1event)", "smart_scripts.event_phase_mask 5", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "despawntime", "", "", "", "", "", "", "", "", "", "", "", "", "", "RepeatMax(only if it repeats)", "", "", "", "Slot3 (item_template.entry)", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "CasterTarget (target_param2)", "EntryOrGuid 5", "", "", "", "", "", "", "", "", "", "Target Z", "", "", "", "", "", "", "", "", "", "", "", "", "", "wp5"];
    $scope.action_type.param6 = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "smart_scripts.event_phase_mask6", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "reactState", "", "", "", "", "", "", "", "", "", "", "", "", "", "chance", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "CasterTarget (target_param3)", "EntryOrGuid 6", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "wp6"];

    $scope.target_type = {};
    $scope.target_type.param1 = ["", "", "", "", "", "", "", "", "", "creatureEntry (0 any)", "guid", "creatureEntry (0 any)", "id", "goEntry (0 any)", "guid", "goEntry (0 any)", "", "minDist", "maxDist", "creatureEntry (0 any)", "goEntry (0 any)", "maxDist", "", "", "", "maxDist", "maxDist"];
    $scope.target_type.param2 = ["", "", "", "", "", "", "", "", "", "minDist", "entry", "maxDist", "", "minDist", "entry", "maxDist", "", "maxDist", "", "maxDist (Can be from 0-100 yards)", "maxDist (Can be from 0-100 yards)", "", "", "", "", "playerOnly (0/1)", "playerOnly (0/1)"];
    $scope.target_type.param3 = ["", "", "", "", "", "", "", "", "", "maxDist", "", "", "", "maxDist", "", "", "", "", "", "dead? (0/1)", "", "", "", "", "", "", ""];

    /* Check if an entity (smart_scripts.source_type AND smart_scripts.entryorguid) is selected */
    if ($stateParams.sourceType && $stateParams.entryOrGuid) {

      /* We have a creature selected and default active tab is creatureTemplate */
      $scope.isEntitySelected = true;
      $scope.saiTabs.editor = true;

      /*  Following lines retrieve all SAI datas
       *  current_* mantains the database state
       *  new_*     mantains the editor state
       *  we will use those two objects to generate the SQL queries
       */

      /* Retrieve all smart_scripts datas */
      $http.get( app.api + "smart_scripts/" + $stateParams.sourceType + "/" + $stateParams.entryOrGuid )
        .success(function (data, status, header, config) {
        $scope.current_smart_scripts = data;
        $scope.new_smart_scripts = angular.copy($scope.current_smart_scripts);

        // check if we are editing an existing SAI script or creating a new one
        if ($scope.current_smart_scripts.length > 0) {

          // editing existing SAI script
          $scope.selectionText = "Editing the SmartAI script of [" +  $scope.sourceTypesConst[$stateParams.sourceType] + "] " + $stateParams.entryOrGuid;

        } else {

          // creating new SAI script
          $scope.selectionText = "Creating a new SmartAI script for [" +  $scope.sourceTypesConst[$stateParams.sourceType] + "] " + $stateParams.entryOrGuid;

        }
      })
        .error(function (data, status, header, config) {
        console.log("[ERROR] smart_scripts/" + $stateParams.sourceType + "/" + $stateParams.entryOrGuid + " $http.get request failed");
      });

    } else {
      /* We have no creature selected and default active tab is search */
      $scope.isEntitySelected = false;
      $scope.saiTabs.search = true;
      $scope.selectionText = "No entity selected. Please use Search to select one.";
    }

    /* [Function] Search */
    $scope.search = function (sourceType, entryOrGuid) {

      // TODO: search among not-yet-scripted entities

      if (entryOrGuid && !sourceType && entryOrGuid.length < 2) {
        alert("Please insert an Entry or GUID of at least 2 digits or specific the Source Type");
        return;
      }

      $http.get( app.api + "/search/smart_scripts/", {
        params: {
          source_type: sourceType,
          entryorguid: entryOrGuid
        }
      }).success(function (data, status, header, config) {
        $scope.scripts = data;
      })
        .error(function (data, status, header, config) {
        console.log("[ERROR] SMART SCRIPTS SEARCH $http.get request failed");
      });

    };

    /* [Function] Open SQL SAI Script tab */
    $scope.openScriptTab = function() {
      $scope.generateSAIScript();
      $scope.saiTabs.search = false;
      $scope.saiTabs.editor = false;
      $scope.saiTabs.script = true;
    };

    /* [Function] Generate SQL SAI Script */
    $scope.generateSAIScript = function() {

      if (!$scope.isEntitySelected) {
        $scope.SAIScript = "# No entity selected";
        return;
      }

      // TODO: generate sql full script
    };

    /* [Function] disactive all tabs */
    $scope.disactiveAllTabs = function() {
      angular.forEach($scope.saiTabs, function(value, key) {
        value = false;
      });
    };

    /* [Function] open SQL Script tab */
    $scope.openScriptTab = function() {
      $scope.disactiveAllTabs();
      $scope.generateSAIScript();
      $scope.saiTabs.script = true;
    };

  });

}());
