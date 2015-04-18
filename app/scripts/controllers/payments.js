'use strict';

/**
 * @author maitha.manyala [at] gmail.com
 * @ngdoc function
 * @name billingApp.controller:BillingMonthsCtrl
 * @description
 * # UsersCtrl
 * Controller of the BillingMonthsCtrl
 */

app.controller('PaymentsCtrl', function($scope, $http, appService, $cookieStore, $state, $mdDialog, $mdToast, $animate, $rootScope) {
  var config = appService.getCofig();
  $scope.params = {};
  $scope.params.page = 1;
  $scope.params.size = 10;

  //search filter
  $scope.searchFilter = {};
  $scope.searchFilter.text = '';

  //listen on role added
  $scope.$on('onReloadPageData', function(event) {
    $scope.getPageData(1);
  });

  //handle pagination
  $scope.pageChanged = function(newPage) {
    $scope.getPageData(newPage);
  };

  $scope.getPageData = function(newPage) {
    newPage--;
    var request = {};
    request.page = newPage;
    request.size = 10;


    if (typeof $scope.searchFilter.text === 'undefined') {
      $scope.searchFilter.text = '';
    }
    //set search filter
    request.filter = $scope.searchFilter.text;

    //send request
    appService.getPayments(request).success(function(response) {
      $scope.errorOccured = false;
      $scope.payments = response.payload.content;
      $scope.totalPayments = response.payload.totalElements; //to change this
      $state.go('payments');
    }).error(function(data, status) {
      if (status === 401) {
        $state.go('session');
        $scope.message = data.message;
      } else {
        $scope.errorOccured = true;
        $scope.errorMsg = data.message;
        $state.go('payments');
      }
    });

  };

  //load page data
  $scope.getPageData(1);

  $scope.seach = function() {
    $scope.getPageData(1);
  };

});
