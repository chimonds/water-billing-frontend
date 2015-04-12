'use strict';

/**
 * @author maitha.manyala [at] gmail.com
 * @ngdoc function
 * @name billingApp.controller:AccountsDetailCtrl
 * @description
 * # UsersCtrl
 * Controller of the AccountsDetailCtrl
 */

app.controller('AccountsDetailCtrl', function($scope, $http, appService, $cookieStore, $state, $mdDialog, $mdToast, $animate, $rootScope,$stateParams) {
  $scope.accountId = $stateParams.accountId;
  $scope.consumerName = $stateParams.consumerName;

  var request = {};
  var accountId = $scope.accountId;
  //send request
  appService.getAccountById(request,accountId).success(function (response) {
    $scope.account = response.payload;
    $scope.accountFound = true;
    $scope.errorOccured = false;

    var account_id = $scope.account.accountId;
    //get bills
    $scope.getBills(1);

    //get payments
    $scope.getPayments(1);

  }).error(function (data, status) {
    if (status === 401) {
      $state.go('session');
      $scope.message = data.message;
    } else {
      $scope.errorOccured = true;
      $scope.accountFound = false;
      $scope.errorMsg = data.message;
    }
  });

  $scope.getBills = function(newPage) {
    newPage--;
    var request = {};
    request.page = newPage;
    request.size = 10;
    //set search filter
    request.filter = '';

    var accountId = $scope.account.accountId;

    //send request
    appService.getBillsByAccount(request, accountId).success(function(response) {
      $scope.errorOccured = false;
      $scope.bills = response.payload.content;
      $scope.totalBills = response.payload.totalElements;

    }).error(function(data, status) {
      if (status === 401) {
        $state.go('session');
        $scope.message = data.message;
      } else {
        $scope.errorOccured = true;
        $scope.errorMsg = data.message;
      }
    });

  };

  $scope.getPayments = function(newPage) {
    newPage--;
    var request = {};
    request.page = newPage;
    request.size = 10;
    //set search filter
    request.filter = '';

    var accountId = $scope.account.accountId;

    //send request
    appService.getPaymentsByAccount(request, accountId).success(function(response) {
      $scope.errorOccured = false;
      $scope.payments = response.payload.content;
      $scope.totalPayments = response.payload.totalElements;

    }).error(function(data, status) {
      if (status === 401) {
        $state.go('session');
        $scope.message = data.message;
      } else {
        $scope.errorOccured = true;
        $scope.errorMsg = data.message;
      }
    });

  };

});
