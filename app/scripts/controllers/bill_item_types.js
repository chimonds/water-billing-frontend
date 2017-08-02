'use strict';

/**
 * @author maitha.manyala [at] gmail.com
 * @ngdoc function
 * @name majiApp.controller:BillItemTypesCtrl
 * @description
 * # UsersCtrl
 * Controller of the BillItemTypesCtrl
 */

app.controller('BillItemTypesCtrl', function ($scope, $http, appService, $cookieStore, $state, $mdDialog, $mdToast, $animate, $rootScope) {
  //get config
  var config = appService.getCofig();
  $scope.params = {};
  $scope.params.page = 1;
  $scope.params.size = 10;

  //search filter
  $scope.searchFilter = {};
  $scope.searchFilter.text = '';

  //listen on role added
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

    //set search filter
    request.filter = '';

    //send request
    appService.getBillItemTypes(request).success(function (response) {
      $scope.errorOccured = false;
      $scope.billItemTypes = response.payload;
      //$state.go('billing_months');
    }).error(function (data, status) {
      if (status === 401) {
        $state.go('session');
        $scope.message = data.message;
      } else {
        $scope.errorOccured = true;
        $scope.errorMsg = data.message;
        //$state.go('users');
      }
    });

  };

  //load data
  $scope.getPageData(1);

  $scope.editDialog = function (index) {
    $scope.billItemType = $scope.billItemTypes[index];

    $mdDialog.show({
      controller: EditBillingMonthDialogController,
      templateUrl: 'views/template/bill_item_type_edit.html',
      resolve: {
        billItemType: function () {
          return $scope.billItemType;
        }
      }
    });
  };

  function EditBillingMonthDialogController($scope, $mdDialog, $rootScope, billItemType, appService) {
    var config = appService.getCofig();
    $scope.billItemType = billItemType;

    $scope.form = billItemType;


    $scope.cancel = function () {
      $mdDialog.cancel();
    };
    $scope.update = function (form) {
      var myForm = $scope.myForm.object;

      //good to go
      $scope.showErrorInfo = true;
      $scope.errorClass = config.cssAlertInfo;
      $scope.errorMsg = config.msgSendingData;

      var request = $scope.billItemType;
      var billTypeId = $scope.billItemType.billTypeId;

      //send request
      appService.updateBillItemType(request, billTypeId).success(function (response) {
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
    };
  }

  $scope.addDialog = function () {
    $mdDialog.show({
      controller: AddDialogController,
      templateUrl: 'views/template/bill_item_type_add.html',
    });
  };


  function AddDialogController($scope, $mdDialog, $rootScope, appService) {
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
        appService.createLocation(request).success(function (response) {
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


});