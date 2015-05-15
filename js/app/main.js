/*jslint browser: true, white: true*/
/*global angular, console, alert, squel*/

(function () {
  'use strict';

  var app = angular.module('keira2', ['ui.router', 'ui.bootstrap', 'chieffancypants.loadingBar', 'tableSort']);

  /* getUpdateQuery inputs:
  *   - tableName -> the name of the table (example: "creature_template")
  *   - whereCondition -> the WHERE condition (example: "entry = 30")
  *   - currentRow -> object of the original table
  *   - newRow -> object bound with ng-model to view
  */
  app.getUpdateQuery = function(tableName, whereCondition, currentRow, newRow) {

    var key,
        query = squel.update();

    query.table(tableName);

    for (key in currentRow) {
      if (currentRow[key] !== newRow[key]) {
        query.set(key, newRow[key]);
      }
    }

    query.where(whereCondition);

    return query.toString();
  };

  /* TODO: Empty controllers, will be moved in their own files once implemented */
  app.controller("SmartAIController", function ($scope, $http, $stateParams) {});
  app.controller("ConditionsController", function ($scope, $http, $stateParams) {});
  app.controller("OtherController", function ($scope, $http, $stateParams) {});
  app.controller("CharacterController", function ($scope, $http, $stateParams) {});
  app.controller("SQLController", function ($scope, $http, $stateParams) {});

}());
