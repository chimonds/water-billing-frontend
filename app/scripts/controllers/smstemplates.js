'use strict';

/**
 * @ngdoc function
 * @name majiApp.controller:SmstemplatesCtrl
 * @description
 * # SmsTemplatesCtrl
 * Controller of the majiApp
 */

  app.controller('SmsTemplatesCtrl', function ($scope, $http, appService, $cookieStore, $state, $mdDialog, $mdToast, $animate, $rootScope) {
      //get config
      var config = appService.getCofig();

      $scope.params = {};
      $scope.params.page = 1;
      $scope.params.size = 10;

      //search filter
      $scope.searchFilter = {};
      $scope.searchFilter.text = '';

      //listen on zone added
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
          appService.getSMSTemplates(request).success(function(response) {
              $scope.errorOccured = false;
              $scope.templates = response.payload.content;
              $scope.totalTemplates = response.payload.totalElements; //to change this
              $state.go('sms_templates');
          }).error(function(data, status) {
              if (status === 401) {
                  $state.go('session');
                  $scope.message = data.message;
              } else {
                  $scope.errorOccured = true;
                  $scope.errorMsg = data.message;
                  $state.go('sms_templates');
              }
          });
      };

      //load page data
      $scope.getPageData(1);

      $scope.seach = function() {
          $scope.getPageData(1);
      };

      $scope.editTemplateDialog = function(index) {
          $scope.template = $scope.templates[index];

          $mdDialog.show({
              controller: EditTemplateDialogController,
              templateUrl: 'views/template/sms_template_edit.html',
              resolve: {
                  template: function() {
                      return $scope.template;
                  }
              }
          });
      };

      function EditTemplateDialogController($scope, $mdDialog, $rootScope, template, appService) {
          var config = appService.getCofig();
          //sms placeholders
          $scope.placeholders = appService.getSMSPlaceholders();
          $scope.myForm = {};
          $scope.template = template;
          $scope.form = template;

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
                  var smsTemplateId = form.smsTemplateId;

                  //send request
                  appService.updateTemplate(request,smsTemplateId).success(function(response) {
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

      $scope.addTemplateDialog = function() {
          $mdDialog.show({
              controller: AddTemplateDialogController,
              templateUrl: 'views/template/sms_template_add.html',
          });
      };

      function AddTemplateDialogController($scope, $mdDialog, $rootScope, appService) {
          $scope.myForm = {};
          $scope.form = {};
          var config = appService.getCofig();
          //sms placeholders
          $scope.placeholders = appService.getSMSPlaceholders();

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
                  appService.createSMSTemplate(request).success(function(response) {
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
