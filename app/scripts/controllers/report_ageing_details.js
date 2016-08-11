'use strict';

/**
 * @author maitha.manyala [at] gmail.com
 * @ngdoc function
 * @name majiApp.controller:AgeingDetailCtrl
 * @description
 * # UsersCtrl
 * Controller of the AgeingDetailCtrl
 */

app.controller('AgeingDetailCtrl', function($scope, $http, appService, $cookieStore, $state, $mdDialog, $mdToast, $animate, $rootScope, $stateParams) {
  $scope.reportHeaderId = $stateParams.reportHeaderId;


  var request = {};
  var reportHeaderId = $scope.reportHeaderId;

  $scope.$on('onReloadAccountData', function(event) {
    //$scope.getAccountProfile();
  });


  $scope.getReport = function() {
    var request = {};
    request.reportHeaderId = $scope.reportHeaderId;
    appService.getScheduledAgeingBalancesReport(request).success(function(response) {
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
        c: value.cutOff,
        d: value.zone,
        e: value.balanceToday,
        f: value.balanceOneMonthsAgo,
        g: value.balanceTwoMonthsAgo,
        h: value.balanceThreeMonthsAgo,
        i: value.balanceFourMonthsAgo,
        j: value.balanceSixMonthsAgo,
        k: value.balance
      });
    });
    return $scope.csvData;
  };

});