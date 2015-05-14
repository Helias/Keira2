/*jslint browser: true, white: true*/
/*global angular, console, alert*/

(function () {
  'use strict';

  var app = angular.module('keira2');

  app.controller("CreatureController", function ($scope, $http, $stateParams) {

    if ($stateParams.id) {
      $http.get( app.api + "creature/template/" + $stateParams.id)
        .success(function (data, status, header, config) {
        $scope.new_creature_template = data[0];
        $scope.current_creature_template = data[0];
      })
        .error(function (data, status, header, config) {
        console.log("Error in CREATURE DATA $http.get request");
      });
      $scope.isCreatureSelected = true;
    }

    // TO DO: use this function to compare object literals "current" and "new"
    $scope.labels = function getLabels(obj) {
      var result = "";
      for (var label in obj) {
        if (obj.hasOwnProperty(label)) {
          result += "creature_template." + label + " = " + obj[label] + "\n";
        }
      }
      return result;
    }

    $scope.search = function (CreatureEntry, CreatureName, CreatureSubname) {

      $http.get( app.api + "/search/creature/", {
        params: { id: CreatureEntry, name: CreatureName, subname: CreatureSubname }
      }).success(function (data, status, header, config) {
        $scope.creatures = data;
      })
        .error(function (data, status, header, config) {
        console.log("Error in CREATURE SEARCH $http.get request");
      });

    };
  });

}());
