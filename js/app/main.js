/*jslint browser: true, white: true, plusplus: true, eqeq: true*/
/*global angular, console, alert, squel*/
/*jslint es5: true */

(function () {
  'use strict';

  var app = angular.module('keira2', ['ui.router', 'ui.bootstrap', 'chieffancypants.loadingBar', 'tableSort', 'jdf.ngThemeSwitcher', 'ngStorage', 'hljs']);

  app.run(function($rootScope, $uibModal, $stateParams, $localStorage) {

    if (!app.api) {
      if ($localStorage.api) {
        app.api = $localStorage.api;
      } else {
        app.api = app.defaultAPI;
      }
    }

    /* TrinityCore Documentation wiki */
    $rootScope.wikiLink = "http://collab.kpsn.org/display/tc/";

    // set the default version
    $rootScope.$storage = $localStorage.$default({
      version: {
        name: app.defaultVersion
      }
    });

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
     * TemplateUrl => content of the modal (file html inside the folder "modals")
     * object      => new_tablename the object responsible of the table (example: new_creature_template)
     * property    => field of the table to modify (example: npcflag)
     * numValues   => number of the total values (flag) of the property
     */
    $rootScope.openFlagModal = function (TemplateUrl, object, property, numValues) {

      if ( !$rootScope.isEntrySelected() ) { return; }

      var modalInstance = $uibModal.open({
        templateUrl: TemplateUrl,
        controller: "FlagModalController",
        size: '',
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
        // if all the flags are choosen assign -1 to Res
        if (Res == (Math.pow(2, numValues)-1)) {
          Res = -1;
        }
        object[property] = Res;
      });

    };

    /* Modal to handle generic values:
     * object      => new_tablename the object responsible of the table (example: new_creature_template)
     * property    => field of the table to modify (example: npcflag)
     * constant    => name of the constant that will be passed to ValueModalController
     * modifier    => an additional value to constant
     */
    $rootScope.openValueModal = function (object, property, constant, modifier) {

      if ( !$rootScope.isEntrySelected() ) { return; }

      if (constant == null) {
        constant = property;
      }

      if (modifier == null) {
        modifier = 0;
      }

      var modalInstance = $uibModal.open({
        templateUrl: "partials/modals/value.html",
        controller: "ValueModalController",
        size: '',
        resolve: {
          property: function () {
            return property;
          },
          constant: function () {
            return constant;
          },
          modifier: function () {
            return modifier;
          }
        }
      });

      // When the modal will be closed this function takes the new value to assign
      modalInstance.result.then(function (Res) {
        object[property] = Res + modifier;
      });

    };

    /* Modal to handle generic values:
     * object      => new_tablename the object responsible of the table (example: new_creature_template)
     * property    => field of the table to modify (example: npcflag)
     * constant    => name of the constant that will be passed to ValueModalController
     */
    $rootScope.openBagFamilyModal = function (object, property, constant) {

      if ( !$rootScope.isEntrySelected() ) { return; }

      if (constant == null) {
        constant = property;
      }

      var modalInstance = $uibModal.open({
        templateUrl: "partials/item/modals/bag-family.html",
        controller: "BagFamilyModalController",
        size: '',
        resolve: {
          property: function () {
            return property;
          },
          constant: function () {
            return constant;
          }
        }
      });

      // When the modal will be closed this function takes the new value to assign
      modalInstance.result.then(function (Res) {
        object[property] = Res;
      });

    };

    $rootScope.openSearchModal = function (object, property, search_param) {

      if ( !$rootScope.isEntrySelected() ) { return; }

      if (!search_param) {
        search_param = property;
      }

      var modalInstance = $uibModal.open({
        templateUrl: "partials/modals/search.html",
        controller: "SearchModalController",
        size: '',
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

    $rootScope.openUnusuedGuidModal = function (object, property, table) {

      if ( !$rootScope.isEntrySelected() ) { return; }

      var modalInstance = $uibModal.open({
        templateUrl: "partials/modals/unusued-guid-search.html",
        controller: "UnusuedGuidModalController",
        size: '',
        resolve: {
          property: function () {
            return property;
          },
          table: function () {
            return table;
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

      var modalInstance = $uibModal.open({
        templateUrl: "partials/modals/sql-script-modal.html",
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

      var modalInstance = $uibModal.open({
        templateUrl: "partials/modals/sql-script-modal.html",
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

      var modalInstance = $uibModal.open({
        templateUrl: "partials/modals/sql-script-modal.html",
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
