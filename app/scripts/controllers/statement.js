'use strict';

/**
 * @ngdoc function
 * @name majiApp.controller:StatementCtrl
 * @description
 * # StatementCtrl
 * Controller of the majiApp
 */
  app.controller('StatementCtrl', function ($scope, $http, appService, $cookieStore, $state, $mdDialog, $mdToast, $animate, $rootScope,$stateParams) {
    $scope.accountId = $stateParams.accountId;


    var request = {};
    var accountId = $scope.accountId;

    $scope.progress = true;
    $scope.report = false;

    appService.getAccountById(request, accountId).success(function (response) {
      $scope.account = response.payload;
      $scope.accountFound = true;
      $scope.errorOccured = false;
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

    var params= {};
    params.fields = request;

    appService.getAccountStatementReport(params,accountId ).success(function (response) {
      $scope.progress = false;
      $scope.error = false;
      $scope.records = response.payload;
      $scope.report = true;

    }).error(function (data, status) {
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


  });
