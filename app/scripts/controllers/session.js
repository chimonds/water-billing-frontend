'use strict';

/**
 * @ngdoc function
 * @name billingApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the billingApp
 */

  app.controller('SessionCtrl', function ($scope,$cookieStore,$rootScope,$location, $window) {
      // Removing a cookie
      $cookieStore.remove('userInfo');
      $rootScope.showMainToolbar = false;
  });
