/*jslint browser: true, white: true, plusplus: true */
/*global angular, console, alert*/

(function () {
  'use strict';

  var app = angular.module('keira2');

  app.controller("QuestController", function ($scope, $http, $stateParams, $modal) {

    /* All Quest tabs, disabled by default.
    *  Only one tab can be active at a time */
    $scope.questTabs = {
      search              : false,
      part1               : false,
      part2               : false,
      creatureStarters    : false,
      creatureEnders      : false,
      gameobjectStarters  : false,
      gameobjectEnders    : false,
      script              : false
    };

    /* Init arrays */
    $scope.current_creature_queststarter    = [];
    $scope.new_creature_queststarter        = [];
    $scope.current_creature_questender      = [];
    $scope.new_creature_questender          = [];
    $scope.current_gameobject_queststarter  = [];
    $scope.new_gameobject_queststarter      = [];
    $scope.current_gameobject_questender    = [];
    $scope.new_gameobject_questender        = [];


    /* Check if a quest is selected */
    if ($stateParams.id) {

      /* We have a quest selected and default active tab is questTemplate */
      $scope.isQuestSelected = true;
      $scope.questTabs.part1 = true;

      /*  Following lines retrieve all Quest datas
       *  current_* mantains the database state
       *  new_*     mantains the editor state
       *  we will use those two objects to generate the SQL queries
       */

      /* Retrieve all quest_template datas */
      $http.get( app.api + "quest/template/" + $stateParams.id)
        .success(function (data, status, header, config) {
        $scope.current_quest_template = data[0];
        $scope.new_quest_template = angular.copy($scope.current_quest_template);
        $scope.selectionText = $scope.current_quest_template.Title + " (" + $scope.current_quest_template.Id +") ";
      })
        .error(function (data, status, header, config) {
        console.log("[ERROR] quest/template/" + $stateParams.id + " $http.get request failed");
      });

      /* Retrieve all creature_queststarter datas */
      $http.get( app.api + "creature/queststarter/quest/" + $stateParams.id, {
        params : { names : 0 }
      })
        .success(function (data, status, header, config) {
        $scope.current_creature_queststarter = data;
        $scope.new_creature_queststarter = angular.copy($scope.current_creature_queststarter);
      })
        .error(function (data, status, header, config) {
        console.log("[ERROR] creature/queststarter/quest/" + $stateParams.id + " $http.get request failed");
      });

      /* Retrieve all creature_questender datas */
      $http.get( app.api + "creature/questender/quest/" + $stateParams.id, {
        params : { names : 0 }
      })
        .success(function (data, status, header, config) {
        $scope.current_creature_questender = data;
        $scope.new_creature_questender = angular.copy($scope.current_creature_questender);
      })
        .error(function (data, status, header, config) {
        console.log("[ERROR] creature/questender/quest/" + $stateParams.id + " $http.get request failed");
      });

      /* Retrieve all gameobject_queststarter datas */
      $http.get( app.api + "gameobject/queststarter/quest/" + $stateParams.id, {
        params : { names : 0 }
      })
        .success(function (data, status, header, config) {
        $scope.current_gameobject_queststarter = data;
        $scope.new_gameobject_queststarter = angular.copy($scope.current_gameobject_queststarter);
      })
        .error(function (data, status, header, config) {
        console.log("[ERROR] gameobject/queststarter/quest/" + $stateParams.id + " $http.get request failed");
      });

      /* Retrieve all gameobject_questender datas */
      $http.get( app.api + "gameobject/questender/quest/" + $stateParams.id, {
        params : { names : 0 }
      })
        .success(function (data, status, header, config) {
        $scope.current_gameobject_questender = data;
        $scope.new_gameobject_questender = angular.copy($scope.current_gameobject_questender);
      })
        .error(function (data, status, header, config) {
        console.log("[ERROR] gameobject/questender/quest/" + $stateParams.id + " $http.get request failed");
      });

    } else {
      /* We have no quest selected and default active tab is search */
      $scope.isQuestSelected = false;
      $scope.questTabs.search = true;
      $scope.selectionText = "No Quest selected. Please use Search to select one.";
    }

    /* [Function] Search */
    $scope.search = function (questId, questTitle) {

      if ( questId && !questTitle && (questId.length < 2) ) {
        alert("Please insert an ID of at least 2 characters");
        return;
      }
      if ( questTitle && !questId && (questTitle.length < 3) ) {
        alert("Please insert a Title of at least 3 characters");
        return;
      }

      $http.get( app.api + "/search/quest/", {
        params: {
          id: questId,
          name: questTitle
        }
      }).success(function (data, status, header, config) {
        $scope.quests = data;
      })
        .error(function (data, status, header, config) {
        console.log("[ERROR] QUEST SEARCH $http.get request failed");
      });

    };

    /* [Function] Generate SQL Script for Quest */
    $scope.generateQuestScript = function() {

      if (!$scope.isQuestSelected) {
        $scope.questScript = "# No Quest selected";
        return;
      }

      $scope.questScript = "";

      var whereCondition = "Id = " + $scope.current_quest_template.Id;


      $scope.questScript += app.getUpdateQuery("quest_template", whereCondition, $scope.current_quest_template, $scope.new_quest_template);
    };

    /* [Function] disactive all tabs */
    $scope.disactiveAllTabs = function() {
      angular.forEach($scope.questTabs, function(value, key) {
        value = false;
      });
    };

    /* [Function] open SQL Script tab */
    $scope.openScriptTab = function() {
      $scope.disactiveAllTabs();
      $scope.generateQuestScript();
      $scope.questTabs.script = true;
    };

  });

}());
