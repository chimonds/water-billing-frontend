'use strict';

/**
 * @ngdoc function
 * @name majiApp.controller:ReportBilledChargesCtrl
 * @description
 * # ReportBilledAmountCtrl
 * Controller of the majiApp
 */

app.controller('ReportBilledChargesCtrl', function($scope, $http, appService, $cookieStore, $state, $mdDialog, $mdToast, $animate, $rootScope) {
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

    appService.getBilledChargesReport(form).success(function(response) {
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
  //ACCOUNT#	NAME	ZONE	CONSUMPTION	CR	PR	AVERAGE	UNITS	METER RENT	CHARGES	BILLED	TOTAL
  $scope.generateCsv = function() {
    $scope.csvData = [];
    var accounts = $scope.data.content;
    angular.forEach(accounts, function(value) {
      //['ACCOUNT#',	'NAME','STATUS','ZONE','METER OWNER','METER NO','METER SIZE',
      // 'METER RENT','BILLED AMOUNT','RECONNECTION FEE','AT OWNERS REQUEST FEE','CHANGE OF ACCOUNT NAME FEE',
      // 'BY PASS FEE','BOUNCED CHEQUE FEE','SURCHARGE IRRIGATION FEE','SURCHARGE MISSUSE FEE',
      // 'METER SERVICING FEE', 'TOTAL BILLED']"

      // Integer currentReading = 0;
      //    Integer previousReading = 0;
      //    Integer units = 0;
      //    String consumption;
      //    Integer average = 0;

      $scope.csvData.push({
        a: value.accNo,
        b: value.accName,
        c: value.accountStatus,
        d: value.zone,
        e: value.category,
        f: value.previousReading,
        g: value.currentReading,
        h: value.consumption,
        i: value.units,
        j: value.average,
        k: value.meterOwner,
        l: value.meterNo,
        m: value.meterSize,
        n: value.meterRent,
        o: value.amount,
        p: value.reconnectionFee,
        q: value.atOwnersRequestFee,
        r: value.changeOfAccountName,
        s: value.byPassFee,
        t: value.bouncedChequeFee,
        u: value.surchargeIrrigationFee,
        v: value.surchageMisuseFee,
        w: value.meterServicingFee,
        x: value.totalBill
      });
    });
    return $scope.csvData;
  };
});