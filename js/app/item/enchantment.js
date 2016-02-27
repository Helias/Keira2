/*jslint browser: true, eqeq: true, white: true, plusplus: true */
/*global angular, console, alert*/

(function () {
  'use strict';

  var app = angular.module('keira2');

  app.controller("EnchantmentController", function ($scope, $rootScope, $stateParams) {

	/* At start we have no row selected */
	$scope.selectedRow = -1;

	/* The item currently selected by the user (bound to the view) */
	$scope.selected = {
	  entry   : parseInt($stateParams.id, 10),
	  ench    : 0,
	  chance  : 0.0
	};

	/* Type check */
	$scope.parseValues = function() {
	  $scope.selected.ench    = parseInt($scope.selected.ench, 10);
	  $scope.selected.chance  = parseFloat($scope.selected.chance, 10);
	};

	/* Select a row from collection */
	$scope.selectRow = function(rows, index) {
	  $scope.selectedRow = index;
	  $scope.selected = angular.copy(rows[index]);
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
