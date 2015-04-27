'use strict';

/**
 * @ngdoc function
 * @name equismsApp.controller:BalancesCtrl
 * @description
 * # BalancesCtrl
 * Controller of the equismsApp
 */

app.controller('BalancesCtrl', function ($scope, $http, appService, $cookieStore, $state, $mdDialog, $mdToast, $animate, $rootScope) {
  var config = appService.getCofig();

  var request = {};
  request.page = 0;
  request.size = 1;
  request.filter = '';


  //Get active billing month
  appService.getAccountsReport(request).success(function (response) {

    $scope.accounts = response.payload;

  }).error(function (data, status) {
    if (status === 401) {
      $state.go('session');
      $scope.message = data.message;
    } else {
      $scope.errorOccured = true;
      $scope.errorMsg = data.message;
      $state.go('accounts');
    }
  });
});
