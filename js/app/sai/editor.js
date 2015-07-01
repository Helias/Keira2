/*jslint browser: true, eqeq: true, white: true, plusplus: true, bitwise: true */
/*global angular, console, alert*/

(function () {
  'use strict';

  var app = angular.module('keira2');

  app.controller("SmartAIEditorController", function ($scope, $rootScope, $stateParams) {

    /* At start we have no row selected */
    $scope.selectedRow = -1;

    /* Select the first row after a script is loaded */
    $scope.$on('saiLoaded', function(e) {
      $scope.selectedRow = 0;
      $scope.selected = $scope.new_smart_scripts[0];
    });

    /* Options */
    $scope.options = {
      showBasicInformations : true,
      lockIds : true
    };

    $scope.enlargeinfo = false;
    $scope.EnlargeSaiTable = function()
    {
      $scope.enlargeinfo = !($scope.enlargeinfo);
    };

    /* Labels */
    $scope.saiLabels = app.saiLabels;

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

    /* [Function] Select and edit a row from collection */
    $scope.selectRow = function(rows, index) {
      $scope.selectedRow = index;
      $scope.selected = rows[index];
    };

    /* [Function] Delete selected row from collection */
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

    /* [Function] Add a new row to collection */
    $scope.addNewRow = function(rows) {

      if (!$rootScope.isEntrySelected()) { return; }

      var newRow = angular.copy($scope.defaultNewRow);
      newRow.id = rows.length;

      rows.splice(rows.length, 0, angular.copy(newRow));
    };

    /* [Function] Get string by target_type */
    $scope.getStringByTargetType = function(smartScript) {

      switch (Number(smartScript.target_type)) {
        case app.saiConstants.target.SELF:
          return "Self";
        case app.saiConstants.target.VICTIM:
          return "Victim";
        case app.saiConstants.target.HOSTILE_SECOND_AGGRO:
          return "Second On Threatlist";
        case app.saiConstants.target.HOSTILE_LAST_AGGRO:
          return "Last On Threatlist";
        case app.saiConstants.target.HOSTILE_RANDOM:
          return "Random On Threatlist";
        case app.saiConstants.target.HOSTILE_RANDOM_NOT_TOP:
          return "Random On Threatlist Not Top";
        case app.saiConstants.target.ACTION_INVOKER:
          return "Invoker";
        case app.saiConstants.target.POSITION:
          return "Position";
        case app.saiConstants.target.CREATURE_RANGE:
        case app.saiConstants.target.CREATURE_DISTANCE:
        case app.saiConstants.target.CLOSEST_CREATURE:
          return "Closest Creature '" + app.synchGetCreatureNameById(smartScript.target_param1) + "'";
        case app.saiConstants.target.CREATURE_GUID:
          return "Closest Creature '" + app.synchGetCreatureNameByGuid(smartScript.target_param1) + "'";
        case app.saiConstants.target.GAMEOBJECT_RANGE:
        case app.saiConstants.target.GAMEOBJECT_DISTANCE:
        case app.saiConstants.target.CLOSEST_GAMEOBJECT:
          return "Closest Gameobject '" + app.synchGetGameObjectNameById(smartScript.target_param1) + "'";
        case app.saiConstants.target.GAMEOBJECT_GUID:
          return "Closest Gameobject '" + app.synchGetGameObjectNameByGuid(smartScript.target_param1) + "'";
        case app.saiConstants.target.INVOKER_PARTY:
          return "Invoker's Party";
        case app.saiConstants.target.PLAYER_RANGE:
        case app.saiConstants.target.PLAYER_DISTANCE:
        case app.saiConstants.target.CLOSEST_PLAYER:
          return "Closest Player";
        case app.saiConstants.target.ACTION_INVOKER_VEHICLE:
          return "Invoker's Vehicle";
        case app.saiConstants.target.OWNER_OR_SUMMONER:
          return "Owner Or Summoner";
        case app.saiConstants.target.THREAT_LIST:
          return "First Unit On Threatlist";
        case app.saiConstants.target.CLOSEST_ENEMY:
          return "Closest Enemy";
        case app.saiConstants.target.CLOSEST_FRIENDLY:
          return "Closest Friendly Unit";
        default:
          return "<unsupported target type>";

      }
    };

    /* [Function] Get previous script of links chain */
    $scope.getPreviousScriptLink = function(smartScript) {
      if (smartScript.id == 0) { return null; }
      var i;

      for (i = 0; i < $scope.new_smart_scripts.length; i++) {
        if ($scope.new_smart_scripts[i].link == smartScript.id) {

          // if previous is LINK, return previous of previous
          if ($scope.new_smart_scripts[i].event_type == app.saiConstants.event.LINK) {
            return $scope.getPreviousScriptLink($scope.new_smart_scripts[i]);
          } else {
            return $scope.new_smart_scripts[i];
          }
        }
      }
    };

    /* [Function] Generate Comments
     * inspired by: https://github.com/Discover-/SAI-Editor/blob/master/SAI-Editor/Classes/CommentGenerator.cs
     */
    $scope.generateComments = function() {

      var i, fullLine, smartScript, randomEmotes, smartScriptLink, event_phase_mask, event_flags,
          arrayOfSplitPhases, event_phase_mask2, log2, l2, power,
          commentUnitFlag, unitFlags,
          commentNpcFlag, npcFlags,
          commentGoFlag, goFlags,
          commentDynamicFlag, dynamicFlags;

      for (i = 0; i < $scope.new_smart_scripts.length; i++) {

        if ($scope.new_smart_scripts[i].comment == null || $scope.new_smart_scripts[i].comment == "") {

          smartScript = angular.copy($scope.new_smart_scripts[i]);
          smartScriptLink = $scope.getPreviousScriptLink(smartScript);
          fullLine = "";

          switch (Number($scope.sourceType)) {

            case 0: //! Creature
              fullLine += $scope.current_creature_template.name + " - ";
              fullLine += app.saiLabels.comment.event[smartScript.event_type];
              break;

            case 1: //! Gameobject
              fullLine += $scope.current_gameobject_template.name + " - ";
              fullLine += app.saiLabels.comment.event[smartScript.event_type];
              break;

            case 2: //! Areatrigger
              fullLine += "Areatrigger - ";

              switch (Number(smartScript.event_type)) {
                case app.saiConstants.event.AREATRIGGER_ONTRIGGER:
                case app.saiConstants.event.LINK:
                  fullLine += "On Trigger";
                  break;
                default:
                  fullLine += "INCORRECT EVENT TYPE";
                  break;
              }

              break;

            case 9: //! Actionlist
              // TODO: comment generation of actionlist scripts
              break;
          }

          if ((fullLine.indexOf("_previousLineComment_") > -1) && (smartScriptLink != null)) {

            fullLine = fullLine.replace("_previousLineComment_", app.saiLabels.comment.event[smartScriptLink.event_type]);
            smartScript.event_param1 = smartScriptLink.event_param1;
            smartScript.event_param2 = smartScriptLink.event_param2;
            smartScript.event_param3 = smartScriptLink.event_param3;
            smartScript.event_param4 = smartScriptLink.event_param4;
          }

          fullLine = fullLine.replace("_previousLineComment_", "MISSING LINK");

          fullLine = fullLine.replace("_eventParamOne_",   smartScript.event_param1);
          fullLine = fullLine.replace("_eventParamTwo_",   smartScript.event_param2);
          fullLine = fullLine.replace("_eventParamThree_", smartScript.event_param3);
          fullLine = fullLine.replace("_eventParamFour_",  smartScript.event_param4);

          if (fullLine.indexOf("_spellNameEventParamOne_") > -1) {
            fullLine = fullLine.replace("_spellNameEventParamOne_", app.synchGetSpellNameById(smartScript.event_param1));
          }
          if (fullLine.indexOf("_targetCastingSpellName_") > -1) {
            fullLine = fullLine.replace("_targetCastingSpellName_", app.synchGetSpellNameById(smartScript.event_param3));
          }
          if (fullLine.indexOf("_questNameEventParamOne_") > -1) {
            fullLine = fullLine.replace("_questNameEventParamOne_", app.synchGetQuestTitleById(smartScript.event_param1));
          }
          if (fullLine.indexOf("_hasAuraEventParamOne_") > -1) {
            fullLine = fullLine.replace("_hasAuraEventParamOne_",   app.synchGetSpellNameById(smartScript.event_param1));
          }

          //! Action type
          fullLine += " - " + app.saiLabels.comment.action[smartScript.action_type];

          fullLine = fullLine.replace("_actionParamOne_",   smartScript.action_param1);
          fullLine = fullLine.replace("_actionParamTwo_",   smartScript.action_param2);
          fullLine = fullLine.replace("_actionParamThree_", smartScript.action_param3);
          fullLine = fullLine.replace("_actionParamFour_",  smartScript.action_param4);
          fullLine = fullLine.replace("_actionParamFive_",  smartScript.action_param5);
          fullLine = fullLine.replace("_actionParamSix_",   smartScript.action_param6);

          if (fullLine.indexOf("_spellNameActionParamOne_") > -1) {
            fullLine = fullLine.replace("_spellNameActionParamOne_",   app.synchGetSpellNameById(smartScript.action_param1));
          }
          if (fullLine.indexOf("_spellNameActionParamTwo_") > -1) {
            fullLine = fullLine.replace("_spellNameActionParamTwo_",   app.synchGetSpellNameById(smartScript.action_param2));
          }
          if (fullLine.indexOf("_questNameActionParamOne_") > -1) {
            fullLine = fullLine.replace("_questNameActionParamOne_",   app.synchGetQuestTitleById(smartScript.action_param1));
          }
          if (fullLine.indexOf("_questNameCastCreatureOrGo_") > -1) {
            fullLine = fullLine.replace("_questNameCastCreatureOrGo_", app.synchGetQuestTitleByCriteriaFunc1(smartScript.action_param1, smartScript.action_param1, smartScript.action_param1, smartScript.action_param1, smartScript.action_param2));
          }
          if (fullLine.indexOf("_questNameKillCredit_") > -1) {
            fullLine = fullLine.replace("_questNameKillCredit_",       app.synchGetQuestTitleByCriteriaFunc2(smartScript.action_param1, smartScript.action_param1, smartScript.action_param1, smartScript.action_param1));
          }

          if (fullLine.indexOf("_reactStateParamOne_") > -1) {

            switch (Number(smartScript.action_param1)) {
              case 0:
                fullLine = fullLine.replace("_reactStateParamOne_", "Passive");
                break;
              case 1:
                fullLine = fullLine.replace("_reactStateParamOne_", "Defensive");
                break;
              case 2:
                fullLine = fullLine.replace("_reactStateParamOne_", "Aggressive");
                break;
              default:
                fullLine = fullLine.replace("_reactStateParamOne_", "<Unknown Reactstate>");
                break;
            }
          }

          if (fullLine.indexOf("_actionRandomParameters_") > -1) {

            randomEmotes = smartScript.action_param1 + ", " + smartScript.action_param2;

            if (smartScript.action_param3 > 0) {
              randomEmotes += ", " + smartScript.action_param3;
            }

            if (smartScript.action_param4 > 0) {
              randomEmotes += ", " + smartScript.action_param4;
            }

            if (smartScript.action_param5 > 0) {
              randomEmotes += ", " + smartScript.action_param5;
            }

            if (smartScript.action_param6 > 0) {
              randomEmotes += ", " + smartScript.action_param6;
            }

            fullLine = fullLine.replace("_actionRandomParameters_", randomEmotes);
          }

          if (fullLine.indexOf("_creatureNameActionParamOne_") > -1) {
            fullLine = fullLine.replace("_creatureNameActionParamOne_", app.synchGetCreatureNameById(smartScript.action_param1));
          }

          if (fullLine.indexOf("_getUnitFlags_") > -1) {

            commentUnitFlag = "";
            unitFlags = smartScript.action_param1;

            if ((unitFlags & app.constants.unitFlag.SERVER_CONTROLLED) != 0)  { commentUnitFlag += "Server Controlled & "; }
            if ((unitFlags & app.constants.unitFlag.NON_ATTACKABLE) != 0)     { commentUnitFlag += "Not Attackable & "; }
            if ((unitFlags & app.constants.unitFlag.DISABLE_MOVE) != 0)       { commentUnitFlag += "Disable Movement & "; }
            if ((unitFlags & app.constants.unitFlag.PVP_ATTACKABLE) != 0)     { commentUnitFlag += "PvP Attackable & "; }
            if ((unitFlags & app.constants.unitFlag.RENAME) != 0)             { commentUnitFlag += "Rename & "; }
            if ((unitFlags & app.constants.unitFlag.PREPARATION) != 0)        { commentUnitFlag += "Preparation & "; }
            if ((unitFlags & app.constants.unitFlag.NOT_ATTACKABLE_1) != 0)   { commentUnitFlag += "Not Attackable & "; }
            if ((unitFlags & app.constants.unitFlag.IMMUNE_TO_PC) != 0)       { commentUnitFlag += "Immune To Players & "; }
            if ((unitFlags & app.constants.unitFlag.IMMUNE_TO_NPC) != 0)      { commentUnitFlag += "Immune To NPC's & "; }
            if ((unitFlags & app.constants.unitFlag.LOOTING) != 0)            { commentUnitFlag += "Looting & "; }
            if ((unitFlags & app.constants.unitFlag.PET_IN_COMBAT) != 0)      { commentUnitFlag += "Pet In Combat & "; }
            if ((unitFlags & app.constants.unitFlag.PVP) != 0)                { commentUnitFlag += "PvP & "; }
            if ((unitFlags & app.constants.unitFlag.SILENCED) != 0)           { commentUnitFlag += "Silenced & "; }
            if ((unitFlags & app.constants.unitFlag.PACIFIED) != 0)           { commentUnitFlag += "Pacified & "; }
            if ((unitFlags & app.constants.unitFlag.STUNNED) != 0)            { commentUnitFlag += "Stunned & "; }
            if ((unitFlags & app.constants.unitFlag.IN_COMBAT) != 0)          { commentUnitFlag += "In Combat & "; }
            if ((unitFlags & app.constants.unitFlag.DISARMED) != 0)           { commentUnitFlag += "Disarmed & "; }
            if ((unitFlags & app.constants.unitFlag.CONFUSED) != 0)           { commentUnitFlag += "Confused & "; }
            if ((unitFlags & app.constants.unitFlag.FLEEING) != 0)            { commentUnitFlag += "Fleeing & "; }
            if ((unitFlags & app.constants.unitFlag.PLAYER_CONTROLLED) != 0)  { commentUnitFlag += "Player Controlled & "; }
            if ((unitFlags & app.constants.unitFlag.NOT_SELECTABLE) != 0)     { commentUnitFlag += "Not Selectable & "; }
            if ((unitFlags & app.constants.unitFlag.SKINNABLE) != 0)          { commentUnitFlag += "Skinnable & "; }
            if ((unitFlags & app.constants.unitFlag.MOUNT) != 0)              { commentUnitFlag += "Mounted & "; }
            if ((unitFlags & app.constants.unitFlag.SHEATHE) != 0)            { commentUnitFlag += "Sheathed & "; }

            if (commentUnitFlag.indexOf("&") > -1) {
              //! Trim last ' & ' from the comment..
              commentUnitFlag = commentUnitFlag.substring(0, commentUnitFlag.length - 3);

              fullLine = fullLine.replace("_getUnitFlags_", "s_getUnitFlags_");
            }

            fullLine = fullLine.replace("_getUnitFlags_", " " + commentUnitFlag);
          }

          if (fullLine.indexOf("_getNpcFlags_") > -1) {
            commentNpcFlag = "";
            npcFlags = smartScript.action_param1;

            if ((npcFlags & app.constants.npcFlag.NONE) != 0)               { commentNpcFlag += "None & "; }
            if ((npcFlags & app.constants.npcFlag.GOSSIP) != 0)             { commentNpcFlag += "Gossip & "; }
            if ((npcFlags & app.constants.npcFlag.QUESTGIVER) != 0)         { commentNpcFlag += "Questgiver & "; }
            if ((npcFlags & app.constants.npcFlag.UNK1) != 0)               { commentNpcFlag += "Unknown 1 & "; }
            if ((npcFlags & app.constants.npcFlag.UNK2) != 0)               { commentNpcFlag += "Unknown 2 & "; }
            if ((npcFlags & app.constants.npcFlag.TRAINER) != 0)            { commentNpcFlag += "Trainer & "; }
            if ((npcFlags & app.constants.npcFlag.TRAINER_CLASS) != 0)      { commentNpcFlag += "Class Trainer & "; }
            if ((npcFlags & app.constants.npcFlag.TRAINER_PROFESSION) != 0) { commentNpcFlag += "Profession Trainer & "; }
            if ((npcFlags & app.constants.npcFlag.VENDOR) != 0)             { commentNpcFlag += "Vendor & "; }
            if ((npcFlags & app.constants.npcFlag.VENDOR_AMMO) != 0)        { commentNpcFlag += "Ammo Vendor & "; }
            if ((npcFlags & app.constants.npcFlag.VENDOR_FOOD) != 0)        { commentNpcFlag += "Food Vendor & "; }
            if ((npcFlags & app.constants.npcFlag.VENDOR_POISON) != 0)      { commentNpcFlag += "Poison Vendor & "; }
            if ((npcFlags & app.constants.npcFlag.VENDOR_REAGENT) != 0)     { commentNpcFlag += "Reagent Vendor & "; }
            if ((npcFlags & app.constants.npcFlag.REPAIR) != 0)             { commentNpcFlag += "Repair Vendor & "; }
            if ((npcFlags & app.constants.npcFlag.FLIGHTMASTER) != 0)       { commentNpcFlag += "Flightmaster & "; }
            if ((npcFlags & app.constants.npcFlag.SPIRITHEALER) != 0)       { commentNpcFlag += "Spirithealer & "; }
            if ((npcFlags & app.constants.npcFlag.SPIRITGUIDE) != 0)        { commentNpcFlag += "Spiritguide & "; }
            if ((npcFlags & app.constants.npcFlag.INNKEEPER) != 0)          { commentNpcFlag += "Innkeeper & "; }
            if ((npcFlags & app.constants.npcFlag.BANKER) != 0)             { commentNpcFlag += "Banker & "; }
            if ((npcFlags & app.constants.npcFlag.PETITIONER) != 0)         { commentNpcFlag += "Petitioner & "; }
            if ((npcFlags & app.constants.npcFlag.TABARDDESIGNER) != 0)     { commentNpcFlag += "Tabard Designer & "; }
            if ((npcFlags & app.constants.npcFlag.BATTLEMASTER) != 0)       { commentNpcFlag += "Battlemaster & "; }
            if ((npcFlags & app.constants.npcFlag.AUCTIONEER) != 0)         { commentNpcFlag += "Auctioneer & "; }
            if ((npcFlags & app.constants.npcFlag.STABLEMASTER) != 0)       { commentNpcFlag += "Stablemaster & "; }
            if ((npcFlags & app.constants.npcFlag.GUILD_BANKER) != 0)       { commentNpcFlag += "Guild Banker & "; }
            if ((npcFlags & app.constants.npcFlag.SPELLCLICK) != 0)         { commentNpcFlag += "Spellclick & "; }
            if ((npcFlags & app.constants.npcFlag.PLAYER_VEHICLE) != 0)     { commentNpcFlag += "Player Vehicle & "; }

            if (commentNpcFlag.indexOf("&") > -1) {
              //! Trim last ' & ' from the comment..
              commentNpcFlag = commentNpcFlag.substring(0, commentNpcFlag.length - 3);

              fullLine = fullLine.replace("_getNpcFlags_", "s_getNpcFlags_");
            }

            fullLine = fullLine.replace("_getNpcFlags_", " " + commentNpcFlag);
          }

          if (fullLine.indexOf("_startOrStopActionParamOne_") > -1) {

            if (smartScript.action_param1 == "0") {
              fullLine = fullLine.replace("_startOrStopActionParamOne_", "Stop");
            } else { //! Even if above 1 or below 0 we start attacking/allow-combat-movement
              fullLine = fullLine.replace("_startOrStopActionParamOne_", "Start");
            }
          }

          if (fullLine.indexOf("_enableDisableActionParamOne_") > -1) {

            if (smartScript.action_param1 == "0") {
              fullLine = fullLine.replace("_enableDisableActionParamOne_", "Disable");
            } else { //! Even if above 1 or below 0 we start attacking/allow-combat-movement
              fullLine = fullLine.replace("_enableDisableActionParamOne_", "Enable");
            }
          }

          if (fullLine.indexOf("_incrementOrDecrementActionParamOne_") > -1) {

            if (smartScript.action_param1 == "1") {
              fullLine = fullLine.replace("_incrementOrDecrementActionParamOne_", "Increment");
            } else if (smartScript.action_param2 == "1") {
              fullLine = fullLine.replace("_incrementOrDecrementActionParamOne_", "Decrement");
            }
            //else //? What to do?
          }

          if (fullLine.indexOf("_sheathActionParamOne_") > -1) {

            switch (smartScript.action_param1) {
              case 0:
                fullLine = fullLine.replace("_sheathActionParamOne_", "Unarmed");
                break;
              case 1:
                fullLine = fullLine.replace("_sheathActionParamOne_", "Melee");
                break;
              case 2:
                fullLine = fullLine.replace("_sheathActionParamOne_", "Ranged");
                break;
              default:
                fullLine = fullLine.replace("_sheathActionParamOne_", "<Unknown Sheath>");
                break;
            }
          }

          if (fullLine.indexOf("_forceDespawnActionParamOne_") > -1) {

            if (smartScript.action_param1 > 2) {
              fullLine = fullLine.replace("_forceDespawnActionParamOne_", "In " + smartScript.action_param1 + " ms");
            } else {
              fullLine = fullLine.replace("_forceDespawnActionParamOne_", "Instant");
            }
          }

          if (fullLine.indexOf("_invincibilityHpActionParamsOneTwo_") > -1) {

            if (smartScript.action_param1 > 0) {
              fullLine = fullLine.replace("_invincibilityHpActionParamsOneTwo_", "Set Invincibility Hp " + smartScript.action_param1);
            } else if (smartScript.action_param2 > 0) {
              fullLine = fullLine.replace("_invincibilityHpActionParamsOneTwo_", "Set Invincibility Hp " + smartScript.action_param2 + "%");
            } else if (smartScript.action_param1 == 0 && smartScript.action_param2 == 0) {
              fullLine = fullLine.replace("_invincibilityHpActionParamsOneTwo_", "Reset Invincibility Hp");
            } else {
              fullLine = fullLine.replace("_invincibilityHpActionParamsOneTwo_", "<Unsupported parameters>");
            }
          }

          if (fullLine.indexOf("_onOffActionParamOne_") > -1) {

            if (smartScript.action_param1 == 1) {
              fullLine = fullLine.replace("_onOffActionParamOne_", "On");
            } else {
              fullLine = fullLine.replace("_onOffActionParamOne_", "Off");
            }
          }

          if (fullLine.indexOf("_gameobjectNameActionParamOne_") > -1) {
            fullLine = fullLine.replace("_gameobjectNameActionParamOne_", "'" + app.synchGetGameObjectNameById(smartScript.action_param1) + "'");
          }

          if (fullLine.indexOf("_addItemBasedOnActionParams_") > -1) {
            fullLine = fullLine.replace("_addItemBasedOnActionParams_", "'" + app.synchGetItemNameById(smartScript.action_param1) + "' ");

            if (smartScript.action_param2 > 1) {
              fullLine += " " + smartScript.action_param2 + " Times";
            } else {
              fullLine += " 1 Time";
            }
          }

          if (fullLine.indexOf("_updateAiTemplateActionParamOne_") > -1) {

            switch (Number(smartScript.action_param1)) {
              case app.saiConstants.templates.TEMPLATE_BASIC:
                fullLine = fullLine.replace("_updateAiTemplateActionParamOne_", "Basic");
                break;
              case app.saiConstants.templates.TEMPLATE_CASTER:
                fullLine = fullLine.replace("_updateAiTemplateActionParamOne_", "Caster");
                break;
              case app.saiConstants.templates.TEMPLATE_TURRET:
                fullLine = fullLine.replace("_updateAiTemplateActionParamOne_", "Turret");
                break;
              case app.saiConstants.templates.TEMPLATE_PASSIVE:
                fullLine = fullLine.replace("_updateAiTemplateActionParamOne_", "Passive");
                break;
              case app.saiConstants.templates.TEMPLATE_CAGED_GO_PART:
                fullLine = fullLine.replace("_updateAiTemplateActionParamOne_", "Caged Gameobject Part");
                break;
              case app.saiConstants.templates.TEMPLATE_CAGED_NPC_PART:
                fullLine = fullLine.replace("_updateAiTemplateActionParamOne_", "Caged Creature Part");
                break;
              default:
                fullLine = fullLine.replace("_updateAiTemplateActionParamOne_", "<_updateAiTemplateActionParamOne_ Unknown ai template>");
                break;
            }
          }

          if (fullLine.indexOf("_setOrientationTargetType_") > -1) {

            switch (Number(smartScript.target_type)) {
              case app.saiConstants.target.SELF:
                fullLine = fullLine.replace("_setOrientationTargetType_", "Home Position");
                break;
              case app.saiConstants.target.POSITION:
                fullLine = fullLine.replace("_setOrientationTargetType_", smartScript.target_o.ToString());
                break;
              default:
                fullLine = fullLine.replace("_setOrientationTargetType_", $scope.getStringByTargetType(smartScript));
                break;
            }
          }

          if (fullLine.indexOf("_getTargetType_") > -1) {
            fullLine = fullLine.replace("_getTargetType_", $scope.getStringByTargetType(smartScript));
          }

          if (fullLine.indexOf("_goStateActionParamOne_") > -1) {

            switch (smartScript.action_param1) {
              case 0:
                fullLine = fullLine.replace("_goStateActionParamOne_", "Not Ready");
                break;
              case 1:
                fullLine = fullLine.replace("_goStateActionParamOne_", "Ready");
                break;
              case 2:
                fullLine = fullLine.replace("_goStateActionParamOne_", "Activated");
                break;
              case 3:
                fullLine = fullLine.replace("_goStateActionParamOne_", "Deactivated");
                break;
              default:
                fullLine = fullLine.replace("_goStateActionParamOne_", "<Unknown Gameobject State>");
                break;
            }
          }

          if (fullLine.indexOf("_getGoFlags_") > -1) {
            commentGoFlag = "";
            goFlags = smartScript.action_param1;

            if ((goFlags & app.constants.goFlag.IN_USE) != 0)         { commentGoFlag += "In Use & "; }
            if ((goFlags & app.constants.goFlag.LOCKED) != 0)         { commentGoFlag += "Locked & "; }
            if ((goFlags & app.constants.goFlag.INTERACT_COND) != 0)  { commentGoFlag += "Interact Condition & "; }
            if ((goFlags & app.constants.goFlag.TRANSPORT) != 0)      { commentGoFlag += "Transport & "; }
            if ((goFlags & app.constants.goFlag.NOT_SELECTABLE) != 0) { commentGoFlag += "Not Selectable & "; }
            if ((goFlags & app.constants.goFlag.NODESPAWN) != 0)      { commentGoFlag += "No Despawn & "; }
            if ((goFlags & app.constants.goFlag.TRIGGERED) != 0)      { commentGoFlag += "Triggered & "; }
            if ((goFlags & app.constants.goFlag.DAMAGED) != 0)        { commentGoFlag += "Damaged & "; }
            if ((goFlags & app.constants.goFlag.DESTROYED) != 0)      { commentGoFlag += "Destroyed & "; }

            if (commentGoFlag.indexOf("&") > -1) {
              //! Trim last ' & ' from the comment..
              commentGoFlag = commentGoFlag.substring(0, commentGoFlag.length - 3);

              fullLine = fullLine.replace("_getGoFlags_", "s_getGoFlags_");
            }

            fullLine = fullLine.replace("_getGoFlags_", " " + commentGoFlag);
          }

          if (fullLine.indexOf("_getDynamicFlags_") > -1) {

            commentDynamicFlag = "";
            dynamicFlags = smartScript.action_param1;

            if ((dynamicFlags & app.constants.dynamicFlag.NONE) != 0)                      { commentDynamicFlag += "None & "; }
            if ((dynamicFlags & app.constants.dynamicFlag.LOOTABLE) != 0)                  { commentDynamicFlag += "Lootable & "; }
            if ((dynamicFlags & app.constants.dynamicFlag.TRACK_UNIT) != 0)                { commentDynamicFlag += "Track Units & "; }
            if ((dynamicFlags & app.constants.dynamicFlag.TAPPED) != 0)                    { commentDynamicFlag += "Tapped & "; }
            if ((dynamicFlags & app.constants.dynamicFlag.TAPPED_BY_PLAYER) != 0)          { commentDynamicFlag += "Tapped By Player & "; }
            if ((dynamicFlags & app.constants.dynamicFlag.SPECIALINFO) != 0)               { commentDynamicFlag += "Special Info & "; }
            if ((dynamicFlags & app.constants.dynamicFlag.DEAD) != 0)                      { commentDynamicFlag += "Dead & "; }
            if ((dynamicFlags & app.constants.dynamicFlag.REFER_A_FRIEND) != 0)            { commentDynamicFlag += "Refer A Friend & "; }
            if ((dynamicFlags & app.constants.dynamicFlag.TAPPED_BY_ALL_THREAT_LIST) != 0) { commentDynamicFlag += "Tapped By Threatlist & "; }

            if (commentDynamicFlag.indexOf("&") > -1) {
              //! Trim last ' & ' from the comment..
              commentDynamicFlag = commentDynamicFlag.substring(0, commentDynamicFlag.length - 3);

              fullLine = fullLine.replace("_getDynamicFlags_", "s_getDynamicFlags_");
            }

            fullLine = fullLine.replace("_getDynamicFlags_", " " + commentDynamicFlag);
          }

          if (fullLine.indexOf("_getBytes1Flags_") > -1) {

            switch (Number(smartScript.action_param2)) {
              case app.constants.unitFieldBytes1Type.STAND_STAND_STATE_TYPE:
                switch (Number(smartScript.action_param1)) {
                  case app.constants.unitStandStateTypeSTAND:
                    fullLine = fullLine.replace("_getBytes1Flags_", "Standstate Stand Up");
                    break;
                  case app.constants.unitStandStateTypeSIT:
                    fullLine = fullLine.replace("_getBytes1Flags_", "Standstate Sit Down");
                    break;
                  case app.constants.unitStandStateTypeSIT_CHAIR:
                    fullLine = fullLine.replace("_getBytes1Flags_", "Standstate Sit Down Chair");
                    break;
                  case app.constants.unitStandStateTypeSLEEP:
                    fullLine = fullLine.replace("_getBytes1Flags_", "Standstate Sleep");
                    break;
                  case app.constants.unitStandStateTypeSIT_LOW_CHAIR:
                    fullLine = fullLine.replace("_getBytes1Flags_", "Standstate Sit Low Chair");
                    break;
                  case app.constants.unitStandStateTypeSIT_MEDIUM_CHAIR:
                    fullLine = fullLine.replace("_getBytes1Flags_", "Standstate Sit Medium Chair");
                    break;
                  case app.constants.unitStandStateTypeSIT_HIGH_CHAIR:
                    fullLine = fullLine.replace("_getBytes1Flags_", "Standstate Sit High Chair");
                    break;
                  case app.constants.unitStandStateTypeDEAD:
                    fullLine = fullLine.replace("_getBytes1Flags_", "Standstate Dead");
                    break;
                  case app.constants.unitStandStateTypeKNEEL:
                    fullLine = fullLine.replace("_getBytes1Flags_", "Standstate Kneel");
                    break;
                  case app.constants.unitStandStateTypeSUBMERGED:
                    fullLine = fullLine.replace("_getBytes1Flags_", "Standstate Submerged");
                    break;
                  default:
                    fullLine = fullLine.replace("_getBytes1Flags_", "<Unknown bytes1 (UnitStandStateType)>");
                    break;
                }
                break;

              case app.constants.unitFieldBytes1Type.PET_TALENTS_TYPE:
                fullLine = fullLine.replace("_getBytes1Flags_", "<Unknown bytes1 type>");
                break;

              case app.constants.unitFieldBytes1Type.STAND_FLAGS_TYPE:
                switch (Number(smartScript.action_param1)) {
                  case app.constants.unitStandFlags.UNK1:
                  case app.constants.unitStandFlags.UNK4:
                  case app.constants.unitStandFlags.UNK5:
                    fullLine = fullLine.replace("_getBytes1Flags_", "<Unknown>");
                    break;
                  case app.constants.unitStandFlags.CREEP:
                    fullLine = fullLine.replace("_getBytes1Flags_", "Creep");
                    break;
                  case app.constants.unitStandFlags.UNTRACKABLE:
                    fullLine = fullLine.replace("_getBytes1Flags_", "Untrackable");
                    break;
                  default:
                    fullLine = fullLine.replace("_getBytes1Flags_", "<Unknown bytes1 (UnitStandFlags)>");
                    break;
                }
                break;

              case app.constants.unitFieldBytes1Type.BYTES1_FLAGS_TYPE:

                switch (Number(smartScript.action_param1)) {
                  case app.constants.unitBytes1Flags.UNK_3:
                    fullLine = fullLine.replace("_getBytes1Flags_", "<Unknown>");
                    break;
                  case app.constants.unitBytes1Flags.HOVER:
                    fullLine = fullLine.replace("_getBytes1Flags_", "Hover");
                    break;
                  case app.constants.unitBytes1Flags.ALWAYS_STAND:
                    fullLine = fullLine.replace("_getBytes1Flags_", "Always Stand");
                    break;
                  default:
                    fullLine = fullLine.replace("_getBytes1Flags_", "<Unknown bytes1 (UnitBytes1_Flags)>");
                    break;
                }
                break;

              default:
                break;
            }
          }

          if (fullLine.indexOf("_powerTypeActionParamOne_") > -1) {
            switch (Number(smartScript.action_param1))
            {
              case 0:
                fullLine = fullLine.replace("_powerTypeActionParamOne_", "Mana");
                break;
              case 1:
                fullLine = fullLine.replace("_powerTypeActionParamOne_", "Rage");
                break;
              case 2:
                fullLine = fullLine.replace("_powerTypeActionParamOne_", "Focus");
                break;
              case 3:
                fullLine = fullLine.replace("_powerTypeActionParamOne_", "Energy");
                break;
              case 4:
                fullLine = fullLine.replace("_powerTypeActionParamOne_", "Happiness");
                break;
              case 5:
                fullLine = fullLine.replace("_powerTypeActionParamOne_", "Rune");
                break;
              case 6:
                fullLine = fullLine.replace("_powerTypeActionParamOne_", "Runic Power");
                break;
              default:
                fullLine = fullLine.replace("_powerTypeActionParamOne_", "<Unknown Powertype>");
                break;
            }
          }

          if (fullLine.indexOf("_getUnitFlags_") > -1) {
            commentUnitFlag = "";
            unitFlags = smartScript.action_param1;

            if ((unitFlags & app.constants.unitFlag.SERVER_CONTROLLED) != 0)  { commentUnitFlag += "Server Controlled & "; }
            if ((unitFlags & app.constants.unitFlag.NON_ATTACKABLE) != 0)     { commentUnitFlag += "Not Attackable & "; }
            if ((unitFlags & app.constants.unitFlag.DISABLE_MOVE) != 0)       { commentUnitFlag += "Disable Move & "; }
            if ((unitFlags & app.constants.unitFlag.PVP_ATTACKABLE) != 0)     { commentUnitFlag += "PvP Attackable & "; }
            if ((unitFlags & app.constants.unitFlag.RENAME) != 0)             { commentUnitFlag += "Rename & "; }
            if ((unitFlags & app.constants.unitFlag.PREPARATION) != 0)        { commentUnitFlag += "Preparation & "; }
            if ((unitFlags & app.constants.unitFlag.NOT_ATTACKABLE_1) != 0)   { commentUnitFlag += "Not Attackable & "; }
            if ((unitFlags & app.constants.unitFlag.IMMUNE_TO_PC) != 0)       { commentUnitFlag += "Immune To Players & "; }
            if ((unitFlags & app.constants.unitFlag.IMMUNE_TO_NPC) != 0)      { commentUnitFlag += "Immune To Creatures & "; }
            if ((unitFlags & app.constants.unitFlag.LOOTING) != 0)            { commentUnitFlag += "Looting & "; }
            if ((unitFlags & app.constants.unitFlag.PET_IN_COMBAT) != 0)      { commentUnitFlag += "Pet In Combat & "; }
            if ((unitFlags & app.constants.unitFlag.PVP) != 0)                { commentUnitFlag += "PvP & "; }
            if ((unitFlags & app.constants.unitFlag.SILENCED) != 0)           { commentUnitFlag += "Silenced & "; }
            if ((unitFlags & app.constants.unitFlag.PACIFIED) != 0)           { commentUnitFlag += "Pacified & "; }
            if ((unitFlags & app.constants.unitFlag.STUNNED) != 0)            { commentUnitFlag += "Stunned & "; }
            if ((unitFlags & app.constants.unitFlag.IN_COMBAT) != 0)          { commentUnitFlag += "In Combat & "; }
            if ((unitFlags & app.constants.unitFlag.TAXI_FLIGHT) != 0)        { commentUnitFlag += "Taxi Flight & "; }
            if ((unitFlags & app.constants.unitFlag.DISARMED) != 0)           { commentUnitFlag += "Disarmed & "; }
            if ((unitFlags & app.constants.unitFlag.CONFUSED) != 0)           { commentUnitFlag += "Confused & "; }
            if ((unitFlags & app.constants.unitFlag.FLEEING) != 0)            { commentUnitFlag += "Fleeing & "; }
            if ((unitFlags & app.constants.unitFlag.PLAYER_CONTROLLED) != 0)  { commentUnitFlag += "Player Controlled & "; }
            if ((unitFlags & app.constants.unitFlag.NOT_SELECTABLE) != 0)     { commentUnitFlag += "Not Selectable & "; }
            if ((unitFlags & app.constants.unitFlag.SKINNABLE) != 0)          { commentUnitFlag += "Skinnable & "; }
            if ((unitFlags & app.constants.unitFlag.MOUNT) != 0)              { commentUnitFlag += "Mounted & "; }
            if ((unitFlags & app.constants.unitFlag.SHEATHE) != 0)            { commentUnitFlag += "Sheathed & "; }

            if (commentUnitFlag.indexOf("&") > -1) {
              //! Trim last ' & ' from the comment..
              commentUnitFlag = commentUnitFlag.substring(0, commentUnitFlag.length - 3);

              fullLine = fullLine.replace("_getUnitFlags_", "s_getUnitFlags_");
            }

            fullLine = fullLine.replace("_getUnitFlags_", " " + commentUnitFlag);
          }

          if (fullLine.indexOf("_morphToEntryOrModelActionParams_") > -1) {

            if (smartScript.action_param1 > 0) {
              fullLine = fullLine.replace("_morphToEntryOrModelActionParams_", "Morph To Creature " + app.synchGetCreatureNameById(smartScript.action_param1));
            } else if (smartScript.action_param2 > 0) {
              fullLine = fullLine.replace("_morphToEntryOrModelActionParams_", "Morph To Model " + smartScript.action_param2);
            } else {
              fullLine = fullLine.replace("_morphToEntryOrModelActionParams_", "Demorph");
            }
          }

          if (fullLine.indexOf("_mountToEntryOrModelActionParams_") > -1) {
            if (smartScript.action_param1 > 0) {
              fullLine = fullLine.replace("_mountToEntryOrModelActionParams_", "Mount To Creature " + app.synchGetCreatureNameById(smartScript.action_param1));
            } else if (smartScript.action_param2 > 0) {
              fullLine = fullLine.replace("_mountToEntryOrModelActionParams_", "Mount To Model " + smartScript.action_param2);
            } else {
              fullLine = fullLine.replace("_mountToEntryOrModelActionParams_", "Dismount");
            }
          }

          if (fullLine.indexOf("_startOrStopBasedOnTargetType_") > -1) {
            if (smartScript.target_type == 0) {
              fullLine = fullLine.replace("_startOrStopBasedOnTargetType_", "Stop");
              fullLine = fullLine.replace("_getTargetType_", "");
            } else {
              fullLine = fullLine.replace("_startOrStopBasedOnTargetType_", "Start");
            }
          }

          event_phase_mask = smartScriptLink != null ? smartScriptLink.event_phase_mask : smartScript.event_phase_mask;

          if (event_phase_mask != app.saiConstants.phaseMask.ALWAYS)
          {
            arrayOfSplitPhases = [];

            event_phase_mask2 = event_phase_mask;
            log2 = 0;

            while (event_phase_mask2 >= 2)
            {
              event_phase_mask2 /= 2;
              log2++;
            }

            for (l2 = log2; l2 >= 0; l2--)
            {
              power = Math.pow(2, l2);

              if (event_phase_mask >= power)
              {
                event_phase_mask -= power;
                arrayOfSplitPhases.push(power);
              }
            }

            Array.reverse(arrayOfSplitPhases); //! Reverse them so they are ascending
            fullLine += " (Phase";

            if (arrayOfSplitPhases.length > 1) {
              fullLine += "s";
            }

            fullLine += " " + arrayOfSplitPhases.join(" & ") + ")";
          }

          event_flags = smartScriptLink != null ? smartScriptLink.event_flags : smartScript.event_flags;

          if (event_flags != app.saiConstants.eventFlags.NONE) {

            if (((event_flags & app.saiConstants.eventFlags.NOT_REPEATABLE) != 0)) {
              fullLine += " (No Repeat)";
            }

            if (((event_flags & app.saiConstants.eventFlags.NORMAL_DUNGEON) != 0) &&
                ((event_flags & app.saiConstants.eventFlags.HEROIC_DUNGEON) != 0) &&
                ((event_flags & app.saiConstants.eventFlags.NORMAL_RAID) != 0)    &&
                ((event_flags & app.saiConstants.eventFlags.HEROIC_RAID) != 0)) {
              fullLine += " (Dungeon & Raid)";
            } else {
              if (((event_flags & app.saiConstants.eventFlags.NORMAL_DUNGEON) != 0) &&
                  ((event_flags & app.saiConstants.eventFlags.HEROIC_DUNGEON) != 0)) {
                fullLine += " (Dungeon)";
              } else {
                if (((event_flags & app.saiConstants.eventFlags.NORMAL_DUNGEON) != 0)) {
                  fullLine += " (Normal Dungeon)";
                } else if (((event_flags & app.saiConstants.eventFlags.HEROIC_DUNGEON) != 0)) {
                  fullLine += " (Heroic Dungeon)";
                }
              }
            }

            if (((event_flags & app.saiConstants.eventFlags.NORMAL_RAID) != 0) &&
                ((event_flags & app.saiConstants.eventFlags.HEROIC_RAID) != 0)) {
              fullLine += " (Raid)";
            } else {
              if (((event_flags & app.saiConstants.eventFlags.NORMAL_RAID) != 0)) {
                fullLine += " (Normal Raid)";
              } else if (((event_flags & app.saiConstants.eventFlags.HEROIC_RAID) != 0)) {
                fullLine += " (Heroic Raid)";
              }
            }

            if (((event_flags & app.saiConstants.eventFlags.DEBUG_ONLY) != 0)) {
              fullLine += " (Debug)";
            }
          }

          /* Finish */
          $scope.new_smart_scripts[i].comment = fullLine;
        }
      }
    };

  });

}());
