/*jslint browser: true, eqeq: true, white: true, plusplus: true */
/*global angular, console, alert*/

(function () {
  'use strict';

  var app = angular.module('keira2');

  app.controller("SmartAIEditorController", function ($scope, $rootScope, $stateParams) {

    /* At start we have no row selected */
    $scope.selectedRow = -1;

    /* Show only basic informations */
    $scope.showBasicInformations = true;

    /* Default new row */
    $scope.defaultNewRow = {
      entryorguid       : parseInt($stateParams.entryOrGuid, 10),
      source_type       : parseInt($stateParams.sourceType, 10),
      id                : 0,
      link              : 0,
      event_type        : 0,
      event_phase_mask  : 0,
      event_chance      : 100,
      event_flags       : 0,
      event_param1      : 0,
      event_param2      : 0,
      event_param3      : 0,
      event_param4      : 0,
      action_type       : 0,
      action_param1     : 0,
      action_param2     : 0,
      action_param3     : 0,
      action_param4     : 0,
      action_param5     : 0,
      action_param6     : 0,
      target_type       : 0,
      target_param1     : 0,
      target_param2     : 0,
      target_param3     : 0,
      target_x          : 0.0,
      target_y          : 0.0,
      target_z          : 0.0,
      target_o          : 0.0,
      comment           : ''
    };

    /* Type check */
    $scope.parseValues = function() {

      $scope.selected.id                = parseInt($scope.selected.id, 10);
      $scope.selected.link              = parseInt($scope.selected.link, 10);
      $scope.selected.event_type        = parseInt($scope.selected.event_type, 10);
      $scope.selected.event_phase_mask  = parseInt($scope.selected.event_phase_mask, 10);
      $scope.selected.event_chance      = parseInt($scope.selected.event_chance, 10);
      $scope.selected.event_flags       = parseInt($scope.selected.event_flags, 10);
      $scope.selected.event_param1      = parseInt($scope.selected.event_param1, 10);
      $scope.selected.event_param2      = parseInt($scope.selected.event_param2, 10);
      $scope.selected.event_param3      = parseInt($scope.selected.event_param3, 10);
      $scope.selected.event_param4      = parseInt($scope.selected.event_param4, 10);
      $scope.selected.action_type       = parseInt($scope.selected.action_type, 10);
      $scope.selected.action_param1     = parseInt($scope.selected.action_param1, 10);
      $scope.selected.action_param2     = parseInt($scope.selected.action_param2, 10);
      $scope.selected.action_param3     = parseInt($scope.selected.action_param3, 10);
      $scope.selected.action_param4     = parseInt($scope.selected.action_param4, 10);
      $scope.selected.action_param5     = parseInt($scope.selected.action_param5, 10);
      $scope.selected.action_param6     = parseInt($scope.selected.action_param6, 10);
      $scope.selected.target_type       = parseInt($scope.selected.target_type, 10);
      $scope.selected.target_param1     = parseInt($scope.selected.target_param1, 10);
      $scope.selected.target_param2     = parseInt($scope.selected.target_param2, 10);
      $scope.selected.target_param3     = parseInt($scope.selected.target_param3, 10);
      $scope.selected.target_x          = parseFloat($scope.selected.target_x, 10);
      $scope.selected.target_y          = parseFloat($scope.selected.target_y, 10);
      $scope.selected.target_z          = parseFloat($scope.selected.target_z, 10);
      $scope.selected.target_o          = parseFloat($scope.selected.target_o, 10);
    };

    /* Select and edit a row from collection */
    $scope.selectRow = function(rows, index) {
      $scope.selectedRow = index;
      $scope.selected = rows[index];
    };

    /* Delete selected row from collection */
    $scope.deleteSelectedRowFrom = function(rows) {
      if (!$rootScope.isEntrySelected() || $scope.selectedRow == -1) { return; }

      rows.splice($scope.selectedRow, 1);

      if ($scope.selectedRow == 0) {
        if (rows.length > 0) {
          $scope.selectRow(rows, $scope.selectedRow);
        } else {
          $scope.selectedRow = -1;
        }
      } else {
        $scope.selectRow(rows, $scope.selectedRow - 1);
      }
    };

    /* Add a new row to collection */
    $scope.addNewRow = function(rows) {

      if (!$rootScope.isEntrySelected()) { return; }

      var newRow = angular.copy($scope.defaultNewRow);
      newRow.id = rows.length;

      rows.splice(rows.length, 0, angular.copy(newRow));
    };
/* Init view label container objects */
    $scope.event_type = {};
    $scope.action_type = {};
    $scope.target_type = {};

    /* View label values (placed at the end of file to preserve order) */
    $scope.event_type.param1 = ["InitialMin", "InitialMin", "HPMin%", "ManaMin%", "", "CooldownMin", "", "", "SpellID", "MinDist", "NoHostile", "type", "HPMin%", "RepeatMin", "HPDeficit", "Radius", "SpellId", "CretureId (0 all)", "ManaMin%", "QuestID (0 any)", "QuestID (0 any)", "", "EmoteId", "SpellID", "SpellID", "", "NoHostile", "CooldownMin", "CooldownMin", "", "", "SpellId", "MinDmg", "MinDmg", "MovementType (any)", "Entry", "", "", "Field", "PointId (0 any)", "PointId (0 any)", "", "Entry (0 any)", "", "PointId", "Team (0 any)", "TriggerId (0 any)", "", "", "", "", "", "GroupId (from creatue_text)", "MinHeal", "", "PointId (0 any)", "PointId (0 any)", "PointId (0 any)", "PointId (0 any)", "Id", "InitialMin", "", "menu_ID", "", "", "", "spellId", "CooldownMin", "game_event.eventEntry", "game_event.eventEntry", "State (0 - Active, 1 - Ready, 2 - Active alternative)", "EventId", "EventId", "", "minHpPct", "database guid", "database guid", "counterID"];
    $scope.event_type.param2 = ["InitialMax", "InitialMax", "HPMax%", "ManaMax%", "", "CooldownMax", "", "", "School", "MaxDist", "MaxRange", "MapId", "HPMax%", "RepeatMax", "Radius", "RepeatMin", "Radius", "CooldownMin", "ManaMax%", "", "", "", "CooldownMin", "Stacks", "Stacks", "", "MaxRange", "CooldownMax", "CooldownMax", "", "", "School", "MaxDmg", "MaxDmg", "PointID", "CooldownMin", "", "", "Value", "pathId (0 any)", "pathId (0 any)", "", "", "", "", "CooldownMin", "", "", "", "", "", "", "CreatureId (0 any)", "MaxHeal", "", "pathID (0 any)", "pathID (0 any)", "pathID (0 any)", "pathID (0 any)", "", "InitialMax", "", "ID", "", "", "", "effectIndex", "CooldownMax", "", "", "", "", "", "", "maxHpPct", "database entry", "database entry", "value"];
    $scope.event_type.param3 = ["RepeatMin", "RepeatMin", "RepeatMin", "RepeatMin", "", "Player only (0/1)", "", "", "CooldownMin", "RepeatMin", "CooldownMin", "ZoneId", "RepeatMin", "Spell id (0 any)", "RepeatMin", "RepeatMax", "RepeatMin", "CooldownMax", "RepeatMin", "", "", "", "CooldownMax", "RepeatMin", "RepeatMin", "", "CooldownMin", "", "", "", "", "RepeatMin", "RepeatMin", "RepeatMin", "", "CooldownMax", "", "", "CooldownMin", "", "", "", "", "", "", "CooldownMax", "", "", "", "", "", "", "", "CooldownMin", "", "", "", "", "", "", "RepeatMin", "", "", "", "", "", "", "", "", "", "", "", "", "", "repeatMin", "distance", "distance", "cooldownMin"];
    $scope.event_type.param4 = ["RepeatMax", "RepeatMax", "RepeatMax", "RepeatMax", "", "Creature entry (if param3 is 0)", "", "", "CooldownMax", "RepeatMax", "CooldownMax", "", "RepeatMax", "", "RepeatMax", "", "RepeatMax", "", "RepeatMax", "", "", "", "condition", "RepeatMax", "RepeatMax", "", "CooldownMax", "", "", "", "", "RepeatMax", "RepeatMax", "RepeatMax", "", "", "", "", "CooldownMax", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "CooldownMax", "", "", "", "", "", "", "RepeatMax", "", "", "", "", "", "", "", "", "", "", "", "", "", "repeatMax", "repeat interval (ms)", "repeat interval (ms)", "cooldownMax"];

    $scope.action_type.param1 = ["", "Creature_text.groupid", "FactionID (or 0 for default)", "Creature_template.entry(param1)", "SoundId", "EmoteId", "QuestID", "QuestID", "State", "", "EmoteId1", "SpellId", "Creature_template.entry", "Threat% inc", "Threat% inc", "QuestID", "", "EmoteId", "(may be more than one field OR'd together)", "(may be more than one field OR'd together)", "AllowAttackState (0 = Stop attack, anything else means continue attacking)", "AllowCombatMovement (0 = Stop combat based movement, anything else continue attacking)", "smart_scripts.event_phase_mask", "Increment", "", "0/1 (If you want the fleeing NPC to say attempts to flee text on flee, use 1 on param1. For no message use 0.)", "QuestID", "Creature_template.entry", "Spellid", "Distance (0 = Default value)", "smart_scripts.event_phase_mask1", "smart_scripts.event_phase_mask minimum", "", "Creature_template.entry", "Field", "Field", "Creature_template.entry", "", "", "Radius in yards that other creatures must be to acknowledge the cry for help.", "Sheath (0-unarmed, 1-melee, 2-ranged)", "timer", "flat hp value", "Creature_template.entry", "Creature.phasemask", "Field", "Distance in yards", "0/1", "", "", "Gameobject_template.entry", "", "TaxiID", "walk = 0 run = 1", "time (in ms)", "despawnTime", "Item_template.entry", "Item_template.entry", "TemplateID", "0 = Off / 1 = On", "0 = On / 1 = Off", "0 = Off / 1 = On", "MapID", "counterID", "varID", "", "This depends on whet target script have if SMART_TARGET_SELF than Facing will be set like in HomePosition, When SMART_TARGET_POSITION you need to set target_o. 0 = North, West = 1.5, South = 3, East = 4.5", "id", "entry", "PointId", "Respawntime in seconds for gameobjects (parameter for gameobjects only)", "Creature_equip_template.entry", "", "id(>1)", "id(>1)", "SpellId", "", "", "", "attackDistance", "EntryOrGuid", "Creature_template.npcflag", "Creature_template.npcflag", "Creature_template.npcflag", "Creature_text.groupID", "SpellID", "SpellID", "EntryOrGuid 1", "EntryOrGuid 1", "Radius", "Value", "Value", "With delay (0/1)", "animprogress (0-255)", "dynamicflag.", "dynamicflags", "dynamicflags", "Speed XY", "Gossip_menu_option.menuId", "LootState (0 - Not ready, 1 - Ready, 2 - Activated, 3 - Just deactivated)", "Id", "", "0/1", "0/1", "gameobject_template.flags", "gameobject_template.flags", "gameobject_template.flags", "creature_summon_groups.groupId", "Power type", "Power type", "Power type", "wp1"];
    $scope.action_type.param2 = ["", "Duration to wait before TEXT_OVER event is triggered.", "", "Creature_template.modelID(param2)", "onlySelf", "", "", "", "", "", "EmoteId2", "Cast Flags", "Summon type", "Threat% dec", "Threat% dec", "", "", "", "type If false set Creature_template.unit_flags If true set Creature_template.unit_flags2", "type If false set Creature_template.unit_flags If true set Creature_template.unit_flags2", "", "", "", "Decrement", "", "", "", "SpellId", "", "Angle (0 = Default value)", "smart_scripts.event_phase_mask2", "smart_scripts.event_phase_mask maximum", "", "", "Data", "", "Team (updates creature_template to given entry)", "", "", "0/1 (say calls for help text)", "", "", "percent hp value", "Creature_template.modelID", "", "Data", "", "", "", "", "De-spawn time in seconds.", "", "", "Waypoints.entry", "", "Quest_template.id", "count", "count", "", "", "", "", "", "value", "", "", "", "InitialMin", "", "", "", "Slotmask", "", "", "", "", "", "", "", "attackAngle", "timer update type(0 OOC, 1 IC, 2 ALWAYS)", "", "", "", "", "castFlags", "castFlags", "EntryOrGuid 2", "EntryOrGuid 2", "", "Type", "Type", "SpellId", "", "", "", "", "Speed Z", "Gossip_menu_option.npc_text_id", "", "", "", "", "", "", "", "", "Attack invoker (0/1)", "New power", "Power to add", "Power to remove", "wp2"];
    $scope.action_type.param3 = ["", "", "", "", "", "", "", "", "", "", "EmoteId3...", "", "duration in ms", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "End creature_template.entry", "smart_scripts.event_phase_mask 3", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "canRepeat", "", "fail (0/1)", "", "", "", "", "", "", "", "reset (0/1)", "", "", "", "InitialMax", "", "", "", "slot1 (item_template.entry)", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "CasterTargetType (caster is selected here, use it as target_type)", "EntryOrGuid 3", "", "", "", "", "Instant (0/1)", "", "", "", "", "Target X", "", "", "", "", "", "", "", "", "", "", "", "", "", "wp3"];
    $scope.action_type.param4 = ["", "", "", "", "", "", "", "", "", "", "", "", "attackInvoker", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "credit", "smart_scripts.event_phase_mask 4", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "Quest_template.id", "", "", "", "", "", "", "", "", "", "", "", "", "", "RepeatMin(only if it repeats)", "", "", "", "Slot2 (item_template.entry)", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "CasterTarget (target_param1)", "EntryOrGuid 4", "", "", "", "", "", "", "", "", "", "Target Y", "", "", "", "", "", "", "", "", "", "", "", "", "", "wp4"];
    $scope.action_type.param5 = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "creditType (0monsterkill, 1event)", "smart_scripts.event_phase_mask 5", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "despawntime", "", "", "", "", "", "", "", "", "", "", "", "", "", "RepeatMax(only if it repeats)", "", "", "", "Slot3 (item_template.entry)", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "CasterTarget (target_param2)", "EntryOrGuid 5", "", "", "", "", "", "", "", "", "", "Target Z", "", "", "", "", "", "", "", "", "", "", "", "", "", "wp5"];
    $scope.action_type.param6 = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "smart_scripts.event_phase_mask6", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "reactState", "", "", "", "", "", "", "", "", "", "", "", "", "", "chance", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "CasterTarget (target_param3)", "EntryOrGuid 6", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "wp6"];

    $scope.target_type.param1 = ["", "", "", "", "", "", "", "", "", "creatureEntry (0 any)", "guid", "creatureEntry (0 any)", "id", "goEntry (0 any)", "guid", "goEntry (0 any)", "", "minDist", "maxDist", "creatureEntry (0 any)", "goEntry (0 any)", "maxDist", "", "", "", "maxDist", "maxDist"];
    $scope.target_type.param2 = ["", "", "", "", "", "", "", "", "", "minDist", "entry", "maxDist", "", "minDist", "entry", "maxDist", "", "maxDist", "", "maxDist (Can be from 0-100 yards)", "maxDist (Can be from 0-100 yards)", "", "", "", "", "playerOnly (0/1)", "playerOnly (0/1)"];
    $scope.target_type.param3 = ["", "", "", "", "", "", "", "", "", "maxDist", "", "", "", "maxDist", "", "", "", "", "", "dead? (0/1)", "", "", "", "", "", "", ""];

  });

}());
