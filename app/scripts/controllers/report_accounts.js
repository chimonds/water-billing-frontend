'use strict';

/**
 * @ngdoc function
 * @name majiApp.controller:ReportFieldCardCtrl
 * @description
 * # ReportFieldCardCtrl
 * Controller of the majiApp
 */

app.controller('ReportAccountsCtrl', function($scope, $http, appService, $cookieStore, $state, $mdDialog, $mdToast, $animate, $rootScope) {
  var config = appService.getCofig();
  $scope.progress = false;
  $scope.report = false;
  $scope.form = {};


  var request = {};
  request.page = 0;
  request.size = 100;

  //get schemes
  appService.getSchemesList().success(function(response) {
    $scope.schemes = response.payload;
  }).error(function(data, status) {
    $state.go('session');
  });

  //Load zones
  $scope.getSchemeZones = function() {
    $scope.zones = {};
    $scope.form.zoneId = "";

    var request = {};
    request.schemeId = $scope.form.schemeId;
    appService.getZonesByScheme(request).success(function(response) {
      $scope.zones = response.payload;
    }).error(function(data, status) {
      $state.go('session');
    });
  };

  $scope.generate = function(form) {
    $scope.progress = true;
    $scope.report = false;

    appService.getAccountsReport(form).success(function(response) {
      $scope.progress = false;
      $scope.error = false;
      $scope.data = response.payload;
      $scope.report = true;

    }).error(function(data, status) {
      if (status === 401) {
        $scope.progress = false;
        $state.go('session');
        $scope.message = data.message;
      } else {
        $scope.progress = false;
        $scope.error = true;
        $scope.message = data.message;
        //$state.go('field_card');
      }
    });
  };

  //Generate CSV File
  //'CREATED ON',	'ACCOUNT#', 'NAME','ZONE','MOBILE NO','STATUS'
  $scope.generateCsv = function() {
    $scope.csvData = [];
    var accounts = $scope.data.content;
    angular.forEach(accounts, function(value) {
      var accStatus = 'Active';
      if (!value.active) {
        accStatus = 'Inactive';
      }
      var createdOn = new Date(value.createdOn);
      $scope.csvData.push({
        a: createdOn,
        b: value.accNo,
        c: value.accName,
        d: value.zone,
        e: value.phoneNo,
        f: accStatus
      });
    });
    return $scope.csvData;
  };
});