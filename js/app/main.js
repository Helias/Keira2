/*jslint browser: true, white: true, plusplus: true*/
/*global angular, console, alert, squel*/
/*jslint es5: true */

(function () {
  'use strict';

  var app = angular.module('keira2', ['ui.router', 'ui.bootstrap', 'chieffancypants.loadingBar', 'tableSort']);

  app.run(function($rootScope, $modal) {

    /* TrinityCore Documentation wiki */
    $rootScope.wikiLink = "http://collab.kpsn.org/display/tc/";

    /* Open modal to handle flags params:
     * size        => size of the modal (example: '', 'sm', 'lg'), '' is the default size
     * TemplateUrl => content of the modal (file html inside the folder "modals")
     * object      => new_tablename the object responsible of the table (example: new_creature_template)
     * property    => property of the table to modify (example: npcflag)
     * numValues   => number of the total values (flag) of the property
    */
    $rootScope.openFlagModal = function (size, TemplateUrl, object, property, numValues) {

      if (object === undefined) { return; }

      var modalInstance = $modal.open({
        templateUrl: TemplateUrl,
        controller: "FlagModalController",
        size: size,
        resolve: {
          propertyVal: function () {
            return object[property];
          },
          numValuesVal: function () {
            return numValues;
          }
        }
      });

      // When the modal will be closed this function takes the new value to assign
      modalInstance.result.then(function (Res) {
        object[property] = Res;
      });

    };

    /* Loot_template */

    // Initialize some variables needed for *_item_loot
    $rootScope.itemLoot = {};
    $rootScope.row = "";

    /* [Functions] loot_template
     * input:
     * - rowId => index of the array new_*_loot_template that contain the property of the loot_item
     */
    $rootScope.selectRow = function(rowIdChild, itemLoot, loot_template) {

      if ($rootScope.row !== "") {
        angular.element($rootScope.row).removeClass("trSelected");
      }

      $rootScope.row = rowIdChild.target.parentNode.parentNode;
      angular.element($rootScope.row).addClass("trSelected");
      var rowId = $rootScope.row.id, i = 0, new_loot_template = angular.copy(loot_template);

      for (i in new_loot_template[rowId]) {
        itemLoot[i] = new_loot_template[rowId][i];
      }

      itemLoot.id = rowId;
    };

    // Add an item to *_item_loot
    $rootScope.addItem_loot = function(rowId, itemLoot, new_loot_template) {
      var i = 0, lootLen = new_loot_template.length;
      for (i = 0; i < lootLen; i++)
      {
        if (new_loot_template[i].Item === itemLoot.Item)
        {
          alert("The item " + itemLoot.Item + " already exists in this loot_template, you can't add it, you can only delete or edit it");
          return;
        }
      }

      itemLoot.Entry = new_loot_template[0].Entry;
      new_loot_template[lootLen] = angular.copy(itemLoot);
    };

    // Edit an item loot property
    $rootScope.editItem_loot = function(rowId, itemLoot, new_loot_template) {
      new_loot_template[rowId] = angular.copy(itemLoot);
    };

    // Remove an item to *_item_loot
    $rootScope.deleteItem_loot = function(rowId, new_loot_template) {
      console.log(new_loot_template);
      new_loot_template.splice(rowId, 1);
    };


    /* Open modal to show Full SQL Script */
    $rootScope.openFullScriptModal = function(lootObject, tableName, primaryKey1) {

      if (lootObject === undefined) { return; }

      var modalInstance = $modal.open({
        templateUrl: "partials/full-script-modal.html",
        controller: "FullScriptModalController",
        size: 'lg',
        resolve: {
          lootObject: function () {
            return lootObject;
          },
          tableName: function () {
            return tableName;
          },
          primaryKey1: function() {
            return primaryKey1;
          }
        }
      });
    };

  });

  /* TODO: Empty controllers, will be moved in their own files once implemented */
  app.controller("SmartAIController", function ($scope, $http, $stateParams) {});
  app.controller("ConditionsController", function ($scope, $http, $stateParams) {});
  app.controller("OtherController", function ($scope, $http, $stateParams) {});
  app.controller("CharacterController", function ($scope, $http, $stateParams) {});
  app.controller("SQLController", function ($scope, $http, $stateParams) {});

}());
