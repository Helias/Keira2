/*jslint browser: true, eqeq: true, white: true, plusplus: true */
/*global angular, console, alert*/

(function () {
  'use strict';

  var app = angular.module('keira2');

  app.controller("CreateNewSAIController", function ($scope, $rootScope, $stateParams, $http) {

    /* Default selectedSourceType */
    $scope.selectedSourceType = 0;

    /* [Function] searchCreatures*/
    $scope.searchCreatures = function (creatureEntry, creatureName, creatureSubname) {

      if ( creatureEntry && (!creatureName && !creatureSubname) && (creatureEntry.length < 2) ) {
        alert("Please insert an Entry of at least 2 characters");
        return;
      }
      if ( creatureName && (!creatureEntry && !creatureSubname) && (creatureName.length < 3) ) {
        alert("Please insert a Name of at least 3 characters");
        return;
      }
      if ( creatureSubname && (!creatureEntry && !creatureName) && (creatureSubname.length < 3) ) {
        alert("Please insert a Subname of at least 3 characters");
        return;
      }

      $http.get( app.api + "/search/creature/", {
        params: {
          id: creatureEntry,
          name: creatureName,
          subname: creatureSubname
        }
      }).success(function (data, status, header, config) {
        $scope.creatures = $rootScope.fixNumericValues(data);
      })
        .error(function (data, status, header, config) {
        console.log("[ERROR] CREATURE SEARCH $http.get request failed");
      });

    };

  });

}());
