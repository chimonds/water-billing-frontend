'use strict';

/**
 * @ngdoc function
 * @name equismsApp.controller:BillingCtrl
 * @description
 * # BillingCtrl
 * Controller of the equismsApp
 */
app.controller('BillingCtrl', function ($scope, $http, appService, $cookieStore, $state, $mdDialog, $mdToast, $animate, $rootScope) {
  var config = appService.getCofig();

  $scope.accountFound = false;
  var request = {};
  request.page = 0;
  request.size = 1;
  request.filter = '';

  //init billing variables
  $scope.totalBilled = 0;
  $scope.totalCharges = 0;
  $scope.form = {};
  $scope.form.unitsConsumed = 0;


  //Get active billing month
  appService.getActiveBillingMonths(request).success(function (response) {
    $scope.activeBillingMonth = response.payload;
  }).error(function (data, status) {
    if (status === 401) {
      $state.go('session');
      $scope.message = data.message;
    } else {
      $scope.errorOccured = true;
      $scope.errorMsg = data.message;
      $state.go('billing');
    }
  });

  $scope.data = {};
  $scope.data.lastBillingDate = '';


  $scope.searchAccount = function () {
    //Reinitialize this values
    $scope.form.meterReading='';
    $scope.form.previousReading='';
    $scope.form.unitsConsumed='';
    $scope.form.consumptionType='';
    $scope.totalBilled='';
    $scope.totalCharges='';

    $scope.accountFound = false;
    $scope.searchingResults =false;
    $scope.submittingBill = false;
    //blank last bill info
    $scope.lastBill={};

    var accNo = $scope.form.accNo;
    if(accNo.length<9){
      $scope.searchingResults =true;
      return;
    }

    //send request
    //request.accNo=accNo;
    var request = {};
    request.accNo = accNo;
    appService.getAccount(request).success(function (response) {
      $scope.account = response.payload;
      //console.log(response);
      $scope.accountFound = true;
      $scope.searchingResults =true;
      $scope.error = false;

      $scope.data = $scope.account;

      $scope.billed = true;

      //get bill item types
      $scope.getBillItemTypes();

      var accountId = $scope.account.accountId;
      var request = {};
      appService.getLastBillByAccount(request, accountId).success(function (response) {
        $scope.error = false;
        $scope.lastBill = response.payload;
        $scope.form.previousReading = $scope.lastBill.currentReading;
        $scope.billed = $scope.lastBill.billed;
        $scope.message ='';
      });
    }).error(function (data, status) {
      $scope.data = {};
      if (status === 401) {
        $state.go('session');
        $scope.message = data.message;
      } else {
        $scope.error = true;
        $scope.accountFound = false;
        $scope.message = data.message;
      }
    });
  };

  $scope.getBillItemTypes = function () {
    appService.getBillItemTypes(request).success(function (response) {
      $scope.charges = response.payload;
    });
    $scope.charged = [];
  };
  $scope.removeCharge = function (index) {
    var charge = $scope.charged[index];
    //remove from assigned
    $scope.charged.splice(index, 1);

    //add to available
    $scope.charges.push(charge);

    //recalculate
    $scope.calcBilled();
  };
  $scope.addCharge = function (index) {

    var charge = $scope.charges[index];

    //remove from charges
    $scope.charges.splice(index, 1);

    //add to charged
    $scope.charged.push(charge);

    //recalculate
    $scope.calcBilled();
  }

  $scope.calcUnits = function () {
    var lastReading = $scope.form.previousReading;
    var currentReading = $scope.form.meterReading;
    var units = currentReading - lastReading;
    if (units > 0) {
      $scope.form.consumptionType = 'Actual';
    } else {
      units = $scope.data.averageConsumption;
      $scope.form.consumptionType = 'Average';
    }
    $scope.form.unitsConsumed = units;

    $scope.calcBilled();
  };

  $scope.calcBilled = function () {
    var units = $scope.form.unitsConsumed;
    var accountId = $scope.account.accountId;
    var request = {};
    request.units = units;
    appService.calculateAmountBilled(request, accountId).success(function (response) {
      console.log(response);
      $scope.totalBilled = response.payload.amount;
    });

    //calculate other charges
    $scope.totalCharges = 0;
    angular.forEach($scope.charged, function (item) {
      $scope.totalCharges += item.amount;
    });
  };

  $scope.submit = function (form) {
    var myForm = $scope.myForm.object;
    if (myForm.$invalid === false) {
      var accountId = $scope.account.accountId;
      var request = {};
      request.billItemTypes = $scope.charged;
      request.currentReading = $scope.form.meterReading;
      request.previousReading = $scope.form.previousReading;

      //Send payload to server
      $scope.submittingBill = true;
      $scope.error = false;
      $scope.alert_css = config.cssAlertSucess;
      $scope.message = config.msgSendingData;


      appService.billAccount(request, accountId).success(function (response) {
        $scope.error = false;
        $scope.alert_css = config.cssAlertSucess;
        $scope.message = response.message;
      }).error(function (data, status) {
        $scope.alert_css = config.cssAlertDanger;
        if (status === 401) {
          $state.go('session');
          $scope.message = data.message;
        } else {
          $scope.error = true;
          $scope.message = data.message;
        }
      });
    }
  }
});
