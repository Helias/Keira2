/*jslint browser: true, white: true, plusplus: true*/
/*global angular, console, alert, squel*/
/*jslint es5: true */

(function () {
  'use strict';

  var app = angular.module('keira2', ['ui.router', 'ui.bootstrap', 'chieffancypants.loadingBar', 'tableSort']);

  /* [Function] getUpdateQuery
  *   Description: Tracks difference between two row objects and generate UPDATE query
  *   Inputs:
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
      console.log("There are no `" + tableName + "` changes\n\n");
      return "";
    }

    query.where(whereCondition);

    return "# Table `" + tableName + "`\n" + query.toString() + ";\n\n";
  };

  /* [Function] getDiffDeleteInsert
  *   Description: Tracks difference between two groups of rows and generate DELETE/INSERT query
  *   Inputs:
  *   - tableName -> the name of the table (example: "creature_loot_template")
  *   - primaryKey1 -> first  primary key (example: "Entry")
  *   - primaryKey2 -> second primary key (example: "Item")
  *   - currentRows -> object of the original table   (group of rows)
  *   - newRows -> object bound with ng-model to view (group of rows)
  */
  app.getDiffDeleteInsert = function(tableName, primaryKey1, primaryKey2, currentRows, newRows) {

    // TODO

  };

  /* [Function] getFullDeleteInsert
  *   Description: Generate the full DELETE/INSERT query of a group of rows
  *   Inputs:
  *   - tableName -> the name of the table (example: "creature_loot_template")
  *   - primaryKey1 -> first  primary key (example: "Entry")
  *   - newRows -> object bound with ng-model to view (group of rows)
  */
  app.getFullDeleteInsert = function(tableName, primaryKey1, newRows) {

    if (newRows === undefined || newRows.length <= 0 ) { return; }

    var query, i, deleteQuery, insertQuery, cleanedNewRows;

    deleteQuery = squel.delete().from(tableName).where(primaryKey1 + " = " + newRows[0][primaryKey1]);

    /* Here we need to remove the $$hashKey field from all newRows objects
     * because we don't want it inside our query
     * if we remove $$hashKey field directly from newRows objects we will break the DOM
     * then we create a copy of newRows without that field
     * clearedNewRows will be the copy of newRows objects without the $$hashKey field */
    cleanedNewRows = angular.fromJson(angular.toJson(newRows));

    insertQuery = squel.insert().into(tableName).setFieldsRows(cleanedNewRows);

    query = "# FULL `" + tableName + "` of " + primaryKey1 + " " + newRows[0][primaryKey1] + "\n";
    query += deleteQuery.toString() + ";\n";
    query += insertQuery.toString() + ";\n";

    return query;
  };


  app.run(function($rootScope, $modal) {

    /* TrinityCore Documentation wiki */
    $rootScope.wikiLink = "http://collab.kpsn.org/display/tc/";

    /* Open modal to handle flags params:
     * size        => size of the modal (example: '', 'sm', 'lg'), '' is the default size
     * TemplateUrl => content of the modal (file html inside the folder "modals")
     * object      => new_tablename the object responsible of the table (example: new_creature_template)
     * property    => property of the table to modify (example: npcflag)
     * numValues   => number of the total values (flag) of the property
    */
    $rootScope.openModal = function (size, TemplateUrl, object, property, numValues) {

      if (object === undefined) { return; }

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
