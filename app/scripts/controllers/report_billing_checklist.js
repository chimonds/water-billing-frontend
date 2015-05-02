'use strict';

/**
 * @ngdoc function
 * @name equismsApp.controller:ReportBillingChecklistCtrl
 * @description
 * # ReportBillingChecklistCtrl
 * Controller of the equismsApp
 */
  app.controller('ReportBillingChecklistCtrl', function ($scope, $http, appService, $cookieStore, $state, $mdDialog, $mdToast, $animate, $rootScope) {
    var config = appService.getCofig();
    $scope.progress = false;
    $scope.report = false;
    $scope.form = {};

    $scope.status =
      [
        {'name': 'All'},
        {'name': 'Active'},
        {'name': 'Inactive'}
      ];

    $scope.credit =
      [
        {'name': 'Include'},
        {'name': 'Exclude'},
        {'name': 'Only'}
      ];

    var request = {};
    request.page = 0;
    request.size = 100;

    //Load zones
    appService.getZones(request).success(function (response) {
      $scope.zones = response.payload.content;
    }).error(function (data, status) {
      $state.go('session');
    });

    appService.getAllBillingMonths(request).success(function (response) {
      console.log(response);
      $scope.billingMonths = response.payload;
    }).error(function (data, status) {
      $state.go('session');
    });


    $scope.generate = function (form) {
      $scope.progress = true;
      $scope.report = false;
      //Get active billing month
      var request = {};

      var myForm = $scope.myForm.object;

      //select zone
      var billingMonth = form.billingMonth;
      if (typeof billingMonth !== 'undefined') {
        request.billingMonthId = $scope.billingMonths[billingMonth].billingMonthId;
      }

      //select zone
      var zone = form.accZone;
      if (typeof zone !== 'undefined') {
        request.zoneId = $scope.zones[zone].zoneId;
      }

      var accountStatus = form.status;
      if (typeof accountStatus !== 'undefined') {
        request.accountStatus = $scope.status[accountStatus].name;
      }

      var creditBalances = form.credit;
      if (typeof creditBalances !== 'undefined') {
        request.creditBalances = $scope.credit[accountStatus].name;
      }

      var params= {};
      params.fields = request;

      appService.getBillingChecklistReport(params).success(function (response) {
        $scope.progress = false;
        $scope.error = false;
        $scope.data = response.payload;
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
          $state.go('billing_checklist');
        }
      });

    };
  });

