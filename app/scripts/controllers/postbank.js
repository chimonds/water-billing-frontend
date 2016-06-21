'use strict';

/**
 * @ngdoc function
 * @name majiApp.controller:PostbankCtrl
 * @description
 * # PostbankCtrl
 * Controller of the majiApp
 */
app.controller('PostBankCtrl', function($scope, $http, appService, $cookieStore, $state, $mdDialog, $mdToast, $animate, $rootScope, $timeout, Upload) {
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
    appService.getPostBankFiles(request).success(function(response) {
      $scope.errorOccured = false;
      $scope.files = response.payload.content;
      $scope.totalFiles = response.payload.totalElements; //to change this
      $state.go('postbank');
    }).error(function(data, status) {
      if (status === 401) {
        $state.go('session');
        $scope.message = data.message;
      } else {
        $scope.errorOccured = true;
        $scope.errorMsg = data.message;
        $state.go('postbank');
      }
    });

  };

  //load page data
  $scope.getPageData(1);

  $scope.seach = function() {
    $scope.getPageData(1);
  };


  $scope.upload = function(file, errFiles) {
    var postUrl = appService.getBaseURl() + 'postBankFiles/create';
    var token = appService.getAuthToken();
    $scope.errorMsg = "";

    $scope.f = file;
    $scope.errFile = errFiles && errFiles[0];
    if (file) {
      file.upload = Upload.upload({
        url: postUrl,
        fields: {
          'token': token
        }, // additional data to send
        file: file
      });
      file.upload.then(function(response) {
        $timeout(function() {
          //$scope.errorMsg = response.message;
          $scope.getPageData(1);
        });
      }, function(response) {
        $scope.errorMsg = response.data.message;
        $scope.getPageData(1);
        if (response.status > 0) {
          $scope.errorMsg = response.data.message;
        }
      }, function(evt) {
        file.progress = Math.min(100, parseInt(100.0 *
          evt.loaded / evt.total));
      });
    }
  };




  $scope.postDialog = function(index) {
    $scope.file = $scope.files[index];
    $mdDialog.show({
      controller: PostFileCtrl,
      templateUrl: 'views/template/postbank_edit.html',
      resolve: {
        file: function() {
          return $scope.file;
        }
      }
    });
  };

  function PostFileCtrl($scope, $mdDialog, $rootScope, file, appService) {
    var config = appService.getCofig();
    $scope.myForm = {};
    $scope.file = file;
    $scope.form = {};



    $scope.post = function(form) {
      var myForm = $scope.myForm;
      if (myForm.object.$valid) {

        var request = {};
        request.fileId = $scope.file.fileId;
        request.status = form.action;

        appService.postPostBankFile(request).success(function(response) {
          $scope.showErrorInfo = true;
          $scope.errorClass = config.cssAlertSucess;
          $scope.errorMsg = response.message;
          //notify roles page to reload data
          $rootScope.$broadcast('onReloadPageData');

        }).error(function(data, status) {
          if (status === 401) {
            $state.go('session');
            $scope.message = data.message;
          } else {
            $scope.showErrorInfo = true;
            $scope.errorClass = config.cssAlertDanger;
            $scope.errorMsg = data.message;
          }
        });
      }
    }

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

  }

});