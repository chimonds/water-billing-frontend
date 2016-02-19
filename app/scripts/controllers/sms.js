'use strict';

/**
 * @ngdoc function
 * @name majiApp.controller:SmsCtrl
 * @description
 * # SmsCtrl
 * Controller of the majiApp
 */
  app.controller('SmsCtrl', function ($scope, $http, appService, $cookieStore, $state, $mdDialog, $mdToast, $animate, $rootScope) {
      //get config
      var config = appService.getCofig();

      //Start Load zones
      $scope.getAllZones = function(){
        var request = {};
        request.page = 0;
        request.size = 500;
        appService.getZones(request).success(function(response) {
            $scope.remotezones = response.payload.content;
            console.log($scope.remotezones);
        });
      };

      $scope.getAllZones();
      $scope.zones = [];
      $scope.phones =[];

      $scope.loadZones = function(query) {
          return $scope.remotezones;
      };
      //End Load zones

      //Load all sms templates
      $scope.loadAllSMSTemplates = function(){
        var request = {};
        request.page = 0;
        request.size = 100;
        appService.getSMSTemplates(request).success(function(response) {
            $scope.remotetemplates = response.payload.content;
        });
      };

      $scope.loadAllSMSTemplates();
      //End load all sms templates


      //SMS groups
      $scope.pageChangedSMSGroups = function(newPage) {
          $scope.getSMSGroups(newPage);
      };

      $scope.smsGroupFilter ={};

      $scope.getSMSGroups = function(newPage) {
          newPage--;
          var request = {};
          request.page = newPage;
          request.size = 10;


          if (typeof $scope.smsGroupFilter.text === 'undefined') {
              $scope.smsGroupFilter.text = '';
          }

          //set search filter
          request.filter = $scope.smsGroupFilter.text;

          //send request
          appService.getSMSs(request).success(function(response) {
              $scope.errorOccured = false;
              $scope.SMSs = response.payload.content;
              $scope.totalSMSs = response.payload.totalElements;
          }).error(function(data, status) {
               if(status===401){
                  $state.go('session');
                  $scope.message = data.message;
              }else{
                  $scope.errorOccured = true;
                  $scope.errorMsg = data.message;
              }
          });
      };

      $scope.getSMSGroups(1);
     //End sms groups

      //Messages
      $scope.pageChangedMessages = function(newPage) {
          $scope.getMessages(newPage);
      };

      $scope.messagesFilter={};
      $scope.getMessages = function(newPage) {
          newPage--;
          var request = {};
          request.page = newPage;
          request.size = 10;


          if (typeof $scope.messagesFilter.text === 'undefined') {
              $scope.messagesFilter.text = '';
          }

          //set search filter
          request.filter = $scope.messagesFilter.text;

          //send request
          appService.getMessages(request).success(function(response) {
              $scope.errorOccured = false;
              $scope.messages = response.payload.content;
              $scope.totalMessages = response.payload.totalElements; //to change this
          }).error(function(data, status) {
               if(status===401){
                  $state.go('session');
                  $scope.message = data.message;
              }else{
                  $scope.errorOccured = true;
                  $scope.errorMsg = data.message;
              }
          });
      };
      $scope.getMessages(1);

     //End messages




      $scope.sms = {template:""};

      $scope.submitMessage = function(){
        $scope.composeError = false;
        var zones = $scope.zones;
        var phones = $scope.phones;
        var template = $scope.sms.template;
        var name = $scope.sms.name;

        if(name.length==0){
          $scope.composeError = true;
          $scope.errorClass = config.cssAlertDanger;
          $scope.errorMsg = "SMS name can not be empty";
        }
        else if(zones.length == 0 && phones.length==0){
          $scope.composeError = true;
          $scope.errorClass = config.cssAlertDanger;
          $scope.errorMsg = "Please select a zone or enter a mobile number";
        }else if (template==="") {
          $scope.composeError = true;
          $scope.errorClass = config.cssAlertDanger;
          $scope.errorMsg = "Please sms template";
        }else {
          var request = {};
          request.name = name;
          request.zones = zones;
          request.contacts = phones;
          request.smsTemplate = template;

          //console.log(request);

          //send request
          appService.createSMS(request).success(function(response) {
              $scope.composeError = true;
              $scope.errorClass = config.cssAlertSucess;
              $scope.errorMsg = response.message;
              //notify roles page to reload data
              $rootScope.$broadcast('onReloadPageData');
          }).error(function(data, status) {
              if (status === 401) {
                  $state.go('session');
                  $scope.message = data.message;
              } else {
                  $scope.composeError = true;
                  $scope.errorClass = config.cssAlertDanger;
                  $scope.errorMsg = data.message;
              }
          });

        }
      };



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
              $state.go('sms');
          }).error(function(data, status) {
              if (status === 401) {
                  $state.go('session');
                  $scope.message = data.message;
              } else {
                  $scope.errorOccured = true;
                  $scope.errorMsg = data.message;
                  $state.go('sms');
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

      $scope.approveSMSDialog = function(index) {
          $scope.sms = $scope.SMSs[index];

          $mdDialog.show({
              controller: ApproveSMSDialogController,
              templateUrl: 'views/template/sms_approve.html',
              resolve: {
                  sms: function() {
                      return $scope.sms;
                  }
              }
          });
      };

      function ApproveSMSDialogController($scope, $mdDialog, $rootScope, sms, appService) {
          var config = appService.getCofig();
          //sms placeholders
          $scope.placeholders = appService.getSMSPlaceholders();
          $scope.myForm = {};
          $scope.sms = sms;

          $scope.status =
            [
              {'name': 'Approve'},
              {'name': 'Reject'}
            ];

          console.log($scope.sms);

          //$scope.form = sms;

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

                  var request = {};
                  request.notes = $scope.sms.notes;
                  var status = $scope.sms.approval;
                  request.status = $scope.status[status].name;
                  var smsGroupId = $scope.sms.smsGroupId;

                  console.log(request);
                  //send request
                  appService.approveSMS(request,smsGroupId).success(function(response) {
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


  });
