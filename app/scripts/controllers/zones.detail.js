'use strict';

/**
 * @author maitha.manyala [at] gmail.com
 * @ngdoc function
 * @name majiApp.controller:ZoneDetailCtrl
 * @description
 * # ZoneDetailCtrl
 * Controller of the ZoneDetailCtrl
 */

app.controller('ZoneDetailCtrl', function ($scope, $http, appService, $cookieStore, $state, $mdDialog, $mdToast, $animate, $rootScope, $stateParams) {
  $scope.zoneId = $stateParams.zoneId;

  var request = {};
  var zoneId = $scope.zoneId;

  $scope.$on('onReloadAccountData', function (event) {
    $scope.getZoneProfile();
  });


  $scope.getZoneProfile = function () {
    //send request
    appService.getZoneById(request, zoneId).success(function (response) {
      $scope.zone = response.payload;
      $scope.errorOccured = false;

      $scope.getZoneMeterReaders();

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

  $scope.getZoneProfile();


  $scope.getZoneMeterReaders = function () {
    var request = {};
    request.zone = {};
    request.zone.zoneId = $scope.zone.zoneId;

    appService.getZoneMeterReaders(request).success(function (response) {
      $scope.errorOccured = false;
      $scope.users = response.payload;
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

  $scope.addMeterReaderDialog = function () {
    $mdDialog.show({
      controller: AddMeterReaderDialogController,
      templateUrl: 'views/template/meter_reader_add.html',
      resolve: {
        zone: function () {
          return $scope.zone;
        }
      }
    });
  };

  function AddMeterReaderDialogController($scope, $mdDialog, $rootScope, zone, appService) {
    var config = appService.getCofig();
    $scope.myForm = {};
    $scope.zone = zone;

    $scope.form = {};
    $scope.data = {};


    var request = {};
    request.zone = {};
    request.zone.zoneId = $scope.zone.zoneId;

    appService.getMeterReadersNotInZone(request).success(function (response) {
      $scope.users = response.payload;
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

        var request = {};
        request.zone = {};
        request.zone.zoneId = $scope.zone.zoneId;

        var user = $scope.users[form.user];

        request.user = {};
        request.user.userId = user.userId;
        //send request
        appService.addMeterReaderToZone(request).success(function (response) {
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

  $scope.deleteMeterReaderDialog = function (index) {
    $scope.user = $scope.users[index];
    $mdDialog.show({
      controller: DeleteMeterReaderDialogController,
      templateUrl: 'views/template/meter_reader_delete.html',
      resolve: {
        user: function () {
          return $scope.user;
        },
        zone: function () {
          return $scope.zone
        }
      }
    });
  };

  function DeleteMeterReaderDialogController($scope, $mdDialog, $rootScope, user, zone, appService) {
    var config = appService.getCofig();
    $scope.myForm = {};
    $scope.user = user;
    $scope.zone = zone;
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
        


        var request = {};
        request.zone = {};
        request.zone.zoneId = $scope.zone.zoneId;
        request.user = {};
        request.user.userId = $scope.user.userId;

        //send request
        appService.removeMeterReaderFromZone(request).success(function (response) {
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
