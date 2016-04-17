'use strict';

/**
 * @author maitha.manyala [at] gmail.com
 * @ngdoc function
 * @name majiApp.controller:BillingMonthsCtrl
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

  $scope.transferPaymentDialog = function(index) {
    $scope.payment = $scope.payments[index];
    $mdDialog.show({
      controller: TransferPaymentDialogController,
      templateUrl: 'views/template/payment_transfer.html',
      resolve: {
        payment: function() {
          return $scope.payment;
        }
      }
    });
  };

  function TransferPaymentDialogController($scope, $mdDialog, $rootScope, payment, appService) {
    var config = appService.getCofig();
    $scope.myForm = {};
    $scope.payment = payment;
    $scope.form = {};

    console.log($scope.payment);
    var request = {};
    request.page = 0;
    request.size = 20;

    $scope.searchConnection = function() {
      var request = {};
      request.accNo = $scope.form.accountNo;
      appService.getAccount(request).success(function(response) {
        $scope.account = response.payload;
        $scope.accountFound = true;
        $scope.errorOccured = false;
      }).error(function(data, status) {
        if (status === 401) {
          $state.go('session');
          $scope.message = data.message;
        } else {
          $scope.errorOccured = true;
          $scope.accountFound = false;
          $scope.errorMsg = data.message;
        }
      });
    }

    $scope.transfer = function(form) {
      var myForm = $scope.myForm;
      if (myForm.object.$valid) {
        console.log(form);

        var request = $scope.payment;
        request.notes = form.notes;
        var accountId = $scope.account.accountId;

        appService.transferPayment(request, accountId).success(function(response) {
          $scope.showErrorInfo = true;
          $scope.errorClass = config.cssAlertSucess;
          $scope.errorMsg = response.message;
          //notify roles page to reload data
          $rootScope.$broadcast('onReloadPageData');

        }).error(function(data, status) {
          if (status === 401) {
            $state.go('session');
            $scope.message = data.message;
          } else {
            $scope.showErrorInfo = true;
            $scope.errorClass = config.cssAlertDanger;
            $scope.errorMsg = data.message;
          }
        });
      }
    };
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
  }

  $scope.voidPaymentDialog = function(index) {
    $scope.payment = $scope.payments[index];
    $mdDialog.show({
      controller: VoidPaymentDialogController,
      templateUrl: 'views/template/payment_void.html',
      resolve: {
        payment: function() {
          return $scope.payment;
        }
      }
    });
  };

  function VoidPaymentDialogController($scope, $mdDialog, $rootScope, payment, appService) {
    var config = appService.getCofig();
    $scope.myForm = {};
    $scope.payment = payment;
    $scope.form = {};



    $scope.voidReceipt = function(form) {
      var myForm = $scope.myForm;
      if (myForm.object.$valid) {
        var request = $scope.payment;
        request.notes = form.notes;

        appService.voidPayment(request).success(function(response) {
          $scope.showErrorInfo = true;
          $scope.errorClass = config.cssAlertSucess;
          $scope.errorMsg = response.message;

          $rootScope.$broadcast('onReloadPageData');

        }).error(function(data, status) {
          if (status === 401) {
            $state.go('session');
            $scope.message = data.message;
          } else {
            $scope.showErrorInfo = true;
            $scope.errorClass = config.cssAlertDanger;
            $scope.errorMsg = data.message;
          }
        });
      }
    };
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
  }


});