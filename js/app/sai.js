/*jslint browser: true, white: true, plusplus: true, eqeq: true, */
/*global angular, console, alert*/

(function () {
  'use strict';

  var app = angular.module('keira2');

  app.controller("SmartAIController", function ($rootScope, $scope, $http, $stateParams, $modal) {

    /* read ONLY values, do NOT bind them with ng-model in the view */
    $scope.sourceType = $stateParams.sourceType;
    $scope.entryOrGuid = $stateParams.sourceType;

    /* Just to know we didn't try to fetch data yet */
    $scope.loadAttempt = false;

    /* All SAI tabs, disabled by default.
    *  Only one tab can be active at a time */
    $scope.saiTabs = {
      search : false,
      create : false,
      editor : false,
      script : false
    };

    /* source_type constants */
    $scope.sourceTypesConst = {
      CREATURE          : 0, 0 : "Creature",
      GAMEOBJECT        : 1, 1 : "GameObject",
      AREATRIGGER       : 2, 2 : "AreaTrigger",
      EVENT             : 3, 3 : "Event",
      GOSSIP            : 4, 4 : "Gossip",
      QUEST             : 5, 5 : "Quest",
      SPELL             : 6, 6 : "Spell",
      TRANSPORT         : 7, 7 : "Transport",
      INSTANCE          : 8, 8 : "Instance",
      TIMED_ACTIONLIST  : 9, 9 : "Timed Actionlist"
    };

    /* Init arrays */
    $scope.exactResult            = [];
    $scope.search_smart_scripts   = [];
    $scope.new_smart_scripts      = [];
    $scope.current_smart_scripts  = [];

    /* Default source_type of search */
    $scope.search_smart_scripts.source_type = 0;

    /* Do not show exact result div in search by default */
    $scope.foundExactResult = false;

    /* Check if an entity (smart_scripts.source_type AND smart_scripts.entryorguid) is selected */
    if ($stateParams.sourceType && $stateParams.entryOrGuid) {

      /* We have a creature selected and default active tab is creatureTemplate */
      $scope.isEntitySelected = true;
      $scope.saiTabs.editor = true;

      /*  Following lines retrieve all SAI datas
       *  current_* mantains the database state
       *  new_*     mantains the editor state
       *  we will use those two objects to generate the SQL queries
       */

      /* Retrieve all smart_scripts datas */
      $http.get( app.api + "smart_scripts/" + $stateParams.sourceType + "/" + $stateParams.entryOrGuid )
        .success(function (data, status, header, config) {
        $scope.current_smart_scripts = $rootScope.fixNumericValues(data);
        $scope.new_smart_scripts = angular.copy($scope.current_smart_scripts);

        // check if we are editing an existing SAI script or creating a new one
        if ($scope.current_smart_scripts.length > 0) {
          // editing existing SAI script
          $scope.selectionText = "Editing the SmartAI script of ";
          $scope.$broadcast ('saiLoaded');
        } else {
          // creating new SAI script
          $scope.selectionText = "Creating a new SmartAI script for ";
        }

        $scope.selectionText += "[" +  $scope.sourceTypesConst[$stateParams.sourceType] + "] ";

        if ($stateParams.sourceType == 0 || $stateParams.sourceType == 1) {
          if ($stateParams.entryOrGuid > 0) {
            $scope.selectionText += "ENTRY ";
            $scope.selectionText += $stateParams.entryOrGuid;
          } else {
            $scope.selectionText += "GUID ";
            $scope.selectionText += -$stateParams.entryOrGuid;
          }
        } else {
          $scope.selectionText += $stateParams.entryOrGuid;
        }

        switch (Number($stateParams.sourceType)) {

          case 0: // Creature
            if ($stateParams.entryOrGuid < 0) {

              // Creature GUID
              $scope.entityGuid = -$stateParams.entryOrGuid;

              /* Retrieve creature_template.entry */
              $http.get( app.api + "creature/spawn/guid/" + $scope.entityGuid)
                .success(function (data, status, header, config) {
                if (data.length < 1) {
                  console.log("[WARNING] creature/spawn/guid/" + $scope.entityGuid + " returned 0 results: unable to find the entry of the creature.");
                } else {
                  if (!data[0].hasOwnProperty('id')) {
                    console.log("[ERROR] creature/spawn/guid/" + $scope.entityGuid + " returned datas, but the attribute 'id' is not present.");
                  } else {
                    $scope.entityEntry = data[0].id;

                    /* Retrieve all creature_template datas */
                    $http.get( app.api + "creature/template/" + $scope.entityEntry )
                      .success(function (data, status, header, config) {
                      $scope.current_creature_template = $rootScope.fixNumericValues(data[0]);

                      $scope.selectionText += " (name: " + $scope.current_creature_template.name + ", entry: " + $scope.entityEntry + ")";
                    })
                      .error(function (data, status, header, config) {
                      console.log("[ERROR] creature/template/" + $scope.entityEntry + " $http.get request failed");
                    });
                  }
                }
              })
                .error(function (data, status, header, config) {
                console.log("[ERROR] creature/spawn/guid/" + $scope.entityGuid + " $http.get request failed");
              });

            } else {

              // Creature ENTRY
              $scope.entityEntry = $stateParams.entryOrGuid;

              /* Retrieve all creature_template datas */
              $http.get( app.api + "creature/template/" + $scope.entityEntry )
                .success(function (data, status, header, config) {
                $scope.current_creature_template = $rootScope.fixNumericValues(data[0]);

                $scope.selectionText += " (name: " + $scope.current_creature_template.name + ")";
              })
                .error(function (data, status, header, config) {
                console.log("[ERROR] creature/template/" + $scope.entityEntry + " $http.get request failed");
              });
            }
            break;

          case 1: // GameObject
            if ($stateParams.entryOrGuid < 0) {

              // GameObject GUID
              $scope.entityGuid = -$stateParams.entryOrGuid;

              /* Retrieve gameobject_template.entry */
              $http.get( app.api + "gameobject/spawn/guid/" + $scope.entityGuid)
                .success(function (data, status, header, config) {
                if (data.length < 1) {
                  console.log("[WARNING] gameobject/spawn/guid/" + $scope.entityGuid + " returned 0 results: unable to find the entry of the gameobject.");
                } else {
                  if (!data[0].hasOwnProperty('id')) {
                    console.log("[ERROR] gameobject/spawn/guid/" + $scope.entityGuid + " returned datas, but the attribute 'id' is not present.");
                  } else {
                    $scope.entityEntry = data[0].id;

                    /* Retrieve all gameobject_template datas */
                    $http.get( app.api + "gameobject/template/" + $scope.entityEntry )
                      .success(function (data, status, header, config) {
                      $scope.current_gameobject_template = $rootScope.fixNumericValues(data[0]);

                      $scope.selectionText += " (name: " + $scope.current_gameobject_template.name + ", entry: " + $scope.entityEntry + ")";
                    })
                      .error(function (data, status, header, config) {
                      console.log("[ERROR] gameobject/template/" + $scope.entityEntry + " $http.get request failed");
                    });
                  }
                }
              })
                .error(function (data, status, header, config) {
                console.log("[ERROR] gameobject/spawn/guid/" + $scope.entityGuid + " $http.get request failed");
              });

            } else {

              // GameObject ENTRY
              $scope.entityEntry = $stateParams.entryOrGuid;

              /* Retrieve all gameobject_template datas */
              $http.get( app.api + "gameobject/template/" + $scope.entityEntry )
                .success(function (data, status, header, config) {
                $scope.current_gameobject_template = $rootScope.fixNumericValues(data[0]);

                $scope.selectionText += " (name: " + $scope.current_gameobject_template.name + ")";
              })
                .error(function (data, status, header, config) {
                console.log("[ERROR] gameobject/template/" + $scope.entityEntry + " $http.get request failed");
              });
            }
            break;

          case 2: // AreaTrigger
            $scope.entityEntry = $stateParams.entryOrGuid;
            break;

          case 9: // Timed Actionlist
            $scope.entityEntry = $stateParams.entryOrGuid;
            break;

          default:
            console.log("[WARNING] source_type = " + $stateParams.sourceType + " not yet supported");
        }

        $scope.loadAttempt = true;
      })
        .error(function (data, status, header, config) {
        console.log("[ERROR] smart_scripts/" + $stateParams.sourceType + "/" + $stateParams.entryOrGuid + " $http.get request failed");
        $scope.loadAttempt = true;
      });

    } else {
      /* We have no creature selected and default active tab is search */
      $scope.isEntitySelected = false;
      $scope.saiTabs.search = true;
      $scope.selectionText = "No entity selected. Please use Search and select one.";
    }

    /* [Function] Search */
    $scope.search = function (sourceType, entryOrGuid, comment) {

      if (sourceType != null && entryOrGuid != null) {
        $http.get( app.api + "/smart_scripts/" + sourceType + "/" + entryOrGuid )
          .success(function (data, status, header, config) {
          if (data.length > 0) {
            $scope.exactResult.entryOrGuid    = data[0].entryorguid;
            $scope.exactResult.sourceType     = data[0].source_type;
            $scope.exactResult.sourceTypeName = $scope.sourceTypesConst[sourceType];
            $scope.foundExactResult = true;
          } else {
            $scope.foundExactResult = false;
          }
        })
          .error(function (data, status, header, config) {
          console.log("[ERROR] SMART SCRIPTS EXACT SEARCH $http.get request failed");
        });
      }

      $http.get( app.api + "/search/smart_scripts/", {
        params: {
          source_type : sourceType,
          entryorguid : entryOrGuid,
          comment     : comment
        }
      }).success(function (data, status, header, config) {
        $scope.scripts = $rootScope.fixNumericValues(data);
      })
        .error(function (data, status, header, config) {
        console.log("[ERROR] SMART SCRIPTS SEARCH $http.get request failed");
      });

    };

    /* [Function] Open SQL SAI Script tab */
    $scope.openScriptTab = function() {
      $scope.generateSAIScript();
      $scope.saiTabs.search = false;
      $scope.saiTabs.create = false;
      $scope.saiTabs.editor = false;
      $scope.saiTabs.script = true;
    };

    /* [Function] Generate SQL SAI Script */
    $scope.generateSAIScript = function() {

      if (!$scope.isEntitySelected) {
        $scope.SAIScript = "-- No entity selected";
        return;
      }

      $scope.SAIScript = "-- " + $scope.selectionText + "\n\n";

      // non-smart_scripts datas
      switch (Number($stateParams.sourceType)) {

        case 0: // Creature
          $scope.SAIScript += "-- Table creature_template\n";
          $scope.SAIScript += "UPDATE `creature_template` SET `AIName` = 'SmartAI' WHERE `entry` = " + $scope.entityEntry + ";\n\n";
          break;

        case 1: // GameObject
          $scope.SAIScript += "-- Table gameobject_template\n";
          $scope.SAIScript += "UPDATE `gameobject_template` SET `AIName` = 'SmartGameObjectAI' WHERE `entry` = " + $scope.entityEntry + ";\n\n";
          break;

        case 2: // AreaTrigger
          $scope.SAIScript += "-- Table gameobject_template\n";
          $scope.SAIScript += "DELETE FROM `areatrigger_scripts` WHERE `entry` = " + $scope.entityEntry + ";\n";
          $scope.SAIScript += "INSERT INTO `areatrigger_scripts` (`entry`, `ScriptName`) VALUES (" + $scope.entityEntry + ", 'SmartTrigger');\n\n";
          break;
      }

      // smart_scripts datas
      $scope.SAIScript += "-- Table smart_scripts\n";
      if ($scope.new_smart_scripts.length > 0) {
        $scope.SAIScript += app.getFullDeleteInsertTwoKeys("smart_scripts", "source_type", "entryorguid", $scope.new_smart_scripts);
      } else {
        $scope.SAIScript += "DELETE FROM `smart_scripts` WHERE (`source_type` = " + $stateParams.sourceType + " AND `entryorguid` = " + $stateParams.entryOrGuid + ");\n";
      }
    };

    /* [Function] disactive all tabs */
    $scope.disactiveAllTabs = function() {
      angular.forEach($scope.saiTabs, function(value, key) {
        value = false;
      });
    };

    /* [Function] open SQL Script tab */
    $scope.openScriptTab = function() {
      $scope.disactiveAllTabs();
      $scope.generateSAIScript();
      $scope.saiTabs.script = true;
    };

  });

}());
