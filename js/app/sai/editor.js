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

    /* [Function] Generate Comments
     * inspired by: https://github.com/Discover-/SAI-Editor/blob/master/SAI-Editor/Classes/CommentGenerator.cs
     */
    $scope.generateComments = function() {

      var i, fullLine, smartScript, randomEmotes;

      for (i = 0; i < $scope.new_smart_scripts.length; i++) {

        if ($scope.new_smart_scripts[i].comment == null || $scope.new_smart_scripts[i].comment == "") {

          smartScript = $scope.new_smart_scripts[i];
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
                case app.saiLabels.comment.event.AREATRIGGER_ONTRIGGER:
                case app.saiLabels.comment.event.LINK:
                  fullLine += "On Trigger";
                  break;
                default:
                  fullLine += "INCORRECT EVENT TYPE";
                  break;
              }

              break;

            case 9: //! Actionlist
              // TODO
              break;
          }

          // TODO: replace _previousLineComment_

          fullLine = fullLine.replace("_eventParamOne_",   smartScript.event_param1);
          fullLine = fullLine.replace("_eventParamTwo_",   smartScript.event_param2);
          fullLine = fullLine.replace("_eventParamThree_", smartScript.event_param3);
          fullLine = fullLine.replace("_eventParamFour_",  smartScript.event_param4);

          // TODO: replace event_param* with the name of the subject
          fullLine = fullLine.replace("_spellNameEventParamOne_", smartScript.event_param1);
          fullLine = fullLine.replace("_targetCastingSpellName_", smartScript.event_param3);
          fullLine = fullLine.replace("_questNameEventParamOne_", smartScript.event_param1);
          fullLine = fullLine.replace("_hasAuraEventParamOne_", smartScript.event_param1);

          //! Action type
          fullLine += " - " + app.saiLabels.comment.action[smartScript.action_type];

          console.log(fullLine);
          console.log(fullLine.indexOf("_actionParamOne_"));
          fullLine = fullLine.replace("_actionParamOne_",   smartScript.action_param1);
          fullLine = fullLine.replace("_actionParamTwo_",   smartScript.action_param2);
          fullLine = fullLine.replace("_actionParamThree_", smartScript.action_param3);
          fullLine = fullLine.replace("_actionParamFour_",  smartScript.action_param4);
          fullLine = fullLine.replace("_actionParamFive_",  smartScript.action_param5);
          fullLine = fullLine.replace("_actionParamSix_",   smartScript.action_param6);
          console.log(smartScript.action_param1);

          // TODO: replace action_param* with the name of the subject
          fullLine = fullLine.replace("_spellNameActionParamOne_",   smartScript.action_param1);
          fullLine = fullLine.replace("_spellNameActionParamTwo_",   smartScript.action_param2);
          fullLine = fullLine.replace("_questNameActionParamOne_",   smartScript.action_param1);
          fullLine = fullLine.replace("_questNameCastCreatureOrGo_", smartScript.action_param1);
          fullLine = fullLine.replace("_questNameKillCredit_",       smartScript.action_param1);

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

          // TODO: replace action_param* with the name of the subject
          fullLine = fullLine.replace("_creatureNameActionParamOne_", smartScript.action_param1);

          // TODO [...]

          smartScript.comment = fullLine;
        }
      }
    };

  });

}());
