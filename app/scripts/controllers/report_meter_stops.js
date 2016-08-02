'use strict';

/**
 * @ngdoc function
 * @name majiApp.controller:ReportMeterStopsCtrl
 * @description
 * # ReportMeterStopsCtrl
 * Controller of the majiApp
 */

app.controller('ReportMeterStopsCtrl', function($scope, $http, appService, $cookieStore, $state, $mdDialog, $mdToast, $animate, $rootScope) {
  var config = appService.getCofig();
  $scope.progress = false;
  $scope.report = false;
  $scope.form = {};

  //Getting billing months
  appService.getBillingMonths().success(function(response) {
    $scope.billingMonths = response.payload;
  }).error(function(data, status) {
    $state.go('session');
  });

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

    appService.getMeterStops(form).success(function(response) {
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
      }
    });
  };
  //Generate CSV File
  //ACCOUNT#	NAME	ZONE	CONSUMPTION	CR	PR	AVERAGE	UNITS
  $scope.generateCsv = function() {
    $scope.csvData = [];
    var accounts = $scope.data.content;
    angular.forEach(accounts, function(value) {
      var accStatus = 'Active';
      if (!value.active) {
        accStatus = 'Inactive';
      }
      $scope.csvData.push({
        a: value.accNo,
        b: value.accName,
        c: value.zone,
        d: value.consumption,
        e: value.currentReading,
        f: value.previousReading,
        g: value.average,
        h: value.units
      });
    });
    return $scope.csvData;
  };
});