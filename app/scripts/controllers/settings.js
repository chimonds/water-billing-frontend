'use strict';

/**
 * @ngdoc function
 * @name billingApp.controller:ReportsCtrl
 * @description
 * # ReportsCtrl
 * Controller of the billingApp
 */

  app.controller('SettingsCtrl', function($scope, $http, appService, $cookieStore, $state, $mdDialog, $mdToast, $animate, $rootScope) {
        //get config
    var config = appService.getCofig();
    $scope.params = {};
    $scope.params.page = 1;
    $scope.params.size = 10;

    //search filter
    $scope.searchFilter = {};
    $scope.searchFilter.text = '';

    //listen on role added
    $scope.$on('onReloadData', function(event) {
        $scope.getData(1);
    });

    //handle pagination
    $scope.pageChanged = function(newPage) {
        $scope.getData(newPage);
    };

    $scope.getData = function(newPage) {
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
        appService.getOptions(request).success(function(response) {
            $scope.errorOccured = false;
            $scope.options = response.payload.content;
            $scope.totalOptions = response.payload.totalElements; //to change this
            $state.go('settings');
        }).error(function(data, status) {
             if(status===401){
                $state.go('session');
                $scope.message = data.message;
            }else{
                $scope.errorOccured = true;
                $scope.errorMsg = data.message;
                $state.go('settings');
            }
        });
    };

    //load users
    $scope.getData(1);

    $scope.seachOptions = function() {
        $scope.getData(1);
    };


    $scope.editOptionDialog = function(index) {
        $scope.selectedOption = $scope.options[index];
        $mdDialog.show({
            controller: EditOptionDialogController,
            templateUrl: 'views/template/option_edit.html',
            resolve: {
                selectedOption: function() {
                    return $scope.selectedOption;
                }
            }
        });
    };

    function EditOptionDialogController($scope, $mdDialog, $rootScope, selectedOption, appService) {
        var config = appService.getCofig();
        $scope.myForm = {};
        $scope.selectedOption = selectedOption;
        $scope.form = selectedOption;


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
                request.name = form.name;
                request.description = form.description;
                request.value = form.value;

                var optionId = selectedOption.optionId;

                //send request
                appService.updateOption(request,optionId).success(function(response) {
                    $scope.errorOccured = false;
                    $scope.errorClass = config.cssAlertSucess;
                    $scope.errorMsg = response.message;
                    //notify roles page to reload data
                    $rootScope.$broadcast('onReloadData');

                }).error(function(data, status) {
                    if(status===401){
                        $state.go('session');
                        $scope.message = data.message;
                    }else{
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
