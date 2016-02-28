
/*jslint browser: true, white: true, plusplus: true */
/*global angular, console, alert*/

(function () {
  'use strict';

  var app = angular.module('keira2');

  app.controller("CharacterController", function ($rootScope, $scope, $http, $stateParams, $uibModal) {

    /* All Character tabs, disabled by default.
     *  Only one tab can be active at a time */
    $scope.characterTabs = {
      search    : false,
      character : false
    };

    /* Init arrays */
    // no object arrays at the moment

    /* Check if a character is selected */
    if ($stateParams.id) {

      /* We have a character selected and default active tab is characterTemplate */
      $scope.isCharacterSelected      = true;
      $scope.characterTabs.character  = true;

      /*  Following lines retrieve all character data
       *  current_* mantains the database state
       *  new_*     mantains the editor state
       *  we will use those two objects to generate the SQL queries
       */

      /* Retrieve all characters data */
      $http.get( app.api + "characters/" + $stateParams.id, {
        params: { no_extra_fields : 1 }
      })
        .success(function (data, status, header, config) {
        $scope.current_characters = $rootScope.fixNumericValues(data[0]);
        $scope.new_characters = angular.copy($scope.current_characters);
        $scope.selectionText = $scope.current_characters.name + " (" + $scope.current_characters.guid +") ";
      })
        .error(function (data, status, header, config) {
        console.log("[ERROR] characters/" + $stateParams.id + " $http.get request failed");
      });

    } else {
      /* We have no character selected and default active tab is search */
      $scope.isCharacterSelected = false;
      $scope.characterTabs.search = true;
      $scope.selectionText = "No Character selected. Please use Search to select one.";
    }

    /* [Function] Search */
    $scope.search = function (characterGuid, characterName) {

      if ( characterName && !characterGuid && (characterName.length < 2) ) {
        alert("Please insert a Name of at least 2 characters");
        return;
      }

      $http.get( app.api + "search/character/", {
        params: {
          guid: characterGuid,
          name: characterName
        }
      }).success(function (data, status, header, config) {
        $scope.characters = $rootScope.fixNumericValues(data);
      })
        .error(function (data, status, header, config) {
        console.log("[ERROR] character SEARCH $http.get request failed");
      });

    };

    /* [Function] Generate SQL Script for Character */
    $scope.generateCharacterScript = function() {

      if (!$scope.isCharacterSelected) {
        $scope.characterScript = "-- No Character selected";
        return;
      }

      $scope.characterScript = "";

      var whereCondition = "guid = " + $scope.current_characters.guid;

      // characters
      $scope.characterScript += app.getUpdateQuery("characters", whereCondition, $scope.current_characters, $scope.new_characters);
    };

    /* [Function] disactive all tabs */
    $scope.disactiveAllTabs = function() {
      angular.forEach($scope.characterTabs, function(value, key) {
        value = false;
      });
    };

    /* [Function] open SQL Script tab */
    $scope.openScriptTab = function() {
      $scope.disactiveAllTabs();
      $scope.generateCharacterScript();
      $scope.characterTabs.script = true;
    };

  });

}());
