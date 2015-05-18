/*jslint browser: true, eqeq: true, white: true, plusplus: true */
/*global angular, console, alert*/

(function () {
  'use strict';

  var app = angular.module('keira2');

  app.controller("VendorController", function ($scope, $rootScope, $stateParams) {

    /* At start we have no row selected */
    $scope.selectedRow = -1;

    /* The item currently selected by the user (bound to the view) */
    $scope.selected = {
      entry         : parseInt($stateParams.id, 10),
      slot          : 0,
      item          : 0,
      maxcount      : 0,
      incrtime      : 0,
      ExtendedCost  : 0,
      VerifiedBuild : 0
    };

    /* Type check */
    $scope.parseValues = function() {

      $scope.selected.slot          = parseInt($scope.selected.slot, 10);
      $scope.selected.item          = parseInt($scope.selected.item, 10);
      $scope.selected.maxcount      = parseInt($scope.selected.maxcount, 10);
      $scope.selected.incrtime      = parseInt($scope.selected.incrtime, 10);
      $scope.selected.ExtendedCost  = parseInt($scope.selected.ExtendedCost, 10);
      $scope.selected.VerifiedBuild = parseInt($scope.selected.VerifiedBuild, 10);
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
