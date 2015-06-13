/*jslint browser: true, white: true, plusplus: true, es5: true, eqeq: true*/
/*global angular, console, alert, squel*/

(function () {
  'use strict';

  var app = angular.module('keira2');

  app.controller("InfoController", function ($scope, $http) {

    // Eventual error message
    $scope.errorText = "";

    // Keira version
    $scope.keiraVersion = "2.1.1";
    $scope.keiraBranch  = "3.3.5";
    $scope.keiraTag     = "v" + $scope.keiraVersion;

    // API min required version
    $scope.apiRequiredVersion = 0.4;

    // API version
    $http.get(app.api + "/api")
      .success(function (data, status, header, config) {
      $scope.apiVersion = data.api_version;
      $scope.apiBranch  = data.api_branch;

      if (parseFloat($scope.apiVersion, 10) < parseFloat($scope.apiRequiredVersion, 10)) {
        $scope.errorText = "ERROR: Your TrinityCore JSON API version is " + $scope.apiVersion + ", but Keira2 requires version " + $scope.apiRequiredVersion + ". Please update your API.";
      }
    })
      .error(function (data, status, header, config) {
      $scope.errorText = "ERROR: API not found, please edit your config.js file and set the path of your TrinityCore JSON API istance.";
      console.log("[ERROR] /version/ $http.get request failed");
    });

    // Database world version
    $http.get(app.api + "/version")
      .success(function (data, status, header, config) {
      $scope.databaseVersion  = data[0].db_version;
      $scope.coreVersion      = data[0].core_version;
      $scope.coreRevision     = data[0].core_revision;
    })
      .error(function (data, status, header, config) {
      console.log("[ERROR] /version/ $http.get request failed");
    });

    // Check for newer versions
    $scope.updateAvaialable = false;

    if ($scope.keiraVersion != "DEV") {
      $http.get( "https://api.github.com/repos/Helias/Keira2/releases" )
        .success(function (data, status, header, config) {

        var latestReleaseTag = data[0].tag_name;

        if ($scope.keiraTag != latestReleaseTag) {
          $scope.updateAvaialable = true;
        }

      })
        .error(function (data, status, header, config) {
        console.log("[ERROR] https://api.github.com/repos/Helias/Keira2/releases $http.get request failed");
      });
    }

  });

}());
