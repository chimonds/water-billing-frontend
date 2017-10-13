'use strict';

/**
 * @author maitha.manyala [at] gmail.com
 * @ngdoc function
 * @name majiApp.controller:ChargesCtrl
 * @description
 * # ChargesCtrl
 * Controller of the ChargesCtrl
 */

app.controller('ChargesCtrl', function($scope, $http, appService, $cookieStore, $state, $mdDialog, $mdToast, $animate, $rootScope) {
  //get config
  var config = appService.getCofig();
  $scope.params = {};
  $scope.params.page = 1;
  $scope.params.size = 10;

  //search filter
  $scope.searchFilter = {};
  $scope.searchFilter.text = '';

  $scope.addCharge = function(){
    $state.go('new-charges');
  }


  $scope.$on('onReloadPageData', function (event) {
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
    appService.getCharges(request).success(function(response) {
      $scope.errorOccured = false;
      $scope.charges = response.payload.content;
      $scope.totalRecords = response.payload.totalElements; //to change this
      $state.go('charges');
    }).error(function(data, status) {
      if (status === 401) {
        $state.go('session');
        $scope.message = data.message;
      } else {
        $scope.errorOccured = true;
        $scope.errorMsg = data.message;
        $state.go('charges');
      }
    });
  };

  //load page data
  $scope.getPageData(1);

  $scope.seach = function() {
    $scope.getPageData(1);
  };

  $scope.removeDialog = function(index) {
    $scope.charge = $scope.charges[index];

    $mdDialog.show({
      controller: EditDialogController,
      templateUrl: 'views/template/charge_delete.html',
      resolve: {
        charge: function() {
          return $scope.charge;
        }
      }
    });
  };

  function EditDialogController($scope, $mdDialog, $rootScope, charge, appService) {
    var config = appService.getCofig();
    $scope.myForm = {};
    $scope.charge = charge;


    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.deleteCharges = function() {
      var myForm = $scope.myForm.object;
      if (myForm.$invalid === false) {
        //good to go
        $scope.showErrorInfo = true;
        $scope.errorClass = config.cssAlertInfo;
        $scope.errorMsg = config.msgSendingData;

        var request = {};
        request.chargeId= $scope.charge.chargeId;

        //send request
        appService.deleteCharge(request).success(function(response) {
          $scope.errorOccured = false;
          $scope.errorClass = config.cssAlertSucess;
          $scope.errorMsg = response.message;
          //notify roles page to reload data
          $rootScope.$broadcast('onReloadPageData');

        }).error(function(data, status) {
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

  $scope.addDialog = function() {
    $mdDialog.show({
      controller: AddDialogController,
      templateUrl: 'views/template/accountCategory_add.html',
    });
  };

});