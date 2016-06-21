'use strict';

/**
 * @ngdoc function
 * @name majiApp.controller:PostBankTransactionsCtrl
 * @description
 * # PostBankTransactionsCtrl
 * Controller of the majiApp
 */
app.controller('PostBankTransactionsCtrl', function($scope, $http, $stateParams, appService, $cookieStore, $state, $mdDialog, $mdToast, $animate, $rootScope, $timeout, Upload) {
  $scope.fileId = $stateParams.fileId;
  var config = appService.getCofig();




var fileId=$scope.fileId;

var fileRequest={};
fileRequest.fileId=fileId;

appService.getPostBankFile(fileRequest).success(function(response) {
  $scope.errorOccured = false;
  $scope.file = response.payload;
}).error(function(data, status) {
  if (status === 401) {
    $state.go('session');
    $scope.message = data.message;
  } else {
    $scope.errorOccured = true;
    $scope.errorMsg = data.message;
    //$state.go('postbank');
  }
});


  appService.getPostBankFileTransactions(fileId).success(function(response) {
    $scope.errorOccured = false;
    $scope.transactions = response.payload;
  }).error(function(data, status) {
    if (status === 401) {
      $state.go('session');
      $scope.message = data.message;
    } else {
      $scope.errorOccured = true;
      $scope.errorMsg = data.message;
      //$state.go('postbank');
    }
  });





});