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
      templateAddon         : false,
      equipTemplate         : false,
      onKillReputation      : false,
      creatureLoot          : false,
      pickpocketLoot        : false,
      skinLoot              : false,
      spawns                : false,
      spawnsAddon           : false,
      script                : false
    };

    /* Init arrays */
    $scope.current_creature_loot_template = [];
    $scope.new_creature_loot_template = [];
    $scope.current_skinning_loot_template = [];
    $scope.new_skinning_loot_template = [];
    $scope.current_pickpocketing_loot_template = [];
    $scope.new_pickpocketing_loot_template = [];
    $scope.current_spawns = [];
    $scope.new_spawns = [];
    $scope.current_creature_addon = [];
    $scope.new_creature_addon = [];
    $scope.current_npc_vendor = [];
    $scope.new_npc_vendor = [];
    $scope.current_npc_trainer = [];
    $scope.new_npc_trainer = [];

    /* Check if a creature is selected */
    if ($stateParams.id) {

      /* We have a creature selected and default active tab is creatureTemplate */
      $scope.isCreatureSelected = true;
      $scope.creatureTabs.creatureTemplate = true;

      /*  Following lines retrieve all Creature datas
       *  current_* mantains the database state
       *  new_*     mantains the editor state
       *  we will use those two objects to generate UPDATE queries
       */

      /* Retrieve all creature_template datas */
      $http.get( app.api + "creature/template/" + $stateParams.id)
        .success(function (data, status, header, config) {
        $scope.current_creature_template = data[0];
        $scope.new_creature_template = angular.copy($scope.current_creature_template);
      })
        .error(function (data, status, header, config) {
        console.log("[ERROR] creature/template/" + $stateParams.id + " $http.get request failed");
      });

      /* Retrieve all creature_equip_template datas */
      $http.get( app.api + "creature/equip_template/" + $stateParams.id)
        .success(function (data, status, header, config) {
        $scope.current_creature_equip_template = data[0];
        $scope.new_creature_equip_template = angular.copy($scope.current_creature_equip_template);
      })
        .error(function (data, status, header, config) {
        console.log("[ERROR] creature/equip_template/" + $stateParams.id + " $http.get request failed");
      });

      /* Retrieve all creature_template_addon datas */
      $http.get( app.api + "creature/template_addon/" + $stateParams.id)
        .success(function (data, status, header, config) {
        $scope.current_creature_template_addon = data[0];
        $scope.new_creature_template_addon = angular.copy($scope.current_creature_template_addon);
      })
        .error(function (data, status, header, config) {
        console.log("[ERROR] creature/template_addon/" + $stateParams.id + " $http.get request failed");
      });

      /* Retrieve all creature_onkill_reputation datas */
      $http.get( app.api + "creature/onkill_reputation/" + $stateParams.id)
        .success(function (data, status, header, config) {
        $scope.current_creature_onkill_reputation = data[0];
        $scope.new_creature_onkill_reputation = angular.copy($scope.current_creature_onkill_reputation);
      })
        .error(function (data, status, header, config) {
        console.log("[ERROR] creature/onkill_reputation/ $http.get request failed");
      });

      /* Retrieve all creature_template_loot datas */
      $http.get( app.api + "loot/template/creature/" + $stateParams.id)
        .success(function (data, status, header, config) {
        $scope.current_creature_loot_template = data;
        $scope.new_creature_loot_template = angular.copy($scope.current_creature_loot_template);
      })
        .error(function (data, status, header, config) {
        console.log("[ERROR] loot/template/creature/" + $stateParams.id + " $http.get request failed");
      });

      /* Retrieve all skinning_template_loot datas */
      $http.get( app.api + "loot/template/skinning/" + $stateParams.id)
        .success(function (data, status, header, config) {
        $scope.current_skinning_loot_template = data;
        $scope.new_skinning_loot_template = angular.copy($scope.current_skinning_loot_template);
      })
        .error(function (data, status, header, config) {
        console.log("[ERROR] loot/template/skinning/" + $stateParams.id + " $http.get request failed");
      });

      /* Retrieve all pickpocketing_template_loot datas */
      $http.get( app.api + "loot/template/pickpocketing/" + $stateParams.id)
        .success(function (data, status, header, config) {
        $scope.current_pickpocketing_loot_template = data;
        $scope.new_pickpocketing_loot_template = angular.copy($scope.current_pickpocketing_loot_template);
      })
        .error(function (data, status, header, config) {
        console.log("[ERROR] loot/template/pickpocketing/" + $stateParams.id + " $http.get request failed");
      });

      /* Retrieve all spawns */
      $http.get( app.api + "creature/spawn/id/" + $stateParams.id)
        .success(function (data, status, header, config) {
        $scope.current_creature = data;
        $scope.new_creature = angular.copy($scope.current_creature);
      })
        .error(function (data, status, header, config) {
        console.log("[ERROR] creature/spawn/id/" + $stateParams.id + " $http.get request failed");
      });

      /* Retrieve all spawns addon */
      $http.get( app.api + "creature/spawn/addon/id/" + $stateParams.id)
        .success(function (data, status, header, config) {
        $scope.current_creature_addon = data;
        $scope.new_creature_addon = angular.copy($scope.current_creature_addon);
      })
        .error(function (data, status, header, config) {
        console.log("[ERROR] creature/spawn/addon/id/" + $stateParams.id + " $http.get request failed");
      });

      /* Retrieve all npc vendor */
      $http.get( app.api + "npc_vendor/creature/" + $stateParams.id)
        .success(function (data, status, header, config) {
        $scope.current_npc_vendor = data;
        $scope.new_npc_vendor = angular.copy($scope.current_npc_vendor);
      })
        .error(function (data, status, header, config) {
        console.log("[ERROR] npc_vendor/creature/" + $stateParams.id + " $http.get request failed");
      });

      /* Retrieve all npc trainer */
      $http.get( app.api + "npc_trainer/creature/" + $stateParams.id )
        .success(function (data, status, header, config) {
        $scope.current_npc_trainer = data;
        $scope.new_npc_trainer = angular.copy($scope.current_npc_trainer);
      })
        .error(function (data, status, header, config) {
        console.log("[ERROR] npc_trainer/creature/" + $stateParams.id + " $http.get request failed");
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
        console.log("[ERROR] CREATURE SEARCH $http.get request failed");
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

      // creature_template_addon
      $scope.creatureScript += app.getUpdateQuery("creature_template_addon", whereCondition, $scope.current_creature_template_addon, $scope.new_creature_template_addon);

      // creature_onkill_reputation
      $scope.creatureScript += app.getUpdateQuery("creature_onkill_reputation", whereCondition, $scope.current_creature_onkill_reputation, $scope.new_creature_onkill_reputation);

      // creature_loot_template
      // TODO change with Diff:
      // app.getFullDeleteInsert("creature_loot_template", "Entry", $scope.new_creature_loot_template);
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

  });

}());
