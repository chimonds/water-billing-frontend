'use strict';

/**
 * @ngdoc function
 * @name equismsApp.controller:MyProfileCtrl
 * @description
 * # MyProfileCtrl
 * Controller of the equismsApp
 */
app.controller('MyProfileCtrl', function ($scope, $http, appService, $cookieStore, $state, $mdDialog, $mdToast, $animate, $rootScope) {
  //get config
  var config = appService.getCofig();

  $scope.update = function (form) {
    var myForm = $scope.myForm.object;
    if (myForm.$invalid === false) {
      //good to go
      $scope.showErrorInfo = true;
      $scope.errorClass = config.cssAlertInfo;
      $scope.errorMsg = config.msgSendingData;

      var request = {};
      request.existingPassword = form.existingPassword;
      request.newPassword = form.newPassword;
      request.confirmPassword = form.confirmPassword;

      //send request
      appService.updatePassword(request).success(function (response) {
        $scope.errorOccured = false;
        $scope.errorClass = config.cssAlertSucess;
        $scope.errorMsg = response.message;

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
});
