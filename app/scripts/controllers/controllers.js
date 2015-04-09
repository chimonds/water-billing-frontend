// (function() {
//     'use strict';
//     // Include app dependency on ngMaterial
//     //var app = angular.module('equismsApp', ['ngMaterial']);

//     //Config theme
//     // app.config(function($mdThemingProvider) {
//     //     $mdThemingProvider.theme('blue')
//     //         .primaryPalette('blue')
//     //         .accentPalette('red');
//     // });

//     // Main Controller
//     app.controller('YourController', ['$scope',  '$mdSidenav', function($scope, $mdSidenav) {

//         // $scope.openDialog = function($event) {
//         //     $mdDialog.show({
//         //         targetEvent: $event,
//         //         template: '<md-dialog>' +
//         //             '  <md-content>Hello {{ userName }}!</md-content>' +
//         //             '  <div class="md-actions">' +
//         //             '    <md-button ng-click="closeDialog()">' +
//         //             '      Close' +
//         //             '    </md-button>' +
//         //             '  </div>' +
//         //             '</md-dialog>',
//         //         controller: 'DialogController',
//         //         onComplete: afterShowAnimation,
//         //         locals: {
//         //             name: 'Bobby'
//         //         }
//         //     });
//         //     // When the 'enter' animation finishes...
//         //     function afterShowAnimation(scope, element, options) {
//         //         // post-show code here: DOM element focus, etc.
//         //     }
//         // };

//         $scope.toggleMenu = function() {
//             $mdSidenav('left').toggle();
//         };

  
// })();

      // Left Sidebar Controller
    app.controller('YourController', function($scope, $timeout, $mdSidenav) {
      //$mdSidenav('left').open();
      //$mdSidenav('left').open();
       $scope.toggleMenu = function() {
            $mdSidenav('left').toggle();
        };
    });
    
  // Left Sidebar Controller
    app.controller('LeftCtrl', function($scope, $timeout, $mdSidenav) {
        $scope.close = function() {
            $mdSidenav('left').close();
        };
    });