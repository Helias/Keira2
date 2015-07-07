/*jslint browser: true, white: true, plusplus: true */
/*global angular, console, alert*/

(function () {
  'use strict';

  var app = angular.module('keira2');

  app.controller("GameobjectController", function ($rootScope, $scope, $http, $stateParams, $modal) {

    /* All Gameobject tabs, disabled by default.
    *  Only one tab can be active at a time */
    $scope.gameobjectTabs = {
      search     : false,
      questItems : false,
      template   : false,
      spawns     : false,
      loot       : false,
      script     : false
    };

    /* Init arrays */
    $scope.current_gameobject               = [];
    $scope.new_gameobject                   = [];
    $scope.current_gameobject_loot_template = [];
    $scope.new_gameobject_loot_template     = [];

    /* importing constants */
    $scope.constants = app.goConstants;

    /* Check if a gameobject is selected */
    if ($stateParams.id) {

      /* We have a gameobject selected and default active tab is template */
      $scope.isGameobjectSelected = true;
      $scope.gameobjectTabs.template = true;

      /*  Following lines retrieve all Gameobject data
       *  current_* mantains the database state
       *  new_*     mantains the editor state
       *  we will use those two objects to generate the SQL queries
       */

      /* Retrieve all gameobject_template data */
      $http.get( app.api + "gameobject/template/" + $stateParams.id )
        .success(function (data, status, header, config) {
        $scope.current_gameobject_template = $rootScope.fixNumericValues(data[0]);
        $scope.new_gameobject_template = angular.copy($scope.current_gameobject_template);
        $scope.selectionText = $scope.current_gameobject_template.name + " (" + $scope.current_gameobject_template.entry + ")";
      })
        .error(function (data, status, header, config) {
        console.log("[ERROR] gameobject/template/" + $stateParams.id + " $http.get request failed");
      });

      /* Retrieve all gameobject_loot_template data */
      $http.get( app.api + "loot/template/gameobject/" + $stateParams.id )
        .success(function (data, status, header, config) {
        $scope.current_gameobject_loot_template = $rootScope.fixNumericValues(data);
        $scope.new_gameobject_loot_template = angular.copy($scope.current_gameobject_loot_template);
      })
        .error(function (data, status, header, config) {
        console.log("[ERROR] loot/template/gameobject/" + $stateParams.id + " $http.get request failed");
      });

      /* Retrieve all gameobject data */
      $http.get( app.api + "gameobject/spawn/id/" + $stateParams.id )
        .success(function (data, status, header, config) {
        $scope.current_gameobject = $rootScope.fixNumericValues(data);
        $scope.new_gameobject = angular.copy($scope.current_gameobject);
      })
        .error(function (data, status, header, config) {
        console.log("[ERROR] gameobject/spawn/id/" + $stateParams.id + " $http.get request failed");
      });

      /* Retrieve all gameobject questitems */
      $http.get( app.api + "gameobject/questitem/" + $stateParams.id )
        .success(function (data, status, header, config) {
        $scope.current_gameobject_questitem = $rootScope.fixNumericValues(data);
        $scope.new_gameobject_questitem = angular.copy($scope.current_gameobject_questitem);
      })
        .error(function (data, status, header, config) {
        console.log("[ERROR] gameobject/questitem/" + $stateParams.id + " $http.get request failed");
      });

    } else {
      /* We have no gameobject selected and default active tab is search */
      $scope.isGameobjectSelected = false;
      $scope.gameobjectTabs.search = true;
      $scope.selectionText = "No GameObject selected. Please use Search to select one.";
    }

    /* [Function] Search */
    $scope.search = function (gameobjectEntry, gameobjectName) {

      if ( gameobjectEntry && !gameobjectName && (gameobjectEntry.length < 2) ) {
        alert("Please insert an ID of at least 2 characters");
        return;
      }
      if ( gameobjectName && !gameobjectEntry && (gameobjectName.length < 3) ) {
        alert("Please insert a Title of at least 3 characters");
        return;
      }

      $http.get( app.api + "search/gameobject/", {
        params: {
          id: gameobjectEntry,
          name: gameobjectName
        }
      }).success(function (data, status, header, config) {
        $scope.gameobjects = $rootScope.fixNumericValues(data);
      })
        .error(function (data, status, header, config) {
        console.log("[ERROR] GAMEOBJECT SEARCH $http.get request failed");
      });

    };

    /* [Function] Generate SQL Script for Gameobject */
    $scope.generateGameobjectScript = function() {

      if (!$scope.isGameobjectSelected) {
        $scope.gameobjectScript = "-- No Gameobject selected";
        return;
      }

      $scope.gameobjectScript = "";

      var whereCondition = "entry = " + $scope.current_gameobject_template.entry;

      $scope.gameobjectScript += app.getUpdateQuery("gameobject_template", whereCondition, $scope.current_gameobject_template, $scope.new_gameobject_template);
    };

    /* [Function] disactive all tabs */
    $scope.disactiveAllTabs = function() {
      angular.forEach($scope.gameobjectTabs, function(value, key) {
        value = false;
      });
    };

    /* [Function] open SQL Script tab */
    $scope.openScriptTab = function() {
      $scope.disactiveAllTabs();
      $scope.generateGameobjectScript();
      $scope.gameobjectTabs.script = true;
    };

  });

}());
