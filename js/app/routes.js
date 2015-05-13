(function () {
  var app = angular.module('keira2');

  // routing
  app.config(function($stateProvider, $urlRouterProvider) {

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
    .state('gameobject', {
      url: '/gameobject',
      controller: 'gameobjectController',
      templateUrl: 'partials/gameobject.html'
    })
    .state('item', {
      url: '/item',
      controller: 'ItemController',
      templateUrl: 'partials/item.html'
    });


  });

})();