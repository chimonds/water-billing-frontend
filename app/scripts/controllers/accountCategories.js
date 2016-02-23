'use strict';

/**
 * @author maitha.manyala [at] gmail.com
 * @ngdoc function
 * @name majiApp.controller:CategoriesCtrl
 * @description
 * # CategoriesCtrl
 * Controller of the CategoriesCtrl
 */

app.controller('CategoriesCtrl', function($scope, $http, appService, $cookieStore, $state, $mdDialog, $mdToast, $animate, $rootScope) {
  //get config
  var config = appService.getCofig();
  $scope.params = {};
  $scope.params.page = 1;
  $scope.params.size = 10;

  //search filter
  $scope.searchFilter = {};
  $scope.searchFilter.text = '';

  //listen on categories added
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
    appService.getAccountCategories(request).success(function(response) {
      $scope.errorOccured = false;
      $scope.categories = response.payload.content;
      $scope.totalCategories = response.payload.totalElements; //to change this
      $state.go('categories');
    }).error(function(data, status) {
      if (status === 401) {
        $state.go('session');
        $scope.message = data.message;
      } else {
        $scope.errorOccured = true;
        $scope.errorMsg = data.message;
        $state.go('categories');
      }
    });
  };

  //load page data
  $scope.getPageData(1);

  $scope.seach = function() {
    $scope.getPageData(1);
  };

  $scope.editDialog = function(index) {
    $scope.selectedCategory = $scope.categories[index];

    $mdDialog.show({
      controller: EditDialogController,
      templateUrl: 'views/template/accountCategory_edit.html',
      resolve: {
        selectedCategory: function() {
          return $scope.selectedCategory;
        }
      }
    });
  };

  function EditDialogController($scope, $mdDialog, $rootScope, selectedCategory, appService) {
    var config = appService.getCofig();
    $scope.myForm = {};
    $scope.selectedCategory = selectedCategory;
    $scope.form = selectedCategory;

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
        var accountCategoryId = $scope.selectedCategory.categoryId;

        //send request
        appService.updateAccountCategory(request, accountCategoryId).success(function(response) {
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

  function AddDialogController($scope, $mdDialog, $rootScope, appService) {
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
        appService.createAccountCategory(request).success(function(response) {
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