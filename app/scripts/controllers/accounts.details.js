'use strict';

/**
 * @author maitha.manyala [at] gmail.com
 * @ngdoc function
 * @name majiApp.controller:AccountsDetailCtrl
 * @description
 * # UsersCtrl
 * Controller of the AccountsDetailCtrl
 */

app.controller('AccountsDetailCtrl', function ($scope, $http, appService, $cookieStore, $state, $mdDialog, $mdToast, $animate, $rootScope, $stateParams) {
  $scope.accountId = $stateParams.accountId;
  $scope.consumerName = $stateParams.consumerName;

  var request = {};
  var accountId = $scope.accountId;

  $scope.$on('onReloadAccountData', function (event) {
    $scope.getAccountProfile();
  });


  $scope.getAccountProfile = function () {
    //send request
    appService.getAccountById(request, accountId).success(function (response) {
      $scope.account = response.payload;
      $scope.accountFound = true;
      $scope.errorOccured = false;

      var account_id = $scope.account.accountId;
      //get bills
      $scope.getBills(1);

      //get payments
      $scope.getPayments(1);

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

  $scope.getAccountProfile();


  $scope.getBills = function (newPage) {
    newPage--;
    var request = {};
    request.page = newPage;
    request.size = 10;
    //set search filter
    request.filter = '';

    var accountId = $scope.account.accountId;

    //send request
    appService.getBillsByAccount(request, accountId).success(function (response) {
      $scope.errorOccured = false;
      $scope.bills = response.payload.content;
      $scope.totalBills = response.payload.totalElements;

    }).error(function (data, status) {
      if (status === 401) {
        $state.go('session');
        $scope.message = data.message;
      } else {
        $scope.errorOccured = true;
        $scope.errorMsg = data.message;
      }
    });

  };

  $scope.getPayments = function (newPage) {
    newPage--;
    var request = {};
    request.page = newPage;
    request.size = 10;
    //set search filter
    request.filter = '';

    var accountId = $scope.account.accountId;

    //send request
    appService.getPaymentsByAccount(request, accountId).success(function (response) {
      $scope.errorOccured = false;
      $scope.payments = response.payload.content;
      $scope.totalPayments = response.payload.totalElements;

    }).error(function (data, status) {
      if (status === 401) {
        $state.go('session');
        $scope.message = data.message;
      } else {
        $scope.errorOccured = true;
        $scope.errorMsg = data.message;
      }
    });

  };

  $scope.addPaymentDialog = function () {
    $mdDialog.show({
      controller: AddPaymentDialogController,
      templateUrl: 'views/template/payment_add.html',
      resolve: {
        account: function () {
          return $scope.account;
        }
      }
    });
  };

  function AddPaymentDialogController($scope, $mdDialog, $rootScope, account, appService) {
    var config = appService.getCofig();
    $scope.myForm = {};
    $scope.account = account;
    $scope.form = {};
    $scope.data = {};
    $scope.data.accNo = account.accNo;
    $scope.data.outstandingBalance = account.outstandingBalance;


    var request = {};
    request.page = 0;
    request.size = 100;
    request.filter = '';

    //Get active billing month
    appService.getActiveBillingMonths(request).success(function (response) {
      $scope.activeBillingMonth = response.payload;
      $scope.data.billingMonth = $scope.activeBillingMonth.billingMonth;
    });

    //Get payment types
    appService.getPaymentTypes(request).success(function (response) {
      $scope.paymentTypes = response.payload.content;
    });


    $scope.cancel = function () {
      $mdDialog.cancel();
    };
    $scope.save = function (form) {
      var myForm = $scope.myForm.object;
      if (myForm.$invalid === false) {



        //good to go
        $scope.showErrorInfo = true;
        $scope.errorClass = config.cssAlertInfo;
        $scope.errorMsg = config.msgSendingData;

        var request = form;
        //set billing month
        request.billingMonth = $scope.activeBillingMonth;

        //set transaction date
        var transactionDate = moment(form.transactionDate).unix() * 1000;
        request.transactionDate = transactionDate;

        //set payment type
        var paymentType = form.paymentType;
        request.paymentType = $scope.paymentTypes[paymentType];

        var accountId = $scope.account.accountId;

        //send request
        appService.createPayment(request, accountId).success(function (response) {
          $scope.errorOccured = false;
          $scope.errorClass = config.cssAlertSucess;
          $scope.errorMsg = response.message;
          //notify
          $rootScope.$broadcast('onReloadAccountData');

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
  };

  $scope.deleteBillDialog = function (index) {
    $scope.bill = $scope.bills[index];
    $mdDialog.show({
      controller: DeleteBillDialogController,
      templateUrl: 'views/template/bill_delete.html',
      resolve: {
        bill: function () {
          return $scope.bill;
        }
      }
    });
  };

  function DeleteBillDialogController($scope, $mdDialog, $rootScope, bill, appService) {
    var config = appService.getCofig();
    $scope.myForm = {};
    $scope.bill = bill;
    $scope.form = {};

    console.log($scope.bill);


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
        var billId = $scope.bill.billId;

        //send request
        appService.deleteBill(form, billId).success(function (response) {
          $scope.errorOccured = false;
          $scope.errorClass = config.cssAlertSucess;
          $scope.errorMsg = response.message;
          //notify
          $rootScope.$broadcast('onReloadAccountData');

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
  };

  $scope.turnOnOffDialog = function () {
    $mdDialog.show({
      controller: TurnOnOffDialogController,
      templateUrl: 'views/template/account_turn_on_off.html',
      resolve: {
        account: function () {
          return $scope.account;
        }
      }
    });
  };

  function TurnOnOffDialogController($scope, $mdDialog, $rootScope, account, appService) {
    var config = appService.getCofig();
    $scope.myForm = {};
    $scope.account = account;
    $scope.form = {};

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
        var accountId = $scope.account.accountId;
        var request = {};
        request.notes = form.notes;
        //send request
        appService.turnOnOffAccount(request, accountId).success(function (response) {
          $scope.errorOccured = false;
          $scope.errorClass = config.cssAlertSucess;
          $scope.errorMsg = response.message;
          //notify
          $rootScope.$broadcast('onReloadAccountData');

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
      }
    };
  };


  $scope.changeAccountStatusDialog = function () {
    $mdDialog.show({
      controller: ChangeAccountStatusDialogController,
      templateUrl: 'views/template/account_change_status.html',
      resolve: {
        account: function () {
          return $scope.account;
        }
      }
    });
  };

  function ChangeAccountStatusDialogController($scope, $mdDialog, $rootScope, account, appService) {
    var config = appService.getCofig();
    $scope.myForm = {};
    $scope.account = account;
    $scope.form = {};

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
        var accountId = $scope.account.accountId;
        var request = {};
        request.notes = form.notes;
        //send request
        appService.updateAccountStatus(request, accountId).success(function (response) {
          $scope.errorOccured = false;
          $scope.errorClass = config.cssAlertSucess;
          $scope.errorMsg = response.message;
          //notify
          $rootScope.$broadcast('onReloadAccountData');

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
      }
    };
  };

  $scope.transferBillDialog = function (index) {
    var bill = $scope.bills[index];
    $mdDialog.show({
      controller: TransferBillDialogController,
      templateUrl: 'views/template/bill_transfer.html',
      resolve: {
        account: function () {
          return $scope.account;
        },
        bill: function () {
          return bill;
        }
      }
    });
  };

  function TransferBillDialogController($scope, $mdDialog, $rootScope, account, bill, appService) {
    $scope.bill = bill;
    console.log(bill);

    var config = appService.getCofig();

    var request = {};
    request.page = 0;
    request.size = 20;

    $scope.searchConnection = function () {
      var request = {};
      request.accNo = $scope.form.accountNo;
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

    $scope.transfer = function (form) {
      var myForm = $scope.myForm;
      if (myForm.object.$valid) {
        console.log(form);

        var account = {};
        account.accountId = $scope.account.accountId

        var billId = $scope.bill.billId;

        appService.transferBill(account, billId).success(function (response) {
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
    };
    $scope.cancel = function () {
      $mdDialog.cancel();
    };
  };

});
