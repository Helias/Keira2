/*jslint browser: true, white: true, plusplus: true*/
/*global angular, console, alert*/

(function () {
  'use strict';

  var app = angular.module('keira2');

  app.controller("QuestController", function ($scope, $http) {
    /*
    $scope.search = function (questId, questTitle) {
      var request = app.api + "quest/template/";

      if ((typeof questId !== "undefined") && (questId !== "")) {

        request += questId;

      } else if (typeof questTitle !== "undefined") {

        if (questTitle.length < 4) {
          alert("Please insert a string of at least 4 characters.");
          return;
        }
        request += questTitle;

      } else {

        alert("Insert ID or Title of a quest");
        return;

      }

      $http.get(request)
        .success(function (data, status, header, config) {
        $scope.quests = data;
      })
        .error(function (data, status, header, config) {
        console.log("Error in QUEST SEARCH $http.get request");
      });

    };
    */
  });

}());
