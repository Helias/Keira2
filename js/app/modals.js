/*jslint browser: true, white: true, plusplus: true, eqeq: true*/
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

	var i = 0;
	$scope.values = [];

	if (propertyVal != -1)
	{
	  propertyVal = String(parseInt(propertyVal, 10).toString(2));
	  propertyVal = propertyVal.split("").reverse().join("");

	  for (i = 0; i < numValuesVal; i++)
	  {
		if(parseInt(propertyVal[i], 10) !== 1) {
		  $scope.values[i] = false;
		} else {
		  $scope.values[i] = true;
		}
	  }
	}
	else
	{
	  for (i = 0; i < numValuesVal; i++)
	  {
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
   *  - constant: name of the constants (property of app.modalConstants[])
  */
  app.controller('ValueModalController', function ($scope, $modalInstance, property, constant) {

	var arr;

	// if constant is an array
	if (constant.indexOf("[") > -1) {
	  arr = constant.substr(constant.indexOf("[")+1, 4);
	  arr = arr.replace("]", "");
	  constant = constant.substr(0, constant.indexOf("["));
	}

	// importing constants on Controller
	if (arr == null) {
	  $scope.constants = app.modalConstants[constant];
	} else {
	  $scope.constants = app.modalConstants[constant][arr];
	}


	$scope.modalTitle = property;

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

  /* Modal Controller for generic values
   * params:
   *  - property: the field name of the table which the modal will return the value
   *  - constant: name of the constants (property of app.modalConstants[])
  */
  app.controller('BagFamilyModalController', function ($scope, $modalInstance, property, constant) {

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

	/* init object of search param */
	$scope.param = {
	  id : "",
	  name : ""
	};

	// init data object properties
	var data_properties = [];

	$scope.modalTitle = property;

	/* [Function] Search */
	$scope.search = function (id, name) {

	  if ( (id === "" || isNaN(id)) && name === "")
	  {
		alert('Fill at least one field!');
		return;
	  }

	  $http.get( app.api + "search/" + search_param + "/", {
		params: {
		  id: id,
		  name: name,
		  version: $rootScope.$storage.version.name
		}
	  }).success(function (data, status, header, config) {

		$scope.data = $rootScope.fixNumericValues(data);

		// properties of the object data
		data_properties = Object.keys($scope.data[0]);

		$scope.ID    = data_properties[0];
		$scope.Value = data_properties[1];
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
		// return the id of the data selected
		$modalInstance.close( $scope.data[$scope.selectedRow][data_properties[0]] );
	  }
	  else {
		$modalInstance.close();
	  }
	};

	$scope.modalCancel = function () {
	  $modalInstance.dismiss('cancel');
	};

  });


  app.controller('UnusuedGuidModalController', function ($scope, $modalInstance, $http, $rootScope, property, table) {

	/* init object of search param */
	$scope.param = {
	  startid : "",
	  numguid : "",
	  table : table,
	  continuous: ""
	};

	// init data object properties
	var data_properties = [];

	$scope.modalTitle = property;

	/* [Function] searchGuid */
	$scope.searchGuid = function (startid, numguid, table, continuous) {

	  if ( (startid === "" || isNaN(startid)) && (numguid === "" || isNaN(numguid)) )
	  {
		alert('Fill startid and numguid field!');
		return;
	  }

	  if (continuous) { continuous = 1; }

	  $http.get( app.api + "search/guid/", {
		params: {
		  startid: startid,
		  numguid: numguid,
		  table: table,
		  continuous: continuous
		}
	  }).success(function (data, status, header, config) {

		$scope.guid = data.guid;

	  })
		.error(function (data, status, header, config) {
		console.log("[ERROR] MODAL UNUSUED GUID SEARCH $http.get request failed");
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
		// return the id of the data selected
		$modalInstance.close( $scope.guid[$scope.selectedRow] );
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
