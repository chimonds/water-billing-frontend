'use strict';

/**
 * @ngdoc function
 * @name majiApp.controller:PaymentsReportCtrl
 * @description
 * # PaymentsReportCtrl
 * Controller of the majiApp
 */
app.controller('PaymentsReportCtrl', function($scope, $http, appService, $cookieStore, $state, $mdDialog, $mdToast, $animate, $rootScope) {
  var config = appService.getCofig();
  $scope.progress = false;
  $scope.report = false;
  $scope.form = {};

  var request = {};
  request.page = 0;
  request.size = 100;

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

  //Get payment types
  appService.getPaymentTypes(request).success(function(response) {
    $scope.paymentTypes = response.payload.content;
    console.log($scope.paymentTypes);

  });


  $scope.generate = function(form) {
    $scope.progress = true;
    $scope.report = false;
    //Get active billing month
    // var request = {};
    //
    // var myForm = $scope.myForm.object;

    //set from date
    // var fromDate = moment(form.fromDate).unix();
    // if (typeof fromDate === 'undefined' || typeof fromDate === 'NaN') {
    //   fromDate = moment().unix();
    // }
    // request.fromDate = fromDate;
    //
    // var toDate = moment(form.toDate).unix();
    // if (typeof toDate === 'undefined' || typeof toDate === 'NaN') {
    //   toDate = moment().unix();
    // }
    // request.toDate = toDate;

    appService.getPaymentsReport(form).success(function(response) {
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
  //'ACCOUNT#',	'NAME',	'ZONE',	'DATE',	'TYPE',	'RECEIPT#',	'AMOUNT'
  $scope.generateCsv = function() {
    $scope.csvData = [];
    var accounts = $scope.records.content;
    angular.forEach(accounts, function(value) {
      var transDate = new Date(value.transactionDate);
      $scope.csvData.push({
        a: value.accNo,
        b: value.accName,
        c: value.zone,
        d: transDate,
        e: value.paymentType,
        f: value.receiptNo,
        g: value.amount
      });
    });
    return $scope.csvData;
  };
});