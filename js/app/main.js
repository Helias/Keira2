/*jslint browser: true, white: true, plusplus: true, eqeq: true*/
/*global angular, console, alert, squel*/
/*jslint es5: true */

(function () {
  'use strict';

  var app = angular.module('keira2', ['ui.router', 'ui.bootstrap', 'chieffancypants.loadingBar', 'tableSort', 'jdf.ngThemeSwitcher', 'ngStorage', 'hljs']);

  app.run(function($rootScope, $modal, $stateParams) {

    /* TrinityCore Documentation wiki */
    $rootScope.wikiLink = "http://collab.kpsn.org/display/tc/";

    /* [Function] check if entry is selected */
    $rootScope.isEntrySelected = function() {
      if ( $stateParams.id || ($stateParams.entryOrGuid && $stateParams.sourceType) ) {
        return true;
      } else {
        alert("Please use the Search tab and select an entry");
        return false;
      }
    };

    /* [Function] fix numeric values of a collection */
    $rootScope.fixNumericValues = function(rows) {

      var i, key;

      if (!Array.isArray(rows)) {
        for (key in rows) {
          if (rows.hasOwnProperty(key)) {
            if (!isNaN(rows[key]) && rows[key] != null && rows[key] != "") {
              rows[key] = Number(rows[key]);
            }
          }
        }
      } else {
        for (i = 0; i < rows.length; i++) {
          for (key in rows[i]) {
            if (rows[i].hasOwnProperty(key)) {
              if (!isNaN(rows[i][key]) && rows[i][key] != null && rows[i][key] != "") {
                rows[i][key] = Number(rows[i][key]);
              }
            }
          }
        }
      }
      return rows;
    };

    /* Open modal to handle flags params:
     * size        => size of the modal (example: '', 'sm', 'lg'), '' is the default size
     * TemplateUrl => content of the modal (file html inside the folder "modals")
     * object      => new_tablename the object responsible of the table (example: new_creature_template)
     * property    => field of the table to modify (example: npcflag)
     * numValues   => number of the total values (flag) of the property
    */
    $rootScope.openFlagModal = function (size, TemplateUrl, object, property, numValues) {

      if ( !$rootScope.isEntrySelected() ) { return; }

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

    /* Modal to handle generic values:
     * size        => size of the modal (example: '', 'sm', 'lg'), '' is the default size
     * TemplateUrl => content of the modal (file html inside the folder "modals")
     * object      => new_tablename the object responsible of the table (example: new_creature_template)
     * property    => field of the table to modify (example: npcflag)
     * numValues   => number of the total values (flag) of the property
    */
    $rootScope.openValueModal = function (size, TemplateUrl, object, property) {

      if ( !$rootScope.isEntrySelected() ) { return; }

      var modalInstance = $modal.open({
        templateUrl: TemplateUrl,
        controller: "ValueModalController",
        size: size,
        resolve: {
          property: function () {
            return property;
          }
        }
      });

      // When the modal will be closed this function takes the new value to assign
      modalInstance.result.then(function (Res) {
        object[property] = Res;
      });

    };

    $rootScope.openSearchModal = function (size, object, property, search_param) {

      if ( !$rootScope.isEntrySelected() ) { return; }

      var modalInstance = $modal.open({
        templateUrl: "partials/creature/modals/search.html",
        controller: "SearchModalController",
        size: size,
        resolve: {
          property: function () {
            return property;
          },
          search_param: function () {
            return search_param;
          }
        }
      });

      // When the modal will be closed this function takes the new value to assign
      modalInstance.result.then(function (Res) {
        object[property] = Res;
      });

    };


    /* Open modal to show Full SQL Script */
    $rootScope.openFullScriptModal = function(rows, tableName, primaryKey1) {

      if ( !$rootScope.isEntrySelected() ) { return; }

      var modalInstance = $modal.open({
        templateUrl: "partials/sql-script-modal.html",
        controller: "FullScriptModalController",
        size: 'lg',
        resolve: {
          rows: function () {
            return rows;
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

    /* Open modal to show Diff SQL Script */
    $rootScope.openDiffScriptModal = function(tableName, primaryKey1, primaryKey2, currentRows, newRows) {

      if ( !$rootScope.isEntrySelected() ) { return; }

      var modalInstance = $modal.open({
        templateUrl: "partials/sql-script-modal.html",
        controller: "DiffScriptModalController",
        size: 'lg',
        resolve: {
          tableName: function () {
            return tableName;
          },
          primaryKey1: function() {
            return primaryKey1;
          },
          primaryKey2: function() {
            return primaryKey2;
          },
          currentRows: function() {
            return currentRows;
          },
          newRows: function() {
            return newRows;
          }
        }
      });
    };

    /* Open modal to show Diff one-key SQL Script */
    $rootScope.openDiffOneKeyScriptModal = function(tableName, primaryKey, entityType, entity, currentRows, newRows) {

      if ( !$rootScope.isEntrySelected() ) { return; }

      var modalInstance = $modal.open({
        templateUrl: "partials/sql-script-modal.html",
        controller: "DiffOneKeyScriptModalController",
        size: 'lg',
        resolve: {
          tableName: function () {
            return tableName;
          },
          primaryKey: function() {
            return primaryKey;
          },
          entityType: function() {
            return entityType;
          },
          entity: function() {
            return entity;
          },
          currentRows: function() {
            return currentRows;
          },
          newRows: function() {
            return newRows;
          }
        }
      });
    };
  });

}());
