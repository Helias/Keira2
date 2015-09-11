/*jslint browser: true, eqeq: true, white: true, plusplus: true */
/*global angular, console, alert*/

(function () {
  'use strict';

  var app = angular.module('keira2');

  app.controller("QuestObjectivesController", function ($scope, $rootScope, $stateParams) {

    /* At start we have no row selected */
    $scope.selectedRow = -1;

    /* The item currently selected by the user (bound to the view) */
    $scope.selected = {
      ID            : 0,
      QuestID       : parseInt($stateParams.id, 10),
      Type          : 0,
      StorageIndex  : 0,
      ObjectID      : 0,
      Amount        : 0,
      Flags         : 0,
      UnkFloat      : 0,
      Description   : '',
      VerifiedBuild : 0
    };
    console.log($scope.selected);

    /* Type check */
    $scope.parseValues = function() {

      $scope.selected.ID            = parseInt($scope.selected.ID, 10);
      $scope.selected.Type          = parseInt($scope.selected.Type, 10);
      $scope.selected.StorageIndex  = parseInt($scope.selected.StorageIndex, 10);
      $scope.selected.ObjectID      = parseInt($scope.selected.ObjectID, 10);
      $scope.selected.Amount        = parseInt($scope.selected.Amount, 10);
      $scope.selected.Flags         = parseInt($scope.selected.Flags, 10);
      $scope.selected.UnkFloat      = parseInt($scope.selected.UnkFloat, 10);
      $scope.selected.VerifiedBuild = parseInt($scope.selected.VerifiedBuild, 10);
    };

    /* Select a row from collection */
    $scope.selectRow = function(rows, index) {
      $scope.selectedRow = index;
      $scope.selected = angular.copy(rows[index]);
      console.log($scope.selected);
    };

    /* Edit selected row */
    $scope.editSelectedRowOf = function(rows, primaryKey2) {
      if (!$scope.isEntrySelected()) { return; }
      var i;
      $scope.parseValues();

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
