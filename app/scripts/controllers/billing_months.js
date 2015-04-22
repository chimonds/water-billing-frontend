'use strict';

/**
 * @author maitha.manyala [at] gmail.com
 * @ngdoc function
 * @name billingApp.controller:BillingMonthsCtrl
 * @description
 * # UsersCtrl
 * Controller of the BillingMonthsCtrl
 */

app.controller('BillingMonthsCtrl', function($scope, $http, appService, $cookieStore, $state, $mdDialog, $mdToast, $animate, $rootScope) {
    //get config
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

        //set search filter
        request.filter ='';

        //send request
        appService.getBillingMonths(request).success(function(response) {
            $scope.errorOccured = false;
            $scope.months = response.payload.content;
            $scope.totalMonths = response.payload.totalElements; //to change this
            $state.go('billing_months');
        }).error(function(data, status) {
            if (status === 401) {
                $state.go('session');
                $scope.message = data.message;
            } else {
                $scope.errorOccured = true;
                $scope.errorMsg = data.message;
                //$state.go('users');
            }
        });

    };

    //load data
    $scope.getPageData(1);

    $scope.editBillingMonthDialog = function(index) {
        $scope.billingMonth = $scope.months[index];

        $mdDialog.show({
            controller: EditBillingMonthDialogController,
            templateUrl: 'views/template/billing_month_edit.html',
            resolve: {
                billingMonth: function() {
                    return $scope.billingMonth;
                }
            }
        });
    };

    function EditBillingMonthDialogController($scope, $mdDialog, $rootScope, billingMonth, appService) {
        var config = appService.getCofig();
        $scope.billingMonth = billingMonth;

        $scope.form={};
        $scope.form.billingDate = billingMonth.month;
        $scope.form.isActive = billingMonth.active;


        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.update = function(form) {
            var myForm = $scope.myForm.object;

                //good to go
                $scope.showErrorInfo = true;
                $scope.errorClass = config.cssAlertInfo;
                $scope.errorMsg = config.msgSendingData;

                if(form.isActive===false){
                    $scope.billingMonth.current=0;
                }else{
                    $scope.billingMonth.current=1;
                }

                // $scope.billingMonth.current = form.isActive;
                var request = $scope.billingMonth;
                var billingMonthId = $scope.billingMonth.billingMonthId;

                //send request
                appService.updateBillingMonth(request,billingMonthId).success(function(response) {
                    $scope.errorOccured = false;
                    $scope.errorClass = config.cssAlertSucess;
                    $scope.errorMsg = response.message;
                    //notify roles page to reload data
                    $rootScope.$broadcast('onReloadPageData');

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

        };
    }






});
