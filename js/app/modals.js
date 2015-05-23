/*jslint browser: true, white: true, plusplus: true*/
/*global angular, console, alert, squel*/
/*jslint es5: true */

(function () {
  'use strict';

  var app = angular.module('keira2');

  /* Modal Controller for bit flags:
   * - creates an array of booleans as values for modal checkboxes
   * - links checkbox values with flag values
   * - allows user to edit flag values through checkboxes
   */
  app.controller('FlagModalController', function ($scope, $modalInstance, propertyVal, numValuesVal) {

    propertyVal = String(parseInt(propertyVal, 10).toString(2));
    propertyVal = propertyVal.split("").reverse().join("");

    $scope.values = [];

    var i = 0;
    for (i = 0; i < numValuesVal; i++)
    {
      if(parseInt(propertyVal[i], 10) !== 1) {
        $scope.values[i] = false;
      } else {
        $scope.values[i] = true;
      }
    }

    $scope.modalOk = function () {
      var i = 0, Res = 0;
      for (i = 0; i < numValuesVal; i++)
      {
        if($scope.values[i] === true)
        {
          Res += Math.pow(2, i);
        }
      }
      $modalInstance.close(Res);
    };

    $scope.modalCancel = function () {
      $modalInstance.dismiss('cancel');
    };

  });

  app.controller('ValueModalController', function ($scope, $modalInstance) {

    $scope.modalOk = function () {
      $modalInstance.close();
    };

    $scope.modalCancel = function () {
      $modalInstance.dismiss('cancel');
    };

  });

  app.controller('FullScriptModalController', function ($scope, $modalInstance, rows, tableName, primaryKey1) {

    $scope.SQLCode = app.getFullDeleteInsert(tableName, primaryKey1, rows);

    $scope.modalClose = function () {
      $modalInstance.dismiss('close');
    };

  });


  app.controller('DiffScriptModalController', function ($scope, $modalInstance, tableName, primaryKey1, primaryKey2, currentRows, newRows) {

    $scope.SQLCode = app.getDiffDeleteInsert(tableName, primaryKey1, primaryKey2, currentRows, newRows);

    $scope.modalClose = function () {
      $modalInstance.dismiss('close');
    };

  });

  app.controller('DiffOneKeyScriptModalController', function ($scope, $modalInstance, tableName, primaryKey, entityType, entity, currentRows, newRows) {

    $scope.SQLCode = app.getDiffDeleteInsertOneKey(tableName, primaryKey, entityType, entity, currentRows, newRows);

    $scope.modalClose = function () {
      $modalInstance.dismiss('close');
    };

  });

}());
