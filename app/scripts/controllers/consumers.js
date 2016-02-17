'use strict';

/**
 * @author maitha.manyala [at] gmail.com
 * @ngdoc function
 * @name majiApp.controller:BillingMonthsCtrl
 * @description
 * # UsersCtrl
 * Controller of the ConsumersCtrl
 */

app.controller('ConsumersCtrl', function ($scope, $http, appService, $cookieStore, $state, $mdDialog, $mdToast, $animate, $rootScope) {

  //get config
  var config = appService.getCofig();
  $scope.params = {};
  $scope.params.page = 1;
  $scope.params.size = 10;

  //view consumer list is default
  $scope.showConsumerList= true;

  //search filter
  $scope.searchFilter = {};
  $scope.searchFilter.text = '';


  $scope.$on('onReloadPageData', function (event) {
    $scope.getPageData(1);
  });

  //handle pagination
  $scope.pageChanged = function (newPage) {
    $scope.getPageData(newPage);
  };

  $scope.getPageData = function (newPage) {
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
    appService.getConsumers(request).success(function (response) {
      $scope.errorOccured = false;
      $scope.consumers = response.payload.content;
      $scope.totalConsumers = response.payload.totalElements; //to change this
      $state.go('consumers');
    }).error(function (data, status) {
      if (status === 401) {
        $state.go('session');
        $scope.message = data.message;
      } else {
        $scope.errorOccured = true;
        $scope.errorMsg = data.message;
        $state.go('consumers');
      }
    });
  };

  //load page data
  $scope.getPageData(1);

  $scope.viewConsumerProfile = function(index){
    $scope.selectedConsumer= $scope.consumers[index];
    $scope.selectedConsumerIndex = index;
    $scope.showConsumerList= false;
    $scope.showConsumerProfile = true;

    var consumerId = $scope.selectedConsumer.consumerId;

    var request = {};
    request.page = 0;
    request.size = 50;

    //reset accounts object
    $scope.accounts={};

    //send request
    appService.getAccountsByConsumer(request,consumerId).success(function (response) {
      $scope.errorOccured = false;
      $scope.accounts = response.payload;
      $scope.totalAccounts = response.payload.totalElements; //to change this
      $state.go('consumers');

      //get cumulative account balance
      var totalBalance = 0;
      for(var i = 0; i < $scope.accounts.length; i++){
        totalBalance += $scope.accounts[i].outstandingBalance;
      }
      $scope.totalBalance =  totalBalance;

    }).error(function (data, status) {
      if (status === 401) {
        $state.go('session');
        $scope.message = data.message;
      } else {
        $scope.errorOccured = true;
        $scope.errorMsg = data.message;
        //$state.go('consumers');
      }
    });
  };

  $scope.viewConsumers = function(){
    $scope.showConsumerList= true;
    $scope.showConsumerProfile = false;
    $scope.errorOccured =false;
  };

  $scope.seach = function () {
    $scope.getPageData(1);
  };

  $scope.editConsumerDialog = function (index) {
    $scope.selectedConsumer = $scope.consumers[index];

    $mdDialog.show({
      controller: EditConsumerDialogController,
      templateUrl: 'views/template/consumer_edit.html',
      resolve: {
        selectedConsumer: function () {
          return $scope.selectedConsumer;
        }
      }
    });
  };

  function EditConsumerDialogController($scope, $mdDialog, $rootScope, selectedConsumer, appService) {
    var config = appService.getCofig();
    $scope.myForm = {};
    $scope.selectedConsumer = selectedConsumer;
    $scope.form = selectedConsumer;

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

        var request = form;
        var consumerId = form.consumerId;

        //send request
        appService.updateConsumer(request, consumerId).success(function (response) {
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

  $scope.addConsumerDialog = function () {
    $mdDialog.show({
      controller: AddConsumerDialogController,
      templateUrl: 'views/template/consumer_add.html'
    });
  };

  function AddConsumerDialogController($scope, $mdDialog, $rootScope, appService) {
    $scope.myForm = {};
    $scope.form = {};
    var config = appService.getCofig();

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

        //send request
        appService.createConsumer(request).success(function (response) {
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
  };

  $scope.$on('onReloadAccountsData', function (event) {
    $scope.viewConsumerProfile($scope.selectedConsumerIndex );
  });

  $scope.editAccountDialog = function (index) {
    $scope.selectedAccount = $scope.accounts[index];
    console.log($scope.selectedAccount);

    $mdDialog.show({
      controller: EditAccountDialogController,
      templateUrl: 'views/template/account_edit.html',
      resolve: {
        selectedAccount: function () {
          return $scope.selectedAccount;
        }
      }
    });
  };

  function EditAccountDialogController($scope, $mdDialog, $rootScope, selectedAccount, appService) {
    var config = appService.getCofig();
    $scope.myForm = {};
    $scope.selectedAccount = selectedAccount;
    $scope.form = selectedAccount;


    var request = {};
    request.page = 0;
    request.size = 500;
    request.filter = '';

    //Get locations list
    appService.getLocations(request).success(function (response) {
      $scope.locations = response.payload.content;
    });

    appService.getZones(request).success(function (response) {
      $scope.zones = response.payload.content;
    });

    appService.getTariffs(request).success(function (response) {
      $scope.tariffs = response.payload.content;
    });



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

        var request ={};
        request.accNo = form.accNo;
        request.averageConsumption = form.averageConsumption;
        request.balanceBroughtForward = form.balanceBroughtForward;
        request.location = $scope.locations[form.accLocation];
        request.zone = $scope.zones[form.accZone];
        request.tariff = $scope.tariffs[form.accTariff];

        var accountId = $scope.selectedAccount.accountId;

        //send request
        appService.updateAccount(request, accountId).success(function (response) {
          $scope.errorOccured = false;
          $scope.errorClass = config.cssAlertSucess;
          $scope.errorMsg = response.message;
          //notify roles page to reload data
          $rootScope.$broadcast('onReloadAccountsData');

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

  $scope.addAccountDialog = function () {
    $mdDialog.show({
      controller: AddAccountDialogController,
      templateUrl: 'views/template/account_add.html',
      resolve: {
        selectedConsumer: function () {
          return $scope.selectedConsumer;
        }
      }
    });
  };

  function AddAccountDialogController($scope, $mdDialog, $rootScope, selectedConsumer, appService) {
    var config = appService.getCofig();
    $scope.myForm = {};
    $scope.selectedConsumer = selectedConsumer;
    $scope.form = {};


    var request = {};
    request.page = 0;
    request.size = 500;
    request.filter = '';

    //Get locations list
    appService.getLocations(request).success(function (response) {
      $scope.locations = response.payload.content;
    });

    appService.getZones(request).success(function (response) {
      $scope.zones = response.payload.content;
    });

    appService.getTariffs(request).success(function (response) {
      $scope.tariffs = response.payload.content;
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

        var request ={};
        request.accNo = form.accNo;
        request.averageConsumption = form.averageConsumption;
        request.balanceBroughtForward = form.balanceBroughtForward;
        request.location = $scope.locations[form.accLocation];
        request.zone = $scope.zones[form.accZone];
        request.tariff = $scope.tariffs[form.accTariff];

        var consumerId = $scope.selectedConsumer.consumerId;

        //send request
        appService.createAccount(request, consumerId).success(function (response) {
          $scope.errorOccured = false;
          $scope.errorClass = config.cssAlertSucess;
          $scope.errorMsg = response.message;
          //notify roles page to reload data
          $rootScope.$broadcast('onReloadAccountsData');

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


  $scope.transferAccountDialog = function (index) {
    $scope.selectedAccount = $scope.accounts[index];
    //console.log($scope.selectedAccount);
    $mdDialog.show({
      controller: TransferAccountDialogController,
      templateUrl: 'views/template/account_transfer.html',
      resolve: {
        selectedAccount: function () {
          return $scope.selectedAccount;
        },
        selectedConsumer: function () {
          return $scope.selectedConsumer;
        }
      }
    });
  };

  function TransferAccountDialogController($scope, $mdDialog, $rootScope, selectedAccount, selectedConsumer, appService) {
    var config = appService.getCofig();
    $scope.myForm = {};
    $scope.selectedAccount = selectedAccount;
    $scope.form = selectedAccount;

    $scope.errorOccured = true;

    var request = {};
    request.page = 0;
    request.size = 1;

    $scope.searchConsumer = function () {
      var request = {};
      var consumerId = $scope.form.consumerId;

      //send request
      appService.getConsumer(request, consumerId).success(function (response) {
        $scope.errorOccured = false;
        $scope.consumer = response.payload;
        $scope.consumerFound = true;

      }).error(function (data, status) {
        if (status === 401) {
          $state.go('session');
          $scope.message = data.message;
        } else {
          $scope.errorOccured = true;
          $scope.consumerFound = false;
          $scope.errorMsg = data.message;
        }
      });
    }

    $scope.cancel = function () {
      $mdDialog.cancel();
    };
    $scope.transfer = function (form) {
      var myForm = $scope.myForm.object;
      if (myForm.$invalid === false) {
        //good to go
        $scope.showErrorInfo = true;
        $scope.errorClass = config.cssAlertInfo;
        $scope.errorMsg = config.msgSendingData;

        var request ={};
        request.accountId =  $scope.selectedAccount.accountId;
        var consumerId = form.consumerId;

        //send request
        appService.transferAccount(request, consumerId).success(function (response) {
          $scope.showErrorInfo = true;
          $scope.errorClass = config.cssAlertSucess;
          $scope.errorMsg = response.message;
          //notify roles page to reload data
          $rootScope.$broadcast('onReloadAccountsData');

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
      } else {
        $scope.errorOccured = true;
        $scope.errorClass = config.cssAlertDanger;
        $scope.errorMsg = "Please fill all the mandatory fields";
      }
    };
  }


});
