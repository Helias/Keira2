/*jslint browser: true, white: true*/
/*global angular, console, alert, squel*/

(function () {
  'use strict';

  var app = angular.module('keira2', ['ui.router', 'ui.bootstrap', 'chieffancypants.loadingBar', 'tableSort']);

  app.getUpdateQuery = function(tableName, tableIndex, currentRow, newRow) {

    var key,
        query = squel.update();

    query.table("creature_template");

    for (key in currentRow) {
      if (currentRow[key] !== newRow[key]) {
        query.set(key, newRow[key]);
      }
    }

    query.where("entry = " + tableIndex);

    return query.toString();
  };

  /* TODO: Empty controllers, will be moved in their own files once implemented */
  app.controller("SmartAIController", function ($scope, $http, $stateParams) {});
  app.controller("ConditionsController", function ($scope, $http, $stateParams) {});
  app.controller("OtherController", function ($scope, $http, $stateParams) {});
  app.controller("CharacterController", function ($scope, $http, $stateParams) {});
  app.controller("SQLController", function ($scope, $http, $stateParams) {});

}());
