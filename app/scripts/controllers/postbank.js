'use strict';

/**
 * @ngdoc function
 * @name majiApp.controller:PostbankCtrl
 * @description
 * # PostbankCtrl
 * Controller of the majiApp
 */
  app.controller('PostBankCtrl', function ($scope, $http, appService, $cookieStore, $state, $mdDialog, $mdToast, $animate, $rootScope) {
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
      appService.getPostBankTransactions(request).success(function(response) {
        $scope.errorOccured = false;
        $scope.transactions = response.payload.content;
        $scope.totalTransactions = response.payload.totalElements; //to change this
        $state.go('postbank');
      }).error(function(data, status) {
        if (status === 401) {
          $state.go('session');
          $scope.message = data.message;
        } else {
          $scope.errorOccured = true;
          $scope.errorMsg = data.message;
          $state.go('postbank');
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
        controller: AllocateTransactionDialogController,
        templateUrl: 'views/template/postbank_edit.html',
        resolve: {
          transaction: function () {
            return $scope.transaction;
          }
        }
      });
    };

    function AllocateTransactionDialogController($scope, $mdDialog, $rootScope, transaction, appService) {
      var config = appService.getCofig();
      $scope.myForm = {};
      $scope.transaction = transaction;
      $scope.form = {};

      var request = {};
      request.page = 0;
      request.size = 20;

      $scope.searchConnection = function () {
        var request = {};
        request.accNo = $scope.form.accountNo;
        //send request
        appService.getAccount(request).success(function (response) {
          $scope.account = response.payload;
          $scope.accountFound = true;
          $scope.errorOccured = false;
        }).error(function (data, status) {
          if (status === 401) {
            $state.go('session');
            $scope.message = data.message;
          } else {
            $scope.errorOccured = true;
            $scope.accountFound = false;
            $scope.errorMsg = data.message;
          }
        });
      };

      $scope.allocate = function (form) {
        var myForm = $scope.myForm;
        if (myForm.object.$valid) {

          var transaction = {};
          transaction.notes = form.notes;
          transaction.accNo = form.accountNo;
          var transactionId = $scope.transaction.postbankTransactionId;

          appService.allocatePostBankTransaction(transaction, transactionId).success(function (response) {
            $scope.showErrorInfo = true;
            $scope.errorClass = config.cssAlertSucess;
            $scope.errorMsg = response.message;
            //notify roles page to reload data
            $rootScope.$broadcast('onReloadPageData');

          }).error(function (data, status) {
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
      }

      $scope.cancel = function () {
        $mdDialog.cancel();
      };

    }

  });
