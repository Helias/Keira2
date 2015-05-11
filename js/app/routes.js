(function () {
  var app = angular.module('keira2');

  // routing
  app.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
    .state('quest', {
      url: '/quest/:id',
      controller: 'QuestController',
      templateUrl: 'partials/quest.html'
    })
    .state('creature', {
      url: '/creature',
      controller: 'CreatureController',
      templateUrl: 'partials/creature.html'
    })

    .state('gameobject', {
      url: '/gameobject/:id',
      controller: 'gameobjectController',
      templateUrl: 'partials/gameobject.html'
    })
    .state('item', {
      url: '/item/:id',
      controller: 'ItemController',
      templateUrl: 'partials/item.html'
    });


  });

})();
