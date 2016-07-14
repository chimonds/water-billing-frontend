'use strict';

/**
 * @ngdoc function
 * @name majiApp.controller:BillingSummaryCtrl
 * @description
 * # BillingSummaryCtrl
 * Controller of the majiApp
 */
app.controller('BillingSummaryCtrl', function($scope, $http, appService, $cookieStore, $state, $mdDialog, $mdToast, $animate, $rootScope, $stateParams) {
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

  var request = {};
  request.page = 0;
  request.size = 100;

  //Load zones
  appService.getZones(request).success(function(response) {
    $scope.zones = response.payload.content;
  }).error(function(data, status) {
    $state.go('session');
  });

  appService.getAllBillingMonths(request).success(function(response) {
    console.log(response);
    $scope.billingMonths = response.payload;
  }).error(function(data, status) {
    $state.go('session');
  });


  $scope.generate = function(form) {
    $scope.progress = true;
    $scope.report = false;
    //Get active billing month
    var request = {};

    var myForm = $scope.myForm.object;

    //select zone
    var billingMonth = form.billingMonth;
    if (typeof billingMonth !== 'undefined') {
      request.billingMonthId = $scope.billingMonths[billingMonth].billingMonthId;
      $scope.selectedBillingMonth=$scope.billingMonths[billingMonth];
    }

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

    appService.getBillingSummaryReport(params).success(function(response) {
      $scope.progress = false;
      $scope.error = false;
      $scope.data = response.payload;
      $scope.records = response.payload.content;
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
  //'#',	'Amount'
  $scope.generateCsv = function() {
    $scope.csvData = [];
    var summary = $scope.records;
    var sum=$scope.data;

    $scope.csvData.push({
      a: 'Billed Amount',
      b: ''
    });

    $scope.csvData.push({
      a: 'Water Billed on Actual',
      b: summary.billedOnActual
    });

    $scope.csvData.push({
      a: 'Water Billed on Estimate',
      b: summary.billedOnEstimate
    });

    $scope.csvData.push({
      a: 'Total Billed for the month',
      b: summary.billedOnEstimate+summary.billedOnActual
    });

    $scope.csvData.push({
      a: '',
      b:''
    });

    $scope.csvData.push({
      a: 'Other Billings',
      b: ''
    });

    $scope.csvData.push({
      a: 'All Meter Rent Charged',
      b: sum.meterRent
    });

    $scope.csvData.push({
      a: 'All Reconnection Fees Charged',
      b: summary.reconnectionFee
    });

    $scope.csvData.push({
      a: 'All By-pass Fees Charged',
      b: summary.byPassFee
    });

    $scope.csvData.push({
      a: 'All Bounced Cheques Charged',
      b: summary.bouncedChequeFee
    });

    $scope.csvData.push({
      a: 'Change of Account name Charged',
      b: summary.changeOfAccountName
    });

    $scope.csvData.push({
      a: 'Cut off Owner\'s Request Charged',
      b: summary.atOwnersRequestFee
    });

    $scope.csvData.push({
      a: 'Surcharge for Misuse of Water',
      b: summary.surchargeMissuse
    });

    $scope.csvData.push({
      a: 'Surcharge for irrigation',
      b: summary.surchargeIrrigation
    });

    $scope.csvData.push({
      a: 'Total Billed amount for the month',
      b: sum.amount
    });

    $scope.csvData.push({
      a: '',
      b: ''
    });

    $scope.csvData.push({
      a: 'Adjustments',
      b: ''
    });

    $scope.csvData.push({
      a: 'Debit Adjustments',
      b: summary.debitAdjustments
    });

    $scope.csvData.push({
      a: 'Credit Adjustments',
      b: summary.creditAdjustments
    });


    return $scope.csvData;
  };

});