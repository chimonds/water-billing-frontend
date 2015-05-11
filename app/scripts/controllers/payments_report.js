'use strict';

/**
 * @ngdoc function
 * @name equismsApp.controller:PaymentsReportCtrl
 * @description
 * # PaymentsReportCtrl
 * Controller of the equismsApp
 */
app.controller('PaymentsReportCtrl', function ($scope, $http, appService, $cookieStore, $state, $mdDialog, $mdToast, $animate, $rootScope) {
  var config = appService.getCofig();
  $scope.progress = false;
  $scope.report = false;
  $scope.form = {};

  var request = {};
  request.page = 0;
  request.size = 100;

  //Load zones
  appService.getZones(request).success(function (response) {
    $scope.zones = response.payload.content;
  }).error(function (data, status) {
    $state.go('session');
  });

  //Get payment types
  appService.getPaymentTypes(request).success(function (response) {
    $scope.paymentTypes = response.payload.content;
    console.log($scope.paymentTypes);

  });


  $scope.generate = function (form) {
    $scope.progress = true;
    $scope.report = false;
    //Get active billing month
    var request = {};

    var myForm = $scope.myForm.object;

    //set from date
    var fromDate = moment(form.fromDate).unix();
    if(typeof fromDate ==='undefined' || typeof fromDate ==='NaN'){
      fromDate = moment().unix();
    }
    request.fromDate = fromDate;

    var toDate = moment(form.toDate).unix();
    if(typeof toDate ==='undefined' || typeof toDate ==='NaN'){
      toDate = moment().unix();
    }
    request.toDate = toDate;



    //select zone
    var zone = form.accZone;
    if (typeof zone !== 'undefined') {
      request.zoneId = $scope.zones[zone].zoneId;
    }

    var paymentType = form.paymentType;
    if (typeof paymentType !== 'undefined') {
      request.paymentTypeId = $scope.paymentTypes[paymentType].paymentTypeId;
    }

    var params= {};
    params.fields = request;

    appService.getPaymentsReport(params).success(function (response) {
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

  };
});

