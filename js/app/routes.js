/*jslint browser: true, white: true, plusplus: true*/
/*global angular, console, alert*/

(function () {
  'use strict';

  var app = angular.module('keira2');

  // routing
  app.config(function ($stateProvider, $urlRouterProvider) {

    // default route
    $urlRouterProvider.otherwise("/");

    $stateProvider
    .state('info', {
      url: '/',
      controller: 'InfoController',
      templateUrl: 'partials/info.html'
    })
      .state('quest', {
      url: '/quest',
      controller: 'QuestController',
      templateUrl: 'partials/quest.html'
    })
      .state('questSelected', {
      url: '/quest/:id',
      controller: 'QuestController',
      templateUrl: 'partials/quest.html'
    })
      .state('creature', {
      url: '/creature',
      controller: 'CreatureController',
      templateUrl: 'partials/creature.html'
    })
      .state('creatureSelected', {
      url: '/creature/:id',
      controller: 'CreatureController',
      templateUrl: 'partials/creature.html'
    })
      .state('gameobject', {
      url: '/gameobject',
      controller: 'GameobjectController',
      templateUrl: 'partials/gameobject.html'
    })
      .state('gameobjectSelected', {
      url: '/gameobject/:id',
      controller: 'GameobjectController',
      templateUrl: 'partials/gameobject.html'
    })
      .state('item', {
      url: '/item',
      controller: 'ItemController',
      templateUrl: 'partials/item.html'
    })
      .state('smartai', {
      url: '/smartai',
      controller: 'SmartAIController',
      templateUrl: 'partials/smartai.html'
    })
      .state('conditions', {
      url: '/conditions',
      controller: 'ConditionsController',
      templateUrl: 'partials/conditions.html'
    })
      .state('other', {
      url: '/other',
      controller: 'OtherController',
      templateUrl: 'partials/other.html'
    })
      .state('character', {
      url: '/character',
      controller: 'CharacterController',
      templateUrl: 'partials/character.html'
    })
      .state('sql', {
      url: '/sql',
      controller: 'SQLController',
      templateUrl: 'partials/sql.html'
    });

  });

}());
