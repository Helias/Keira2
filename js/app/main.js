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
