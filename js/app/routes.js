/*jslint browser: true, white: true*/
/*global angular, console, alert*/

(function () {
  'use strict';

  var app = angular.module('keira2');

  // routing
  app.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('quest', {
      url: '/quest',
      controller: 'QuestController',
      templateUrl: 'partials/quest.html'
    })
      .state('creature', {
      url: '/creature',
      controller: 'CreatureController',
      templateUrl: 'partials/creature.html'
    })
      .state('creature_template', {
      url: '/creature/:id',
      controller: 'CreatureController'
    })
      .state('gameobject', {
      url: '/gameobject',
      controller: 'GameobjectController',
      templateUrl: 'partials/gameobject.html'
    })
      .state('item', {
      url: '/item',
      controller: 'ItemController',
      templateUrl: 'partials/item.html'
    });

  });

}());
