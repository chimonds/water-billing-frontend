'use strict';

/**
 * @author maitha.manyala [at] gmail.com
 * @ngdoc function
 * @name billingApp.controller:BillingMonthsCtrl
 * @description
 * # UsersCtrl
 * Controller of the BillingMonthsCtrl
 */

app.controller('ZonesCtrl', function($scope, $http, appService, $cookieStore, $state, $mdDialog, $mdToast, $animate, $rootScope) {
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
        appService.getZones(request).success(function(response) {
            $scope.errorOccured = false;
            $scope.zones = response.payload.content;
            $scope.totalZones = response.payload.totalElements; //to change this
            $state.go('zones');
        }).error(function(data, status) {
            if (status === 401) {
                $state.go('session');
                $scope.message = data.message;
            } else {
                $scope.errorOccured = true;
                $scope.errorMsg = data.message;
                $state.go('zones');
            }

        });

    };

    //load page data
    $scope.getPageData(1);

    $scope.seach = function() {
        $scope.getPageData(1);
    };

    $scope.editZoneDialog = function(index) {
        $scope.selectedZone = $scope.zones[index];

        $mdDialog.show({
            controller: EditZoneDialogController,
            templateUrl: 'views/template/zone_edit.html',
            resolve: {
                selectedZone: function() {
                    return $scope.selectedZone;
                }
            }
        });
    };

    function EditZoneDialogController($scope, $mdDialog, $rootScope, selectedZone, appService) {
        var config = appService.getCofig();
        $scope.myForm = {};
        $scope.selectedZone = selectedZone;
        $scope.form = selectedZone;

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
                var zoneId = form.zoneId;

                //send request
                appService.updateZone(request,zoneId).success(function(response) {
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

    $scope.addZoneDialog = function() {
        $mdDialog.show({
            controller: AddZoneDialogController,
            templateUrl: 'views/template/zone_add.html',
        });
    };

    function AddZoneDialogController($scope, $mdDialog, $rootScope, appService) {
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
                appService.createZone(request).success(function(response) {
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
