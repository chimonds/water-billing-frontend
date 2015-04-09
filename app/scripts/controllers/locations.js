'use strict';

/**
 * @author maitha.manyala [at] gmail.com
 * @ngdoc function
 * @name billingApp.controller:BillingMonthsCtrl
 * @description
 * # UsersCtrl
 * Controller of the LocationsCtrl
 */

app.controller('LocationsCtrl', function($scope, $http, appService, $cookieStore, $state, $mdDialog, $mdToast, $animate, $rootScope) {

  //get config
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
    appService.getLocations(request).success(function(response) {
      $scope.errorOccured = false;
      $scope.locations = response.payload.content;
      $scope.totalLocations = response.payload.totalElements; //to change this
      $state.go('locations');
    }).error(function(data, status) {
      if (status === 401) {
        $state.go('session');
        $scope.message = data.message;
      } else {
        $scope.errorOccured = true;
        $scope.errorMsg = data.message;
        $state.go('locations');
      }

    });

  };

  //load page data
  $scope.getPageData(1);

  $scope.seach = function() {
    $scope.getPageData(1);
  };

  $scope.editLocationDialog = function(index) {
    $scope.selectedLocation = $scope.locations[index];

    $mdDialog.show({
      controller: EditLocationDialogController,
      templateUrl: 'views/template/location_edit.html',
      resolve: {
        selectedLocation: function() {
          return $scope.selectedLocation;
        }
      }
    });
  };

  function EditLocationDialogController($scope, $mdDialog, $rootScope, selectedLocation, appService) {
    var config = appService.getCofig();
    $scope.myForm = {};
    $scope.selectedLocation = selectedLocation;
    $scope.form = selectedLocation;

    $scope.cancel = function() {
      $mdDialog.cancel();
    };
    $scope.update = function(form) {
      var myForm = $scope.myForm.object;
      if (myForm.$invalid === false) {
        //good to go
        $scope.showErrorInfo = true;
        $scope.errorClass = config.cssAlertInfo;
        $scope.errorMsg = config.msgSendingData;

        var request = form;
        var locationId = form.locationId;

        //send request
        appService.updateLocation(request,locationId).success(function(response) {
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

  $scope.addLocationDialog = function() {
    $mdDialog.show({
      controller: AddLocationDialogController,
      templateUrl: 'views/template/location_add.html',
    });
  };

  function AddLocationDialogController($scope, $mdDialog, $rootScope, appService) {
    $scope.myForm = {};
    $scope.form = {};
    var config = appService.getCofig();

    $scope.cancel = function() {
      $mdDialog.cancel();
    };
    $scope.save = function(form) {
      var myForm = $scope.myForm.object;
      if (myForm.$invalid === false) {
        //good to go
        $scope.showErrorInfo = true;
        $scope.errorClass = config.cssAlertInfo;
        $scope.errorMsg = config.msgSendingData;



        var request = form;


        //send request
        appService.createLocation(request).success(function(response) {
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
  };
});
