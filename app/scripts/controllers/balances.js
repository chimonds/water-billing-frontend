'use strict';

/**
 * @ngdoc function
 * @name majiApp.controller:BalancesCtrl
 * @description
 * # BalancesCtrl
 * Controller of the majiApp
 */

app.controller('BalancesCtrl', function($scope, $http, appService, $cookieStore, $state, $mdDialog, $mdToast, $animate, $rootScope) {
  var config = appService.getCofig();
  $scope.progress = false;
  $scope.report = false;
  $scope.form = {};

  $scope.params = {};
  $scope.params.page = 1;
  $scope.params.size = 10;


  //search filter
  $scope.searchFilter = {};


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

    //send request
    appService.getAccountBalanceReportHeaders(request).success(function(response) {
      $scope.error = false;
      $scope.headers = response.payload.content;
      $scope.totalRecords = response.payload.totalElements; //to change this
    }).error(function(data, status) {
      if (status === 401) {
        $state.go('session');
        $scope.message = data.message;
      } else {
        $scope.error = true;
        $scope.message = data.message;
      }
    });
  };

  //load page data
  $scope.getPageData(1);


  //get schemes
  appService.getSchemesList().success(function(response) {
    $scope.schemes = response.payload;
  }).error(function(data, status) {
    $state.go('session');
  });

  //Load zones
  $scope.getSchemeZones = function() {
    $scope.zones = {};

    var request = {};
    request.schemeId = $scope.form.scheme.schemeId;
    appService.getZonesByScheme(request).success(function(response) {
      $scope.zones = response.payload;
    }).error(function(data, status) {
      $state.go('session');
    });
  };


  $scope.generate = function(form) {
    $scope.showErrorInfo = true;
    $scope.errorClass = config.cssAlertInfo;
    $scope.errorMsg = config.msgSendingData;

    appService.createAccountBalanceReportHeader(form).success(function(response) {
      $scope.errorOccured = false;
      $scope.errorClass = config.cssAlertSucess;
      $scope.errorMsg = response.message;
      //notify page to reload data
      $rootScope.$broadcast('onReloadPageData');

    }).error(function(data, status) {
      if (status === 401) {
        $state.go('session');
        $scope.message = data.message;
      } else {
        $scope.errorOccured = true;
        $scope.errorClass = config.cssAlertDanger;
        $scope.errorMsg = data.message;
      }
    });
  };

  //Generate CSV File
  $scope.generateCsv = function() {
    $scope.csvData = [];
    var accounts = $scope.accounts.content;
    angular.forEach(accounts, function(value) {
      var accStatus = 'Active';
      if (!value.active) {
        accStatus = 'Inactive';
      }
      $scope.csvData.push({
        a: value.accNo,
        b: value.accName,
        c: value.zone,
        d: accStatus,
        e: value.balance
      });
    });
    return $scope.csvData;
  };

});