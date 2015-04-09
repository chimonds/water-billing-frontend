'use strict';

/**
 * @ngdoc function
 * @name billingApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the LogoutCtrl
 */

  app.controller('LogoutCtrl', function ($scope,$cookieStore,$location, $window) {
    console.log('Logging out...');
      // Removing a cookie
      $cookieStore.remove('userInfo');

      //redirect user
      $location.path('/contacts');
      $window.location.reload();
  });
