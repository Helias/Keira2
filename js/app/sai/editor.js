/*jslint browser: true, eqeq: true, white: true, plusplus: true */
/*global angular, console, alert*/

(function () {
  'use strict';

  var app = angular.module('keira2');

  app.controller("SmartAIEditorController", function ($scope, $rootScope, $stateParams) {

    /* At start we have no row selected */
    $scope.selectedRow = -1;

    /* Show only basic informations */
    $scope.showBasicInformations = true;

    /* Default new row */
    $scope.defaultNewRow = {
      entryorguid       : parseInt($stateParams.entryOrGuid, 10),
      source_type       : parseInt($stateParams.sourceType, 10),
      id                : 0,
      link              : 0,
      event_type        : 0,
      event_phase_mask  : 0,
      event_chance      : 100,
      event_flags       : 0,
      event_param1      : 0,
      event_param2      : 0,
      event_param3      : 0,
      event_param4      : 0,
      action_type       : 0,
      action_param1     : 0,
      action_param2     : 0,
      action_param3     : 0,
      action_param4     : 0,
      action_param5     : 0,
      action_param6     : 0,
      target_type       : 0,
      target_param1     : 0,
      target_param2     : 0,
      target_param3     : 0,
      target_x          : 0.0,
      target_y          : 0.0,
      target_z          : 0.0,
      target_o          : 0.0,
      comment           : ''
    };

    /* Type check */
    $scope.parseValues = function() {

      $scope.selected.id                = parseInt($scope.selected.id, 10);
      $scope.selected.link              = parseInt($scope.selected.link, 10);
      $scope.selected.event_type        = parseInt($scope.selected.event_type, 10);
      $scope.selected.event_phase_mask  = parseInt($scope.selected.event_phase_mask, 10);
      $scope.selected.event_chance      = parseInt($scope.selected.event_chance, 10);
      $scope.selected.event_flags       = parseInt($scope.selected.event_flags, 10);
      $scope.selected.event_param1      = parseInt($scope.selected.event_param1, 10);
      $scope.selected.event_param2      = parseInt($scope.selected.event_param2, 10);
      $scope.selected.event_param3      = parseInt($scope.selected.event_param3, 10);
      $scope.selected.event_param4      = parseInt($scope.selected.event_param4, 10);
      $scope.selected.action_type       = parseInt($scope.selected.action_type, 10);
      $scope.selected.action_param1     = parseInt($scope.selected.action_param1, 10);
      $scope.selected.action_param2     = parseInt($scope.selected.action_param2, 10);
      $scope.selected.action_param3     = parseInt($scope.selected.action_param3, 10);
      $scope.selected.action_param4     = parseInt($scope.selected.action_param4, 10);
      $scope.selected.action_param5     = parseInt($scope.selected.action_param5, 10);
      $scope.selected.action_param6     = parseInt($scope.selected.action_param6, 10);
      $scope.selected.target_type       = parseInt($scope.selected.target_type, 10);
      $scope.selected.target_param1     = parseInt($scope.selected.target_param1, 10);
      $scope.selected.target_param2     = parseInt($scope.selected.target_param2, 10);
      $scope.selected.target_param3     = parseInt($scope.selected.target_param3, 10);
      $scope.selected.target_x          = parseFloat($scope.selected.target_x, 10);
      $scope.selected.target_y          = parseFloat($scope.selected.target_y, 10);
      $scope.selected.target_z          = parseFloat($scope.selected.target_z, 10);
      $scope.selected.target_o          = parseFloat($scope.selected.target_o, 10);
    };

    /* Select and edit a row from collection */
    $scope.selectRow = function(rows, index) {
      $scope.selectedRow = index;
      $scope.selected = rows[index];
    };

    /* Delete selected row from collection */
    $scope.deleteSelectedRowFrom = function(rows) {
      if (!$rootScope.isEntrySelected()) { return; }

      rows.splice($scope.selectedRow, 1);
    };

    /* Add a new row to collection */
    $scope.addNewRow = function(rows) {

      if (!$rootScope.isEntrySelected()) { return; }

      var newRow = angular.copy($scope.defaultNewRow);
      newRow.id = rows.length;

      rows.splice(0, 0, angular.copy(newRow));
    };

  });

}());
