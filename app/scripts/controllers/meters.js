'use strict';

/**
 * @author maitha.manyala [at] gmail.com
 * @ngdoc function
 * @name billingApp.controller:BillingMonthsCtrl
 * @description
 * # UsersCtrl
 * Controller of the MetersCtrl
 */

app.controller('MetersCtrl', function ($scope, $http, appService, $cookieStore, $state, $mdDialog, $mdToast, $animate, $rootScope) {
  //get config
  var config = appService.getCofig();
  $scope.params = {};
  $scope.params.page = 1;
  $scope.params.size = 10;

  //search filter
  $scope.searchFilter = {};
  $scope.searchFilter.text = '';

  //listen on data added
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
    appService.getMeters(request).success(function (response) {
      $scope.errorOccured = false;
      $scope.meters = response.payload.content;
      $scope.totalMeters = response.payload.totalElements;
      $state.go('meters');
    }).error(function (data, status) {
      if (status === 401) {
        $state.go('session');
        $scope.message = data.message;
      } else {
        $scope.errorOccured = true;
        $scope.errorMsg = data.message;
        $state.go('meters');
      }

    });

  };

  //load page data
  $scope.getPageData(1);

  $scope.seach = function () {
    $scope.getPageData(1);
  };

  $scope.editMeterDialog = function (index) {
    $scope.selectedMeter = $scope.meters[index];

    $mdDialog.show({
      controller: EditMeterDialogController,
      templateUrl: 'views/template/meter_edit.html',
      resolve: {
        selectedMeter: function () {
          return $scope.selectedMeter;
        }
      }
    });
  };

  $scope.allocateMeterDialog = function (index) {
    $scope.selectedMeter = $scope.meters[index];

    $mdDialog.show({
      controller: AllocateMeterDialogController,
      templateUrl: 'views/template/meter_allocate.html',
      resolve: {
        selectedMeter: function () {
          return $scope.selectedMeter;
        }
      }
    });
  };

  $scope.deallocateMeterDialog = function (index) {
    $scope.selectedMeter = $scope.meters[index];
    console.log($scope.selectedMeter);

    $mdDialog.show({
      controller: AllocateMeterDialogController,
      templateUrl: 'views/template/meter_deallocate.html',
      resolve: {
        selectedMeter: function () {
          return $scope.selectedMeter;
        }
      }
    });
  };

  function AllocateMeterDialogController($scope, $mdDialog, $rootScope, selectedMeter, appService) {
    var config = appService.getCofig();
    $scope.myForm = {};
    $scope.selectedMeter = selectedMeter;
    $scope.form = {};
    console.log(selectedMeter);

    //$scope.form = selectedMeter;

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
    }

    //get meter owners
    appService.getMeterOwners(request).success(function (response) {
      $scope.meterOwners = response.payload.content;
    });

    $scope.allocate = function (form) {
      var myForm = $scope.myForm;
      if (myForm.object.$valid) {
        console.log(form);

        var selectedMeter = $scope.selectedMeter;
        selectedMeter.notes = form.notes;
        selectedMeter.accountId = form.accountNo;

        var meterId = selectedMeter.meterId;

        appService.updateMeterAllocate(selectedMeter, meterId).success(function (response) {

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

    $scope.deallocate = function (form) {
      var myForm = $scope.myForm;
      if (myForm.object.$valid) {
          console.log(form);

        var selectedMeter = $scope.selectedMeter;
        selectedMeter.notes = form.notes;

        var meterId = selectedMeter.meterId;

        appService.updateMeterDeallocate(selectedMeter, meterId).success(function (response) {

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

  }


  function EditMeterDialogController($scope, $mdDialog, $rootScope, selectedMeter, appService) {
    var config = appService.getCofig();
    $scope.myForm = {};
    $scope.selectedMeter = selectedMeter;
    $scope.form = selectedMeter;

    var request = {};
    request.page = 0;
    request.size = 20;

    //get meter sizes
    appService.getMeterSizes(request).success(function (response) {
      $scope.meterSizes = response.payload.content;
    });

    //get meter owners
    appService.getMeterOwners(request).success(function (response) {
      $scope.meterOwners = response.payload.content;
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


        var request = {};
        request = form;
        request.meterOwner = $scope.meterOwners[request.meterOwner];
        request.meterSize = $scope.meterSizes[request.meterSize];

        //send request
        appService.updateMeter(form).success(function (response) {

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

  $scope.addMeterDialog = function () {
    $mdDialog.show({
      controller: AddMeterDialogController,
      templateUrl: 'views/template/meter_add.html'
    });
  };

  function AddMeterDialogController($scope, $mdDialog, $rootScope, appService) {
    $scope.myForm = {};
    $scope.form = {};
    var config = appService.getCofig();

    var request = {};
    request.page = 0;
    request.size = 20;

    //get meter sizes
    appService.getMeterSizes(request).success(function (response) {
      $scope.meterSizes = response.payload.content;
    });

    //get meter owners
    appService.getMeterOwners(request).success(function (response) {
      $scope.meterOwners = response.payload.content;
    });


    $scope.cancel = function () {
      $mdDialog.cancel();
    };
    $scope.save = function (form) {
      var myForm = $scope.myForm.object;
      if (myForm.$invalid === false) {

        //good to go
        var request = form;
        request.meterOwner = $scope.meterOwners[request.meterOwner];
        request.meterSize = $scope.meterSizes[request.meterSize];

        $scope.showErrorInfo = true;
        $scope.errorClass = config.cssAlertInfo;
        $scope.errorMsg = config.msgSendingData;

        //send request
        appService.createMeter(request).success(function (response) {
          $scope.errorOccured = false;
          $scope.errorClass = config.cssAlertSucess;
          $scope.errorMsg = response.message;
          //notify page to reload data
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


});
