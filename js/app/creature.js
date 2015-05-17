/*jslint browser: true, white: true, plusplus: true */
/*global angular, console, alert*/

(function () {
  'use strict';

  var app = angular.module('keira2');

  app.controller("CreatureController", function ($scope, $http, $stateParams, $modal) {

    // Initialize some variables needed for *_item_loot
    $scope.itemLoot = {};
    $scope.row = "";

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
        console.log("Error in CREATURE_TEMPLATE $http.get request");
      });

      /* Retrieve all creature_equip_template datas */
      $http.get( app.api + "creature/equip_template/" + $stateParams.id)
        .success(function (data, status, header, config) {
        $scope.current_creature_equip_template = data[0];
        $scope.new_creature_equip_template = angular.copy($scope.current_creature_equip_template);
      })
        .error(function (data, status, header, config) {
        console.log("Error in CREATURE_EQUIP_TEMPLATE $http.get request");
      });

      /* Retrieve all creature_template_addon datas */
      $http.get( app.api + "creature/template_addon/" + $stateParams.id)
        .success(function (data, status, header, config) {
        $scope.current_creature_template_addon = data[0];
        $scope.new_creature_template_addon = angular.copy($scope.current_creature_template_addon);
      })
        .error(function (data, status, header, config) {
        console.log("Error in CREATURE_TEMPLATE_ADDON $http.get request");
      });

      /* Retrieve all creature_onkill_reputation datas */
      $http.get( app.api + "creature/onkill_reputation/" + $stateParams.id)
        .success(function (data, status, header, config) {
        $scope.current_creature_onkill_reputation = data[0];
        $scope.new_creature_onkill_reputation = angular.copy($scope.current_creature_onkill_reputation);
      })
        .error(function (data, status, header, config) {
        console.log("Error in CREATURE_ONKILL_REPUTATION $http.get request");
      });

      /* Retrieve all creature_template_loot datas */
      $http.get( app.api + "loot/template/creature/" + $stateParams.id)
        .success(function (data, status, header, config) {
        $scope.current_creature_loot_template = data;
        $scope.new_creature_loot_template = angular.copy($scope.current_creature_loot_template);
      })
        .error(function (data, status, header, config) {
        console.log("Error in CREATURE_LOOT_TEMPLATE $http.get request");
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


    /* [Functions] loot_template

    param:
        rowId => index of the array new_*_loot_template that contain the property of the loot_item
    */
    $scope.selectRow = function(rowIdChild) {
      if($scope.row !== "")
      {
        angular.element($scope.row).removeClass("trSelected");
      }
      $scope.row = rowIdChild.target.parentNode.parentNode;
      angular.element($scope.row).addClass("trSelected");
      var rowId = $scope.row.id;
      $scope.itemLoot = angular.copy($scope.new_creature_loot_template[rowId]);
      $scope.itemLoot.id = rowId;
    };

    // Add an item to *_item_loot
    $scope.addItem_loot = function(rowId) {
      var lootLen = $scope.new_creature_loot_template.length;

      $scope.itemLoot.Entry = $scope.new_creature_loot_template[0].Entry;
      $scope.new_creature_loot_template[lootLen] = angular.copy($scope.itemLoot);
    };

    // Edit an item loot property
    $scope.editItem_loot = function(rowId) {
      $scope.new_creature_loot_template[rowId] = angular.copy($scope.itemLoot);
    };

    // Remove an item to *_item_loot
    $scope.deleteItem_loot = function(rowId) {
      $scope.new_creature_loot_template.splice(rowId, 1);
    };

  });

}());
