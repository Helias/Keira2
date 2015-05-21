/*!
 * jdf-ngThemeSwitcher v0.1.0
 * http://jdforsythe.github.io/jdf-ngThemeSwitcher
 * Copyright (c) 2014 Jeremy Forsythe <jdforsythe@gmail.com>
 * License: MIT
 */

(function() {
  function ThemeSwitcherDirective() {
    return {
      restrict: 'E',
      scope: {
        urls: '='
      },
      // here I added our css/style.css in order to overwrite all themes
      template: '<link rel="stylesheet" ng-href="{{url}}" ng-repeat="url in urls" /><link rel="stylesheet" ng-href="css/style.css" ng-repeat="url in urls" />'
    };
  }

  angular.module('jdf.ngThemeSwitcher', [])
    .directive('themeSwitcher', ThemeSwitcherDirective);
})();
