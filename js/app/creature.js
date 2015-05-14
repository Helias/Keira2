/*jslint browser: true, white: true*/
/*global angular, console, alert*/

(function () {
  'use strict';

  var app = angular.module('keira2');

  app.controller("CreatureController", function ($scope, $http, $stateParams) {

    if ($stateParams.id) {
      $http.get( app.api + "creature/template/" + $stateParams.id)
        .success(function (data, status, header, config) {
        $scope.npc = data[0];
      })
        .error(function (data, status, header, config) {
        console.log("Error in CREATURE DATA $http.get request");
      });
      $scope.isCreatureSelected = true;
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
