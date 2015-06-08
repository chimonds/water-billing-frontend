'use strict';

/**
 * @ngdoc function
 * @name majiApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the LoginCtrl
 */
app.controller('LoginCtrl', function ($scope,$parse, $rootScope, appService, $state, $window, $cookieStore, $location, $mdToast, $animate) {
  $rootScope.viewSidebar = false;
  $scope.showErrorInfo = false;
  $scope.myForm = {};
  var config = appService.getCofig();

  //check if user is logged in
  var userInfo = $cookieStore.get('userInfo');
  if (typeof userInfo === 'undefined') {
  } else {
    $state.go('roles');
  }


  $scope.showToast = function (message) {
    $mdToast.show(
      $mdToast.simple()
        .content(message)
        .position('bottom right')
        .hideDelay(3000)
    );
  };


  $scope.submit = function (form) {
    var myForm = $scope.myForm.object;
    if (myForm.$invalid === false) {
      $scope.myForm.showErrorInfo = true;
      $scope.myForm.errorInfo = config.msgSendingData;
      $scope.myForm.errorClass = config.cssAlertInfo;

      var request = {};
      request.username = form.username;
      request.password = form.password;

      //user login
      appService.authenticate(request).success(function (response) {
        console.log(response);

        $scope.myForm.errorClass = config.cssAlertSucess;
        $scope.myForm.errorInfo = response.message + " ...";

        var data = response.payload;
        $rootScope.currentUser = {};
        $rootScope.currentUser.name = data.name;
        $rootScope.currentUser.token = data.token;

        var permissions = data.permissions;
        angular.forEach(permissions, function (permission) {
          $rootScope[permission] = true;
        });

        console.log($rootScope);

        //Initialize menu object
        $rootScope.menu = {};

        //show dashboard
        $state.go('dashboard');
        //show main toolbar
        $rootScope.showMainToolbar = true;


        $cookieStore.put('userInfo', $rootScope.currentUser);
        $cookieStore.put('permissions', permissions);

        //$cookieStore.put('userRoles', $rootScope.menu);

      }).error(function (data, status, headers) {
        console.log(data);
        console.log(headers);
        $scope.myForm.errorClass = config.cssAlertDanger;
        $scope.myForm.errorInfo = data.message;

        console.log(status);
      });
    }
  };
});
