/*jslint browser: true, white: true, plusplus: true */
/*global angular, console, alert*/

(function () {
  'use strict';

  var app = angular.module('keira2');

  app.controller("QuestController", function ($scope, $http, $stateParams, $modal) {

    /* All Quest tabs, disabled by default.
    *  Only one tab can be active at a time */
    $scope.questTabs = {
      search  : false,
      part1   : false,
      part2   : false,
      givers  : false,
      takers  : false,
      script  : false
    };

    /* Init arrays */
    // TODO

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
      })
        .error(function (data, status, header, config) {
        console.log("[ERROR] quest/template/" + $stateParams.id + " $http.get request failed");
      });

    } else {
      /* We have no quest selected and default active tab is search */
      $scope.isQuestSelected = false;
      $scope.questTabs.search = true;
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

      var whereCondition = "entry = " + $scope.current_quest_template.Id;

      // TODO
      // quest_template
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
