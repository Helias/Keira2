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

  /* Modal Controller for generic values
   * params:
   *  - property: the field name of the table which the modal will return the value
  */
  app.controller('ValueModalController', function ($scope, $modalInstance, property) {

    // importing constants on Controller
    $scope.constants = app.modalConstants;

    $scope.selectedRow = null;

    // Onclick the table row on the modal save the index
    $scope.selectModalRow = function(index) {
      $scope.selectedRow = index;
    };

    // When click on the modal button "Ok" send the id value selected
    $scope.modalOk = function () {
      if ($scope.selectedRow !== null) {
        $modalInstance.close( $scope.selectedRow );
      }
      else {
        $modalInstance.close();
      }
    };

    $scope.modalCancel = function () {
      $modalInstance.dismiss('cancel');
    };

  });

  app.controller('SearchModalController', function ($scope, $modalInstance, $http, $rootScope, property, search_param) {

    /* [Function] Search */
    $scope.search = function (id, name) {

      $http.get( app.api + "search/dbc/" + search_param + "/", {
        params: {
          id: id,
          name: name
        }
      }).success(function (data, status, header, config) {
        $scope.datas = $rootScope.fixNumericValues(data);
      })
        .error(function (data, status, header, config) {
        console.log("[ERROR] MODAL SEARCH $http.get request failed");
      });

    };

    $scope.selectedRow = null;

    // Onclick the table row on the modal save the index
    $scope.selectModalRow = function(index) {
      $scope.selectedRow = index;
    };

    // When click on the modal button "Ok" send the id value selected
    $scope.modalOk = function (Res) {

      if ($scope.selectedRow !== null) {

        // first property of the object data
        var first_property = Object.keys( $scope.datas[$scope.selectedRow] )[0];

        // return the id of the data selected
        $modalInstance.close( $scope.datas[$scope.selectedRow][first_property] );
      }
      else {
        $modalInstance.close();
      }
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
