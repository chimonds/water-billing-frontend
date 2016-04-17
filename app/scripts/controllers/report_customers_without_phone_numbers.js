'use strict';

/**
 * @ngdoc function
 * @name majiApp.controller:ReportCustomersWithoutPhoneNumbersCtrl
 * @description
 * # ReportCustomersWithoutPhoneNumbersCtrl
 * Controller of the majiApp
 */

app.controller('ReportCustomersWithoutPhoneNumbersCtrl', function($scope, $http, appService, $cookieStore, $state, $mdDialog, $mdToast, $animate, $rootScope) {
  var config = appService.getCofig();
  $scope.progress = false;
  $scope.report = false;
  $scope.form = {};

  $scope.status = [{
    'name': 'All'
  }, {
    'name': 'Active'
  }, {
    'name': 'Inactive'
  }];

  $scope.credit = [{
    'name': 'Include'
  }, {
    'name': 'Exclude'
  }, {
    'name': 'Only'
  }];

  var request = {};
  request.page = 0;
  request.size = 100;

  $scope.generate = function(form) {
    $scope.progress = true;
    $scope.report = false;
    //Get active billing month
    var request = {};

    var myForm = $scope.myForm.object;

    var params = {};
    params.fields = request;

    appService.getCustomersWithoutPhoneNumbers(params).success(function(response) {
      $scope.progress = false;
      $scope.error = false;
      $scope.records = response.payload;
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
        $state.go('customers_without_phones');
      }
    });
  };

  //Generate CSV File
  //'ID#',	'NAME',
  $scope.generateCsv = function() {
    $scope.csvData = [];
    var accounts = $scope.records.content;
    angular.forEach(accounts, function(value) {
      $scope.csvData.push({
        a: value.id,
        b: value.accName
      });
    });
    return $scope.csvData;
  };
});