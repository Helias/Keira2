/*jslint browser: true, eqeq: true,  white: true, plusplus: true */
/*global angular, console, alert*/

(function () {
  'use strict';

  var app = angular.module('keira2');

  app.controller("CreatureSpawnsController", function ($scope, $rootScope, $stateParams) {

    /* At start we have no row selected */
    $scope.selectedRow = -1;

    /* The row currently selected by the user (bound to the view) */
    $scope.selected = {
      guid            : 0,
      id              : parseInt($stateParams.id, 10),
      map             : 0,
      zoneId          : 0,
      areaId          : 0,
      spawnMask       : 1,
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

    if ($rootScope.$storage.version.name == "6.x") {
      $scope.selected.PhaseId    = 0;
      $scope.selected.PhaseGroup = 0;
    }
    else {
      $scope.selected.phaseMask = 2;
    }

    /* Type check */
    $scope.parseValues = function() {

      $scope.selected.guid            = parseInt($scope.selected.guid, 10);
      $scope.selected.id              = parseInt($scope.selected.id, 10);
      $scope.selected.map             = parseInt($scope.selected.map, 10);
      $scope.selected.zoneId          = parseInt($scope.selected.zoneId, 10);
      $scope.selected.areaId          = parseInt($scope.selected.areaId, 10);
      $scope.selected.spawnMask       = parseInt($scope.selected.spawnMask, 10);
      $scope.selected.modelid         = parseInt($scope.selected.modelid, 10);
      $scope.selected.equipment_id    = parseInt($scope.selected.equipment_id, 10);
      $scope.selected.position_x      = parseFloat($scope.selected.position_x, 10);
      $scope.selected.position_y      = parseFloat($scope.selected.position_y, 10);
      $scope.selected.position_z      = parseFloat($scope.selected.position_z, 10);
      $scope.selected.orientation     = parseFloat($scope.selected.orientation, 10);
      $scope.selected.spawntimesecs   = parseInt($scope.selected.spawntimesecs, 10);
      $scope.selected.spawndist       = parseFloat($scope.selected.spawndist, 10);
      $scope.selected.currentwaypoint = parseInt($scope.selected.currentwaypoint, 10);
      $scope.selected.curhealth       = parseInt($scope.selected.curhealth, 10);
      $scope.selected.curmana         = parseInt($scope.selected.curmana, 10);
      $scope.selected.MovementType    = parseInt($scope.selected.MovementType, 10);
      $scope.selected.npcflag         = parseInt($scope.selected.npcflag, 10);
      $scope.selected.unit_flags      = parseInt($scope.selected.unit_flags, 10);
      $scope.selected.dynamicflags    = parseInt($scope.selected.dynamicflags, 10);
      $scope.selected.VerifiedBuild   = parseInt($scope.selected.VerifiedBuild, 10);
      
      if ($rootScope.$storage.version.name == "6.x") {
        $scope.selected.PhaseId         = parseInt($scope.selected.PhaseId, 10);
        $scope.selected.PhaseGroup      = parseInt($scope.selected.PhaseGroup, 10);
      } else {
       $scope.selected.phaseMask       = parseInt($scope.selected.phaseMask, 10); 
      }

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

  app.controller("SpawnsAddonController", function ($scope, $rootScope, $stateParams) {

    /* At start we have no row selected */
    $scope.selectedRow = -1;

    /* The row currently selected by the user (bound to the view) */
    $scope.selected = {
      guid    : 0,
      path_id : 0,
      mount   : 0,
      bytes1  : 0,
      bytes2  : 0,
      emote   : 0,
      auras   : ""
    };

    /* Type check */
    $scope.parseValues = function() {
      $scope.selected.guid     = parseInt($scope.selected.guid, 10);
      $scope.selected.path_id  = parseInt($scope.selected.path_id, 10);
      $scope.selected.mount    = parseInt($scope.selected.mount, 10);
      $scope.selected.bytes1   = parseInt($scope.selected.bytes1, 10);
      $scope.selected.bytes2   = parseInt($scope.selected.bytes2, 10);
      $scope.selected.emote    = parseInt($scope.selected.emote, 10);
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
