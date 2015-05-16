/*jslint browser: true, white: true*/
/*global angular, console, alert*/

(function () {
  'use strict';

  var app = angular.module('keira2');

  app.controller("ItemController", function ($scope, $http) {
    /*
    $scope.search = function (ItemEntry, ItemName) {
      var request = app.api + "item/template/";

      if ((typeof ItemEntry !== "undefined") && (ItemEntry !== "")) {

        request += ItemEntry;

      } else if (typeof ItemName !== "undefined") {

        request += ItemName;

      } else {

        alert("Insert Entry or Name of an item");
        return;

      }

      $http.get(request)
        .success(function (data, status, header, config) {
        $scope.items = data;
      })
        .error(function (data, status, header, config) {
        console.log("Error in ITEM SEARCH $http.get request");
      });

    };
    */
  });

}());
