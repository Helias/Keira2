/*jslint browser: true, eqeq: true, white: true, plusplus: true */
/*global angular, console, alert*/

(function () {
  'use strict';

  var app = angular.module('keira2');

  app.controller("LootController", function ($scope, $rootScope, $stateParams) {

    /* At start we have no row selected */
    $scope.selectedRow = -1;

    /* The item currently selected by the user (bound to the view) */
    $scope.selected = {
      Entry         : $scope.Entry = parseInt($stateParams.id, 10),
      Item          : 0,
      Reference     : 0,
      Chance        : 100,
      QuestRequired : 0,
      LootMode      : 1,
      GroupId       : 0,
      MinCount      : 1,
      MaxCount      : 1,
      Comment       : ''
    };

    /* Type check */
    $scope.parseValues = function() {

      $scope.selected.Item          = parseInt($scope.selected.Item, 10);
      $scope.selected.Reference     = parseInt($scope.selected.Reference, 10);
      $scope.selected.Chance        = parseFloat($scope.selected.Chance, 10);
      $scope.selected.QuestRequired = parseInt($scope.selected.QuestRequired, 10);
      $scope.selected.LootMode      = parseInt($scope.selected.LootMode, 10);
      $scope.selected.GroupId       = parseInt($scope.selected.GroupId, 10);
      $scope.selected.MinCount      = parseInt($scope.selected.MinCount, 10);
      $scope.selected.MaxCount      = parseInt($scope.selected.MaxCount, 10);
    };

    /* Select a row from collection */
    $scope.selectRow = function(rows, index) {
      $scope.selectedRow = index;
      $scope.selected = angular.copy(rows[index]);
    };

    /* Edit selected row */
    $scope.editSelectedRowOf = function(rows, primaryKey2) {
      if (!$scope.isEntrySelected()) { return; }
      var i;

      // check primaryKey2 uniqueness
      for (i = 0; i < rows.length; i++) {
        if ( (rows[i][primaryKey2] == $scope.selected[primaryKey2]) && (i !== $scope.selectedRow) ) {
          alert("Duplicate row with `" + primaryKey2 + "` = " + $scope.selected[primaryKey2]);
          return;
        }
      }

      rows.splice($scope.selectedRow, 1, angular.copy($scope.selected));
    };

    /* Delete selected row from collection */
    $scope.deleteSelectedRowFrom = function(rows) {
      if (!$rootScope.isEntrySelected()) { return; }

      rows.splice($scope.selectedRow, 1);
    };

    /* Add selected row to collection */
    $scope.addRowTo = function(rows, primaryKey2) {
      if (!$rootScope.isEntrySelected()) { return; }
      var i;
      $scope.parseValues();

      // check primaryKey2 uniqueness
      for (i = 0; i < rows.length; i++) {
        if (rows[i][primaryKey2] == $scope.selected[primaryKey2]) {
          alert("Duplicate row with `" + primaryKey2 + "` = " + $scope.selected[primaryKey2]);
          return;
        }
      }

      rows.splice(0, 0, angular.copy($scope.selected));
    };

  });

}());
