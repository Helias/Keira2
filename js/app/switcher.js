/*jslint browser: true, white: true, plusplus: true*/
/*global angular, console, alert*/

(function () {
  'use strict';

  var app = angular.module('keira2');

  app.controller("SwitcherController", function ($scope, $http, $localStorage, $location, $rootScope, $state) {

    /* Versions */
    $scope.versions = [
      { name: "3.3.5" },
      { name: "6.x" }
      ];

    /* Themes */
    $scope.themes = [
      { name: "Default", url: "css/bootstrap.min.css"},
      { name: "Amelia", url: "css/themes/bootswatch/3.3.0/amelia.css"},
      { name: "Cerulean", url: "css/themes/bootswatch/3.3.4/cerulean.css"},
      { name: "Cosmo", url: "css/themes/bootswatch/3.3.4/cosmo.css"},
      { name: "Cyborg", url: "css/themes/bootswatch/3.3.4/cyborg.css"},
      { name: "Darkly", url: "css/themes/bootswatch/3.3.4/darkly.css"},
      { name: "Flatly", url: "css/themes/bootswatch/3.3.4/flatly.css"},
      { name: "Journal", url: "css/themes/bootswatch/3.3.4/journal.css"},
      { name: "Lumen", url: "css/themes/bootswatch/3.3.4/lumen.css"},
      { name: "Paper", url: "css/themes/bootswatch/3.3.4/paper.css"},
      { name: "Readable", url: "css/themes/bootswatch/3.3.4/readable.css"},
      { name: "Sandstone", url: "css/themes/bootswatch/3.3.4/sandstone.css"},
      { name: "Simplex", url: "css/themes/bootswatch/3.3.4/simplex.css"},
      { name: "Slate", url: "css/themes/bootswatch/3.3.4/slate.css"},
      { name: "Spacelab", url: "css/themes/bootswatch/3.3.4/spacelab.css"},
      { name: "Superhero", url: "css/themes/bootswatch/3.3.4/superhero.css"},
      { name: "United", url: "css/themes/bootswatch/3.3.4/united.css"},
      { name: "Yeti", url: "css/themes/bootswatch/3.3.4/yeti.css"}
    ];

    // initialize localStorage with default theme
    $rootScope.$storage = $localStorage.$default({
      theme: {
        name: $scope.themes[0].name,
        url: $scope.themes[0].urls
      },
      version: {
        name: $scope.versions[0].name
      }
    });

    // the theme switching method
    $scope.setTheme = function(theme) {
      // don't do anything if the theme is the same
      if (theme.name !== $scope.theme.name) {
        // set the model so the directive updates
        $scope.theme = theme;
        // save the new theme to localStorage
        $scope.$storage.theme = theme;
      }
    };

    // the version switching method
    $scope.setVersion = function(version) {
      // set the model so the directive updates
      $scope.version = version;
      // save the new version to localStorage
      $scope.$storage.version = version;

      if (app.apiInstances[version.name]) {
        app.api = app.apiInstances[version.name];
        $state.reload();
      }
      console.log("[INFO] API path changed: " + app.api);
    };

    // initialize theme and version - pull from localStorage (which gets the default if none is set)
    $scope.theme   = $scope.$storage.theme;
    $rootScope.version = $scope.$storage.version;
  });

}());
