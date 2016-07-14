'use strict';

/**
 * @ngdoc function
 * @name majiApp.controller:AgeingCtrl
 * @description
 * # AgeingCtrl
 * Controller of the equismsApp
 */

app.controller('AgeingCtrl', function($scope, $http, appService, $cookieStore, $state, $mdDialog, $mdToast, $animate, $rootScope, $stateParams) {
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

    appService.getAgeingReport(params).success(function(response) {
      $scope.progress = false;
      $scope.error = false;
      $scope.records = response.payload;
      $scope.report = true;

      //Calculate the totals
      $scope.totalAbove0 = 0;
      $scope.totalabove30 = 0;
      $scope.totalabove60 = 0;
      $scope.totalabove90 = 0;
      $scope.totalabove120 = 0;
      $scope.totalabove180 = 0;
      $scope.totalBalance = 0;

      for (var i = 0; i < $scope.records.content.length; i++) {
        var record = $scope.records.content[i];


        $scope.totalAbove0 += record.above0;
        $scope.totalabove30 += record.above30;
        $scope.totalabove60 += record.above60;
        $scope.totalabove90 += record.above90;
        $scope.totalabove120 += record.above120;
        $scope.totalabove180 += record.above180;
        $scope.totalBalance += record.balance;
      }


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
  $scope.generateCsv = function() {
    $scope.csvData = [];
    var accounts = $scope.records.content;
    angular.forEach(accounts, function(value) {
      var accStatus = 'Active';
      if (!value.active) {
        accStatus = 'Inactive';
      }
      $scope.csvData.push({
        a: value.accNo,
        b: value.name,
        c: accStatus,
        d: value.zone,
        e: value.above0,
        f: value.above30,
        g: value.above60,
        h: value.above90,
        i: value.above120,
        j: value.above180,
        k: value.balance
      });
    });
    return $scope.csvData;
  };
});