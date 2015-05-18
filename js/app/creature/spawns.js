/*jslint browser: true, eqeq: true,  white: true, plusplus: true */
/*global angular, console, alert*/

(function () {
  'use strict';

  var app = angular.module('keira2');

  app.controller("SpawnsController", function ($scope, $rootScope, $stateParams) {

    /* At start we have no row selected */
    $scope.selectedRow = -1;

    /* The row currently selected by the user (bound to the view) */
    $scope.selected = {
      guid            : 0,
      id              : $scope.Entry = parseInt($stateParams.id, 10),
      map             : 0,
      zoneId          : 0,
      areaId          : 0,
      spawnMask       : 1,
      phaseMask       : 2,
      modelid         : 0,
      equipment_id    : 0,
      position_x      : 0,
      position_y      : 0,
      position_z      : 0,
      orientation     : 0,
      spawntimesecs   : 120,
      spawndist       : 0,
      currentwaypoint : 0,
      curhealth       : 1,
      curmana         : 0,
      MovementType    : 0,
      npcflag         : 0,
      unit_flags      : 0,
      dynamicflags    : 0,
      VerifiedBuild   : 0
    };

    /* Type check */
    $scope.parseValues = function() {

      $scope.selected.Item          = parseInt($scope.selected.Item, 10);
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
