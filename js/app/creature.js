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

  });

  app.controller("CreatureLootController", function ($scope, $http, $stateParams, $modal) {

    /* At start we have no row selected */
    $scope.selectedRow = -1;

    /* The item currently selected by the user (bound to the view) */
    $scope.selected = {
      Entry         : $scope.Entry = parseInt($stateParams.id, 10),
      Item          : 0,
      Reference     : 0,
      Chance        : 0,
      QuestRequired : 0,
      LootMode      : 0,
      GroupId       : 0,
      MinCount      : 0,
      MaxCount      : 0,
      Comment       : ''
    };

    /* Type check */
    $scope.parseValues = function() {

      $scope.selected.Item          = parseInt($scope.selected.Item, 10);
      $scope.selected.Reference     = parseInt($scope.selected.Reference, 10);
      $scope.selected.Chance        = parseFloat($scope.selected.Chance, 10);
      $scope.selected.QuestRequired = parseInt($scope.selected.QuestRequired, 10);
      $scope.selected.LootMode      = parseInt($scope.selected.LootMode, 10);
      $scope.selected.GroupId       = parseInt($scope.selected.GroupId, 10);
      $scope.selected.MinCount      = parseInt($scope.selected.MinCount, 10);
      $scope.selected.MaxCount      = parseInt($scope.selected.MaxCount, 10);
    };

    /* Select a row from collection */
    $scope.selectRow = function(rows, index) {
      $scope.selectedRow = index;
      $scope.selected = angular.copy(rows[index]);
    };

    /* Edit selected row */
    $scope.editSelectedRowOf = function(rows) {
      rows.splice($scope.selectedRow, 1, angular.copy($scope.selected));
    };

    /* Delete selected row from collection */
    $scope.deleteSelectedRowFrom = function(rows) {
      rows.splice($scope.selectedRow, 1);
    };

    /* Add selected row to collection */
    $scope.addRowTo = function(rows, primaryKey2) {
      var i;
      $scope.parseValues();

      // check primaryKey2 uniqueness
      for (i = 0; i < rows.length; i++) {
        if (rows[i][primaryKey2] === $scope.selected.Item) {
          alert("Duplicate row with `" + primaryKey2 + "` = " + $scope.selected.Item);
          return;
        }
      }

      rows.splice(0, 0, angular.copy($scope.selected));
    };

  });
}());
