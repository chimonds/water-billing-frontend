'use strict'

/**
 * @ngdoc function
 * @name majiApp.controller:MpesaCtrl
 * @description
 * # MpesaCtrl
 * Controller of the equismsApp
 */

app.controller('MpesaCtrl', function($scope, $http, appService, $cookieStore, $state, $mdDialog, $mdToast, $animate, $rootScope) {
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
    appService.getMpesaTransactions(request).success(function(response) {
      $scope.errorOccured = false;
      $scope.transactions = response.payload.content;
      $scope.totalTransactions = response.payload.totalElements; //to change this
      $state.go('mpesa');
    }).error(function(data, status) {
      if (status === 401) {
        $state.go('session');
        $scope.message = data.message;
      } else {
        $scope.errorOccured = true;
        $scope.errorMsg = data.message;
        $state.go('mpesa');
      }
    });

  };

  //load page data
  $scope.getPageData(1);

  $scope.seach = function() {
    $scope.getPageData(1);
  };

  $scope.assignTransactionDialog = function (index) {
    $scope.transaction = $scope.transactions[index];
    $mdDialog.show({
      controller: AssignTransactionDialogController,
      templateUrl: 'views/template/transaction_edit.html',
      resolve: {
        transaction: function () {
          return $scope.transaction;
        }
      }
    });
  };

  function AssignTransactionDialogController($scope, $mdDialog, $rootScope, transaction, appService) {
    var config = appService.getCofig();
    $scope.myForm = {};
    $scope.transaction = transaction;
    $scope.form = {};

    console.log(transaction);

    $scope.cancel = function () {
      $mdDialog.cancel();
    };
    $scope.update = function (form) {
      var myForm = $scope.myForm.object;
      if (myForm.$invalid === false) {
        //good to go
        $scope.showErrorInfo = true;
        $scope.errorClass = config.cssAlertInfo;
        $scope.errorMsg = config.msgSendingData;

        var meterId=form.meterId;

        var request = {};
        request.meterId = form.meterId;
        request.meterNo = form.meterNo;
        request.initialReading= form.initialReading;
        request.meterOwner = $scope.meterOwners[form.meterOwner];
        request.meterSize = $scope.meterSizes[form.meterSize];

        //send request
        appService.updateMeter(request,meterId).success(function (response) {
          $scope.errorOccured = false;
          $scope.errorClass = config.cssAlertSucess;
          $scope.errorMsg = response.message;
          //notify roles page to reload data
          $rootScope.$broadcast('onReloadPageData');

        }).error(function (data, status) {
          if (status === 401) {
            $state.go('session');
            $scope.message = data.message;
          } else {
            $scope.errorOccured = true;
            $scope.errorClass = config.cssAlertDanger;
            $scope.errorMsg = data.message;
          }
        });
      } else {
        $scope.errorOccured = true;
        $scope.errorClass = config.cssAlertDanger;
        $scope.errorMsg = "Please fill all the mandatory fields";
      }
    };
  }

});
