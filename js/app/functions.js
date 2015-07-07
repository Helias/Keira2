/*jslint browser: true, white: true, plusplus: true, eqeq: true*/
/*global angular, console, alert, squel*/
/*jslint es5: true */

(function () {
  'use strict';

  var app = angular.module('keira2');

  /* SYNCHRONOUS FUNCTIONS
   * - they are used to get the Creature\Quest\Spell\Item\GameObject name in a synchronous way
   * - returns the ID when fails
   * - since they SYNCHRONOUS request, use it ONLY when really needed
   * - `false` attribute makes the requests synchronous
   * - used for: SAI Editor comments generation
   */

  app.synchGetCreatureNameById = function(id) {
    var request, data;
    request = new XMLHttpRequest();
    request.open('GET', app.api + "creature/template/" + id, false);
    request.send(null);

    if (request.status === 200) {
      data = JSON.parse(request.responseText);
      if (!Array.isArray(data) || data.length < 1) { return id; }
      return data[0].name;
    } else {
      return id;
    }
  };

  app.synchGetCreatureNameByGuid = function(guid) {
    var request, data, id;
    request = new XMLHttpRequest();
    request.open('GET', app.api + "creature/spawn/guid/" + guid, false);
    request.send(null);

    if (request.status === 200) {

      data = JSON.parse(request.responseText);
      if (!Array.isArray(data) || data.length < 1) { return guid; }
      id = data[0].id;

      request = new XMLHttpRequest();
      request.open('GET', app.api + "creature/template/" + id, false);
      request.send(null);

      if (!Array.isArray(data) || request.status === 200) {

        data = JSON.parse(request.responseText);
        if (data.length < 1) { return guid; }
        return data[0].name;

      } else {
        return guid;
      }
    } else {
      return guid;
    }
  };

  app.synchGetQuestTitleById = function(id) {
    var request, data;
    request = new XMLHttpRequest();
    request.open('GET', app.api + "quest/template/" + id, false);
    request.send(null);

    if (request.status === 200) {
      data = JSON.parse(request.responseText);
      if (!Array.isArray(data) || data.length < 1) { return id; }
      return data[0].Title;
    } else {
      return id;
    }
  };

  app.synchGetQuestTitleByCriteriaFunc1 = function(requiredNpcOrGo1, requiredNpcOrGo2, requiredNpcOrGo3, requiredNpcOrGo4) {
    if (requiredNpcOrGo1 == undefined) { requiredNpcOrGo1 = ""; }
    if (requiredNpcOrGo2 == undefined) { requiredNpcOrGo2 = ""; }
    if (requiredNpcOrGo3 == undefined) { requiredNpcOrGo3 = ""; }
    if (requiredNpcOrGo4 == undefined) { requiredNpcOrGo4 = ""; }
    var request, data;
    request = new XMLHttpRequest();
    request.open(
      'GET',
      app.api + "custom/GetQuestTitleByCriteria/?"
      + "RequiredNpcOrGo1=" + requiredNpcOrGo1 + "&"
      + "RequiredNpcOrGo1=" + requiredNpcOrGo2 + "&"
      + "RequiredNpcOrGo1=" + requiredNpcOrGo3 + "&"
      + "RequiredNpcOrGo1=" + requiredNpcOrGo4,
      false
    );
    request.send(null);

    if (request.status === 200) {
      data = JSON.parse(request.responseText);
      if (!Array.isArray(data) || data.length < 1) { return ""; }
      return data[0].title;
    } else {
      return "";
    }
  };

  app.synchGetQuestTitleByCriteriaFunc2 = function(requiredNpcOrGo1, requiredNpcOrGo2, requiredNpcOrGo3, requiredNpcOrGo4, requiredSpellCast1) {
    if (requiredNpcOrGo1 == undefined) { requiredNpcOrGo1 = ""; }
    if (requiredNpcOrGo2 == undefined) { requiredNpcOrGo2 = ""; }
    if (requiredNpcOrGo3 == undefined) { requiredNpcOrGo3 = ""; }
    if (requiredNpcOrGo4 == undefined) { requiredNpcOrGo4 = ""; }
    if (requiredSpellCast1 == undefined) { requiredSpellCast1 = ""; }
    var request, data;
    request = new XMLHttpRequest();
    request.open(
      'GET',
      app.api + "custom/GetQuestTitleByCriteria/?"
      + "RequiredNpcOrGo1=" + requiredNpcOrGo1 + "&"
      + "RequiredNpcOrGo1=" + requiredNpcOrGo2 + "&"
      + "RequiredNpcOrGo1=" + requiredNpcOrGo3 + "&"
      + "RequiredNpcOrGo1=" + requiredNpcOrGo4 + "&"
      + "RequiredSpellCast1=" + requiredSpellCast1,
      false
    );
    request.send(null);

    if (request.status === 200) {
      data = JSON.parse(request.responseText);
      if (!Array.isArray(data) || data.length < 1) { return ""; }
      return data[0].title;
    } else {
      return "";
    }
  };

  app.synchGetItemNameById = function(id) {
    var request, data;
    request = new XMLHttpRequest();
    request.open('GET', app.api + "item/template/" + id, false);
    request.send(null);

    if (request.status === 200) {
      data = JSON.parse(request.responseText);
      if (!Array.isArray(data) || data.length < 1) { return id; }
      return data[0].name;
    } else {
      return id;
    }
  };

  app.synchGetGameObjectNameById = function(id) {
    var request, data;
    request = new XMLHttpRequest();
    request.open('GET', app.api + "gameobject/template/" + id, false);
    request.send(null);

    if (request.status === 200) {
      data = JSON.parse(request.responseText);
      if (!Array.isArray(data) || data.length < 1) { return id; }
      return data[0].name;
    } else {
      return id;
    }
  };

  app.synchGetGameObjectNameByGuid = function(guid) {
    var request, data, id;
    request = new XMLHttpRequest();
    request.open('GET', app.api + "gameobject/spawn/guid/" + guid, false);
    request.send(null);

    if (request.status === 200) {

      data = JSON.parse(request.responseText);
      if (!Array.isArray(data) || data.length < 1) { return guid; }
      id = data[0].id;

      request = new XMLHttpRequest();
      request.open('GET', app.api + "gameobject/template/" + id, false);
      request.send(null);

      if (!Array.isArray(data) || request.status === 200) {

        data = JSON.parse(request.responseText);
        if (data.length < 1) { return guid; }
        return data[0].name;

      } else {
        return guid;
      }
    } else {
      return guid;
    }
  };

  app.synchGetSpellNameById = function(id) {
    var request, data;
    request = new XMLHttpRequest();
    request.open('GET', app.api + "dbc/spells/" + id, false);
    request.send(null);

    if (request.status === 200) {
      data = JSON.parse(request.responseText);
      if (!Array.isArray(data) || data.length < 1) { return id; }
      return data[0].spellName;
    } else {
      return id;
    }
  };

}());
