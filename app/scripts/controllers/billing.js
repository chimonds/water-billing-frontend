'use strict';

/**
 * @ngdoc function
 * @name equismsApp.controller:BillingCtrl
 * @description
 * # BillingCtrl
 * Controller of the equismsApp
 */
  app.controller('BillingCtrl', function ($scope, $http, appService, $cookieStore, $state, $mdDialog, $mdToast, $animate, $rootScope) {
    $scope.accountFound = false;
    var request = {};
    request.page = 0;
    request.size = 1;
    request.filter = '';

    //Get active billing month
    appService.getActiveBillingMonths(request).success(function (response) {
      $scope.activeBillingMonth = response.payload;
    });

    $scope.data ={};
    $scope.data.lastBillingDate ='Test Data';



    $scope.searchAccount = function() {
      var accNo = $scope.accNo;
      //send request
      //request.accNo=accNo;
      var request = {};
      request.accNo = accNo;

      appService.getAccount(request).success(function (response) {
        $scope.account = response.payload;
        $scope.accountFound = true;
        $scope.error = false;

        $scope.data= $scope.account;

        $scope.billed = true;


        var accountId = $scope.account.accountId;
        var request={};
        appService.getLastBillByAccount(request, accountId).success(function (response) {
          console.log(response);
          $scope.lastBill = response.payload;
          $scope.billed =$scope.lastBill.billed;
        });
      }).error(function (data, status) {
        $scope.data={};
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

    $scope.charges = [
      { name: 'Reconnection Fee', amount: 500 },
      { name: 'At Owners Request Fee', amount: 6000 },
      { name: 'Change Of Account Name', amount: 5000 }
    ];

    $scope.charged = [
      { name: 'Reconnection Fee', amount: 500 },
      { name: 'At Owners Request Fee', amount: 6000 },
      { name: 'Change Of Account Name', amount: 5000 }
    ];

    $scope.removeCharge= function(index){
      var charge = $scope.charged[index];
      //remove from assigned
      $scope.charged.splice(index, 1);

      //add to available
      $scope.charges.push(charge);
    };
    $scope.addCharge= function(index){

      var charge = $scope.charges[index];

      //remove from charges
      $scope.charges.splice(index, 1);

      //add to charged
      $scope.charged.push(charge);
    }

    $scope.calcUnits = function(){
      var lastReading =$scope.lastBill.currentReading;
      var currentReading = $scope.form.meterReading;
      var units = currentReading-lastReading;
      if(units>0){
        $scope.form.consumptionType ='Actual';
      }else{
        units= $scope.data.averageConsumption;
        $scope.form.consumptionType ='Average';
      }
      $scope.form.unitsConsumed = units;

      $scope.calcBilled();
    };

    $scope.totalBilled=0;

    $scope.calcBilled = function(){
      var units = $scope.form.unitsConsumed;
      var amountBilled = units* 45;
      $scope.totalBilled =amountBilled;
    };

  });
