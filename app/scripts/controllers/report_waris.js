'use strict';

/**
 * @ngdoc function
 * @name majiApp.controller:BillingSummaryCtrl
 * @description
 * # BillingSummaryCtrl
 * Controller of the majiApp
 */
app.controller('WarisCtrl', function($scope, $http, appService, $cookieStore, $state, $mdDialog, $mdToast, $animate, $rootScope, $stateParams) {
  var config = appService.getCofig();
  $scope.progress = false;
  $scope.report = false;
  $scope.form = {};

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

  appService.getBillingMonths().success(function(response) {
    $scope.billingMonths = response.payload;
  }).error(function(data, status) {
    $state.go('session');
  });


  $scope.generate = function(form) {
    $scope.progress = true;
    $scope.report = false;
    appService.getWarisReport(form).success(function(response) {
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
    var sum = $scope.data;

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
      b: summary.billedOnEstimate + summary.billedOnActual
    });

    $scope.csvData.push({
      a: '',
      b: ''
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
      a: 'Billed Consumption in Cubic Meters',
      b: ''
    });

    $scope.csvData.push({
      a: 'Actual Consumption',
      b: summary.unitsActualConsumption
    });

    $scope.csvData.push({
      a: 'Estimated Consumption',
      b: summary.unitsEstimatedConsumption
    });

    $scope.csvData.push({
      a: 'Total Billed Consumption',
      b: summary.unitsEstimatedConsumption + summary.unitsActualConsumption
    });

    $scope.csvData.push({
      a: '',
      b: ''
    });
    $scope.csvData.push({
      a: 'Registered Connections',
      b: ''
    });
    $scope.csvData.push({
      a: 'Number of Active Connections',
      b: summary.activeAccounts
    });
    $scope.csvData.push({
      a: 'Number of Inactive Connections',
      b: summary.inactiveAccounts
    });

    $scope.csvData.push({
      a: '',
      b: ''
    });
    $scope.csvData.push({
      a: 'Outstanding Balances',
      b: ''
    });

    $scope.csvData.push({
      a: 'Outstanding Balances for Active Connections',
      b: summary.balancesActiveAccounts
    });

    $scope.csvData.push({
      a: 'Outstanding Balances for Inactive Connections',
      b: summary.balancesInactiveAccounts
    });

    $scope.csvData.push({
      a: 'Total Balances for all Connections',
      b: summary.balancesInactiveAccounts + summary.balancesActiveAccounts
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

    $scope.csvData.push({
      a: '',
      b: ''
    });

    $scope.csvData.push({
      a: 'Receipts',
      b: ''
    });

    $scope.csvData.push({
      a: 'Allocated Receipts',
      b: summary.totalPayments
    });
    $scope.csvData.push({
      a: '',
      b: ''
    });

    $scope.csvData.push({
      a: 'Metering Status',
      b: ''
    });
    $scope.csvData.push({
      a: 'Active Metered Connections',
      b: summary.activeMeteredAccounts
    });
    $scope.csvData.push({
      a: 'Active Metered Connections',
      b: summary.activeUnMeteredAccounts
    });

    $scope.csvData.push({
      a: '',
      b: ''
    });

    $scope.csvData.push({
      a: 'Metered Connections Analysis',
      b: ''
    });
    $scope.csvData.push({
      a: 'Actual',
      b: summary.meteredBilledActual
    });

    $scope.csvData.push({
      a: 'Estimate',
      b: summary.meteredBilledAverage
    });

    $scope.csvData.push({
      a: 'Number of Meters Read',
      b: summary.meteredBilledAverage + summary.meteredBilledActual
    });




    return $scope.csvData;
  };
});