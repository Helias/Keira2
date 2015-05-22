/*jslint browser: true, white: true, plusplus: true */
/*global angular, console, alert*/

(function () {
  'use strict';

  var app = angular.module('keira2');

  app.controller("ItemController", function ($scope, $http, $stateParams, $modal) {

    /* All Item tabs, disabled by default.
    *  Only one tab can be active at a time */
    $scope.itemTabs = {
      search          : false,
      template        : false,
      itemLoot        : false,
      disenchantLoot  : false,
      prospectingLoot : false,
      millingLoot     : false,
      enchantment     : false,
      script          : false
    };

    /* Init arrays */
    $scope.current_item_loot_template         = [];
    $scope.new_item_loot_template             = [];
    $scope.current_disenchant_loot_template   = [];
    $scope.new_disenchant_loot_template       = [];
    $scope.current_prospecting_loot_template  = [];
    $scope.new_prospecting_loot_template      = [];
    $scope.current_milling_loot_template      = [];
    $scope.new_milling_loot_template          = [];
    $scope.current_item_enchantment_template  = [];
    $scope.new_item_enchantment_template      = [];

    /* Check if a item is selected */
    if ($stateParams.id) {

      /* We have a item selected and default active tab is template */
      $scope.isItemSelected = true;
      $scope.itemTabs.template = true;

      /*  Following lines retrieve all Item datas
       *  current_* mantains the database state
       *  new_*     mantains the editor state
       *  we will use those two objects to generate the SQL queries
       */

      /* Retrieve all item_template datas */
      $http.get( app.api + "item/template/" + $stateParams.id )
        .success(function (data, status, header, config) {
        $scope.current_item_template = data[0];
        $scope.new_item_template = angular.copy($scope.current_item_template);
        $scope.selectionText = $scope.current_item_template.name + " (" + $scope.current_item_template.entry +") ";
      })
        .error(function (data, status, header, config) {
        console.log("[ERROR] item/template/" + $stateParams.id + " $http.get request failed");
      });

      /* Retrieve all disenchant_loot_template datas */
      $http.get( app.api + "loot/template/disenchant/" + $stateParams.id )
        .success(function (data, status, header, config) {
        $scope.current_disenchant_loot_template = data;
        $scope.new_disenchant_loot_template = angular.copy($scope.current_disenchant_loot_template);
      })
        .error(function (data, status, header, config) {
        console.log("[ERROR] loot/template/disenchant/" + $stateParams.id + " $http.get request failed");
      });

      /* Retrieve all prospecting_loot_template datas */
      $http.get( app.api + "loot/template/prospecting/" + $stateParams.id )
        .success(function (data, status, header, config) {
        $scope.current_prospecting_loot_template = data;
        $scope.new_prospecting_loot_template = angular.copy($scope.current_prospecting_loot_template);
      })
        .error(function (data, status, header, config) {
        console.log("[ERROR] loot/template/prospecting/" + $stateParams.id + " $http.get request failed");
      });

      /* Retrieve all milling_loot_template datas */
      $http.get( app.api + "loot/template/milling/" + $stateParams.id )
        .success(function (data, status, header, config) {
        $scope.current_milling_loot_template = data;
        $scope.new_milling_loot_template = angular.copy($scope.current_milling_loot_template);
      })
        .error(function (data, status, header, config) {
        console.log("[ERROR] loot/template/item/" + $stateParams.id + " $http.get request failed");
      });

      /* Retrieve all item_loot_template datas */
      $http.get( app.api + "loot/template/item/" + $stateParams.id )
        .success(function (data, status, header, config) {
        $scope.current_item_loot_template = data;
        $scope.new_item_loot_template = angular.copy($scope.current_item_loot_template);
      })
        .error(function (data, status, header, config) {
        console.log("[ERROR] loot/template/item/" + $stateParams.id + " $http.get request failed");
      });

      /* Retrieve all item_enchantment_template datas */
      $http.get( app.api + "item/enchantment/" + $stateParams.id )
        .success(function (data, status, header, config) {
        $scope.current_item_enchantment_template = data;
        $scope.new_item_enchantment_template = angular.copy($scope.current_item_enchantment_template);
      })
        .error(function (data, status, header, config) {
        console.log("[ERROR] item/enchantment/" + $stateParams.id + " $http.get request failed");
      });

    } else {
      /* We have no item selected and default active tab is search */
      $scope.isItemSelected = false;
      $scope.itemTabs.search = true;
      $scope.selectionText = "No Item selected. Please use Search to select one.";
    }

    /* [Function] Search */
    $scope.search = function (itemEntry, itemName) {

      if ( itemEntry && !itemName && (itemEntry.length < 2) ) {
        alert("Please insert an ID of at least 2 characters");
        return;
      }
      if ( itemName && !itemEntry && (itemName.length < 3) ) {
        alert("Please insert a Title of at least 3 characters");
        return;
      }

      $http.get( app.api + "/search/item/", {
        params: {
          id: itemEntry,
          name: itemName
        }
      }).success(function (data, status, header, config) {
        $scope.items = data;
      })
        .error(function (data, status, header, config) {
        console.log("[ERROR] ITEM SEARCH $http.get request failed");
      });

    };

    /* [Function] Generate SQL Script for Item */
    $scope.generateItemScript = function() {

      if (!$scope.isItemSelected) {
        $scope.itemScript = "# No Item selected";
        return;
      }

      $scope.itemScript = "";

      var whereCondition = "Entry = " + $scope.current_item_template.Entry;

      $scope.itemScript += app.getUpdateQuery("item_template", whereCondition, $scope.current_item_template, $scope.new_item_template);
    };

    /* [Function] disactive all tabs */
    $scope.disactiveAllTabs = function() {
      angular.forEach($scope.itemTabs, function(value, key) {
        value = false;
      });
    };

    /* [Function] open SQL Script tab */
    $scope.openScriptTab = function() {
      $scope.disactiveAllTabs();
      $scope.generateItemScript();
      $scope.itemTabs.script = true;
    };

  });

}());
