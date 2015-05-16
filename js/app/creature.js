/*jslint browser: true, white: true, plusplus: true */
/*global angular, console, alert*/

(function () {
  'use strict';

  var app = angular.module('keira2');

  app.controller("CreatureController", function ($scope, $http, $stateParams, $modal) {

    /* All Creature tabs, disabled by default.
    *  Only one tab can be active at a time */
    $scope.creatureTabs = {
      search                : false,
      creatureTemplate      : false,
      creatureLocation      : false,
      modelInfo             : false,
      equipTemplate         : false,
      creatureLoot          : false,
      pickpocketLoot        : false,
      skinLoot              : false,
      creatureTemplateAddon : false,
      npcGossip             : false,
      onKillReputation      : false,
      involvedIn            : false,
      localesNpcText        : false,
      creatureMovement      : false,
      creatureAddon         : false,
      script                : false
    };

    /* Check if a creature is selected */
    if ($stateParams.id) {

      /* Retrieve all creature_template datas */
      $http.get( app.api + "creature/template/" + $stateParams.id)
        .success(function (data, status, header, config) {

        /* current_* mantains the database state
        *  new_*     mantains the editor state  */
        $scope.current_creature_template = data[0];
        $scope.new_creature_template = angular.copy($scope.current_creature_template);
      })
        .error(function (data, status, header, config) {
        console.log("Error in CREATURE_TEMPLATE $http.get request");
      });

      /* We have a creature selected and default active tab is creatureTemplate */
      $scope.isCreatureSelected = true;
      $scope.creatureTabs.creatureTemplate = true;

      /* Retrieve all creature_equip_template datas */
      $http.get( app.api + "creature/equip_template/" + $stateParams.id)
        .success(function (data, status, header, config) {

        /* current_* mantains the database state
        *  new_*     mantains the editor state  */
        $scope.current_creature_equip_template = data[0];
        $scope.new_creature_equip_template = angular.copy($scope.current_creature_equip_template);
      })
        .error(function (data, status, header, config) {
        console.log("Error in CREATURE_EQUIP_TEMPLATE $http.get request");
      });
    } else {
      /* We have no creature selected and default active tab is search */
      $scope.isCreatureSelected = false;
      $scope.creatureTabs.search = true;
    }

    /* [Function] Search */
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

    /* [Function] Generate SQL Script for Creature */
    $scope.generateCreatureScript = function() {

      if (!$scope.isCreatureSelected) {
        $scope.creatureScript = "# No Creature selected";
        return;
      }

      $scope.creatureScript = "";

      var whereCondition = "entry = " + $scope.current_creature_template.entry;

      // creature_template
      $scope.creatureScript += app.getUpdateQuery("creature_template", whereCondition, $scope.current_creature_template, $scope.new_creature_template);

      // creature_equip_template
      $scope.creatureScript += app.getUpdateQuery("creature_equip_template", whereCondition, $scope.current_creature_equip_template, $scope.new_creature_equip_template);

    };

    /* [Function] disactive all tabs */
    $scope.disactiveAllTabs = function() {
      angular.forEach($scope.creatureTabs, function(value, key) {
        value = false;
      });
    };

    /* [Function] open SQL Script tab */
    $scope.openScriptTab = function() {
      $scope.disactiveAllTabs();
      $scope.generateCreatureScript();
      $scope.creatureTabs.script = true;
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
