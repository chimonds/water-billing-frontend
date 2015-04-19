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


        var account_id = $scope.account.accountId;


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

  });
