/*jslint browser: true, white: true, plusplus: true */
/*global angular, console, alert*/

(function () {
  'use strict';

  var app = angular.module('keira2');

  app.controller("CreatureController", function ($scope, $http, $stateParams, $modal) {

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

    /* Generate SQL Script for Creature */
    $scope.generateCreatureScript = function() {

      if (!$scope.isCreatureSelected) { return; }

      var whereCondition = "entry = " + $scope.current_creature_template.entry;

      $scope.creatureScript = app.getUpdateQuery("creature_template", whereCondition, $scope.current_creature_template, $scope.new_creature_template);

    };

    $scope.open = function (size) {

      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'partials/creature/modals/mechanic.html',
        controller: "ModalInstanceCtrl",
        size: size,
        resolve: {
          mechanicVal: function () {
            return $scope.new_creature_template.mechanic_immune_mask;
          }
        }
      });

      modalInstance.result.then(function (mechanicRes) {
        $scope.new_creature_template.mechanic_immune_mask = mechanicRes;
      });

    };

  });

  app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, mechanicVal) {

    mechanicVal = String(parseInt(mechanicVal, 10).toString(2));
    mechanicVal = mechanicVal.split("").reverse().join("");

    $scope.mechanic = new Array(31);

    var i = 0;
    for (i = 0; i < $scope.mechanic.length; i++)
    {
      if(parseInt(mechanicVal[i], 10) !== 1) {
        $scope.mechanic[i] = false;
      } else {
        $scope.mechanic[i] = true;
      }
    }

    $scope.ok = function () {
      var i = 0, mechanicRes = 0;
      for (i = 0; i < $scope.mechanic.length; i++)
      {
        if($scope.mechanic[i] === true)
        {
          mechanicRes += Math.pow(2, i);
        }
      }
      $modalInstance.close(mechanicRes);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

  });

}());
