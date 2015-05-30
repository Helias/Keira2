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
    $scope.event_type.param1 = [];
    $scope.event_type.param2 = ["InitialMax", "InitialMax", "HPMax%", "ManaMax%", " ", "CooldownMax", " ", " ", "School", "MaxDist", "MaxRange", "MapId", "HPMax%", "RepeatMax", "Radius", "RepeatMin", "Radius", "CooldownMin", "ManaMax%", " ", " ", " ", "CooldownMin", "Stacks", "Stacks", " ", "MaxRange", "CooldownMax", "CooldownMax", " ", " ", "School", "MaxDmg", "MaxDmg", "PointID", "CooldownMin", " ", " ", "Value", "pathId (0 any)", "pathId (0 any)", " ", " ", " ", " ", "CooldownMin", " ", " ", " ", " ", " ", " ", "CreatureId (0 any)", "MaxHeal", " ", "pathID (0 any)", "pathID (0 any)", "pathID (0 any)", "pathID (0 any)", " ", "InitialMax", " ", "ID", " ", " ", " ", "effectIndex", "CooldownMax", " ", " ", " ", " ", " ", " ", "maxHpPct", "database entry", "database entry", "value"];
    $scope.event_type.param3 = [];
    $scope.event_type.param4 = [];

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
