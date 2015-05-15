/*jslint browser: true, white: true*/
/*global angular, console, alert*/

(function () {
  'use strict';

  var app = angular.module('keira2');

  app.controller("CreatureController", function ($scope, $http, $stateParams) {

    if ($stateParams.id) {
      $http.get( app.api + "creature/template/" + $stateParams.id)
        .success(function (data, status, header, config) {
        $scope.current_creature_template = data[0];
        $scope.new_creature_template = angular.copy($scope.current_creature_template);
        console.log($scope.current_creature_template);
      })
        .error(function (data, status, header, config) {
        console.log("Error in CREATURE DATA $http.get request");
      });
      $scope.isCreatureSelected = true;
    }

    $scope.search = function (CreatureEntry, CreatureName, CreatureSubname) {

      $http.get( app.api + "/search/creature/", {
        params: {
          id: CreatureEntry,
          name: CreatureName,
          subname: CreatureSubname
        }
      }).success(function (data, status, header, config) {
        $scope.creatures = data;
      })
        .error(function (data, status, header, config) {
        console.log("Error in CREATURE SEARCH $http.get request");
      });

    };

    $scope.generateCreatureScript = function() {

      $scope.creatureScript = app.getUpdateQuery("creature_template", $scope.current_creature_template.entry, $scope.current_creature_template, $scope.new_creature_template);

    };

  });

}());
