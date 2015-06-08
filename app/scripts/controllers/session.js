'use strict';

/**
 * @ngdoc function
 * @name majiApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the majiApp
 */

  app.controller('SessionCtrl', function ($scope,$cookieStore,$rootScope,$location, $window) {
      // Removing a cookie
      $cookieStore.remove('userInfo');
      $rootScope.showMainToolbar = false;
  });
