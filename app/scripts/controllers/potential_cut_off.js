'use strict';

/**
 * @ngdoc function
 * @name majiApp.controller:PotentialCutOffCtrl
 * @description
 * # PotentialCutOffCtrl
 * Controller of the majiApp
 */

app.controller('PotentialCutOffCtrl', function($scope, $http, appService, $cookieStore, $state, $mdDialog, $mdToast, $animate, $rootScope, $stateParams) {
  var config = appService.getCofig();
  $scope.progress = false;
  $scope.report = false;
  $scope.form = {};

  $scope.status = [{
    'name': 'All'
  }, {
    'name': 'Active'
  }, {
    'name': 'Inactive'
  }];

  $scope.credit = [{
    'name': 'Include'
  }, {
    'name': 'Exclude'
  }, {
    'name': 'Only'
  }];

  var request = {};
  request.page = 0;
  request.size = 100;

  //Load zones
  appService.getZones(request).success(function(response) {
    $scope.zones = response.payload.content;
  }).error(function(data, status) {
    $state.go('session');
  });


  $scope.generate = function(form) {
    $scope.progress = true;
    $scope.report = false;
    //Get active billing month
    var request = {};

    var myForm = $scope.myForm.object;

    //set transaction date
    var transactionDate = moment(form.transactionDate).unix();
    if (typeof transactionDate === 'undefined' || typeof transactionDate === 'NaN') {
      transactionDate = moment().unix();
    }
    request.transactionDate = transactionDate;

    //select zone
    var zone = form.accZone;
    if (typeof zone !== 'undefined') {
      request.zoneId = $scope.zones[zone].zoneId;
    }

    var accountStatus = form.status;
    if (typeof accountStatus !== 'undefined') {
      request.accountStatus = $scope.status[accountStatus].name;
    }

    var params = {};
    params.fields = request;

    appService.getPotentialCutOffReport(params).success(function(response) {
      $scope.progress = false;
      $scope.error = false;
      $scope.records = response.payload;
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
  //'ACCOUNT#',	'NAME',	'ZONE',	'LAST BILLING MONTH',	'BEFORE BILLING',	'BILLED',	'AFTER BILLING'
  $scope.generateCsv = function() {
    $scope.csvData = [];
    var accounts = $scope.records.content;
    angular.forEach(accounts, function(value) {
      var lastBillingMonth = new Date(value.lastBillingMonth);
      $scope.csvData.push({
        a: value.accNo,
        b: value.accName,
        c: value.zone,
        d: lastBillingMonth,
        e: value.beforeBilling,
        f: value.billedAmount,
        g: value.afterBilling
      });
    });
    return $scope.csvData;
  };
});