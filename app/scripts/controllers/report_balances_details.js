'use strict';

/**
 * @author maitha.manyala [at] gmail.com
 * @ngdoc function
 * @name majiApp.controller:BalancesDetailCtrl
 * @description
 * # UsersCtrl
 * Controller of the BalancesDetailCtrl
 */

app.controller('BalancesDetailCtrl', function($scope, $http, appService, $cookieStore, $state, $mdDialog, $mdToast, $animate, $rootScope, $stateParams) {
  $scope.reportHeaderId = $stateParams.reportHeaderId;


  var request = {};
  var reportHeaderId = $scope.reportHeaderId;

  $scope.$on('onReloadAccountData', function(event) {
    //$scope.getAccountProfile();
  });


  $scope.getReport = function() {
    var request = {};
    request.reportHeaderId = $scope.reportHeaderId;
    appService.getScheduledAccountBalancesReport(request).success(function(response) {
      $scope.progress = false;
      $scope.error = false;
      $scope.accounts = response.payload;
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

  $scope.getReport();


  //Generate CSV File
  $scope.generateCsv = function() {
    $scope.csvData = [];
    var accounts = $scope.accounts.content;
    angular.forEach(accounts, function(value) {
      $scope.csvData.push({
        a: value.accNo,
        b: value.name,
        c: value.zone,
        d: value.cutOff,
        e: value.balance
      });
    });
    return $scope.csvData;
  };

});