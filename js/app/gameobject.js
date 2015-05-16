/*jslint browser: true, white: true*/
/*global angular, console, alert*/

(function () {
  'use strict';

  var app = angular.module('keira2');

  app.controller("GameobjectController", function ($scope, $http) {
    /*
    $scope.search = function (GameobjectEntry, GameobjectName) {
      var request = app.api + "gameobject/template/";

      if ((typeof GameobjectEntry !== "undefined") && (GameobjectEntry !== "")) {

        request += GameobjectEntry;

      } else if (typeof GameobjectName !== "undefined") {

        request += GameobjectName;

      } else {

        alert("Insert Entry or Name of a gameobject");
        return;

      }

      $http.get(request)
        .success(function (data, status, header, config) {
        $scope.gameobjects = data;
      })
        .error(function (data, status, header, config) {
        console.log("Error in GAMEOBJECT SEARCH $http.get request");
      });

    };
    */
  });

}());
