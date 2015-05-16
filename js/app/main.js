/*jslint browser: true, white: true, plusplus: true*/
/*global angular, console, alert, squel*/

(function () {
  'use strict';

  var app = angular.module('keira2', ['ui.router', 'ui.bootstrap', 'chieffancypants.loadingBar', 'tableSort']);

  /* getUpdateQuery inputs:
  *   - tableName -> the name of the table (example: "creature_template")
  *   - whereCondition -> the WHERE condition (example: "entry = 30")
  *   - currentRow -> object of the original table
  *   - newRow -> object bound with ng-model to view
  */
  app.getUpdateQuery = function(tableName, whereCondition, currentRow, newRow) {

    var key,
        diff = false,
        query = squel.update();

    query.table(tableName);

    for (key in currentRow) {
      if (currentRow[key] !== newRow[key]) {
        query.set(key, newRow[key]);
        diff = true;
      }
    }

    if (!diff) {
      return "# There are no `" + tableName + "` changes\n\n";
    }

    query.where(whereCondition);

    return "# Table `" + tableName + "`\n" + query.toString() + ";\n\n";
  };


  app.run(function($rootScope, $modal) {

    /* Open modal to handle flags params:
     * size        => size of the modal (example: '', 'sm', 'lg'), '' is the default size
     * TemplateUrl => content of the modal (file html inside the folder "modals")
     * object      => new_tablename the object responsible of the table (example: new_creature_template)
     * property    => property of the table to modify (example: npcflag)
     * numValues   => number of the total values (flag) of the property
    */
    $rootScope.openModal = function (size, TemplateUrl, object, property, numValues) {
      var modalInstance = $modal.open({
        templateUrl: TemplateUrl,
        controller: "ModalInstanceCtrl",
        size: size,
        resolve: {
          propertyVal: function () {
            return object[property];
          },
          numValuesVal: function () {
            return numValues;
          }
        }
      });

      // When the modal will be closed this function takes the new value to assign
      modalInstance.result.then(function (Res) {
        object[property] = Res;
      });

    };

  });

  /* Modal Controller for bit flags:
  *  - creates an array of booleans as values for modal checkboxes
  *  - links checkbox values with flag values
  *  - allows user to edit flag values through checkboxes
  */
  app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, $rootScope, propertyVal, numValuesVal) {

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


  /* TODO: Empty controllers, will be moved in their own files once implemented */
  app.controller("SmartAIController", function ($scope, $http, $stateParams) {});
  app.controller("ConditionsController", function ($scope, $http, $stateParams) {});
  app.controller("OtherController", function ($scope, $http, $stateParams) {});
  app.controller("CharacterController", function ($scope, $http, $stateParams) {});
  app.controller("SQLController", function ($scope, $http, $stateParams) {});

}());
