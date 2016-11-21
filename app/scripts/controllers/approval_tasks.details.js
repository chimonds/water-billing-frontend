'use strict';

/**
 * @author maitha.manyala [at] gmail.com
 * @ngdoc function
 * @name majiApp.controller:ApprovalTaskCtrl
 * @description
 * # ApprovalTaskCtrl
 * Controller of the ApprovalTaskCtrl
 */

app.controller('ApprovalTaskCtrl', function ($scope, $http, appService, $cookieStore, $state, $mdDialog, $mdToast, $animate, $rootScope, $stateParams) {
    $scope.taskId = $stateParams.taskId;

    var request = {};
    var taskId = $scope.taskId;

    $scope.$on('onReloadAccountData', function (event) {
        $scope.getOne();
    });

    $scope.getOne = function () {
        //send request
        appService.getTaskById(taskId).success(function (response) {
            $scope.task = response.payload;
            $scope.accountFound = true;
            $scope.errorOccured = false;
            //get approval steps
            //$scope.getApprovalSteps();
        }).error(function (data, status) {
            if (status === 401) {
                $state.go('session');
                $scope.message = data.message;
            } else {
                $scope.errorOccured = true;
                $scope.accountFound = false;
                $scope.errorMsg = data.message;
            }
        });
    };

    $scope.getOne();

    $scope.getApprovalSteps = function () {
        var taskTypeId = $scope.taskTypeId;
        //send request
        appService.getApprovalStepsByTaskType(taskTypeId).success(function (response) {
            $scope.errorOccured = false;
            $scope.approvals = response.payload;
        }).error(function (data, status) {
            if (status === 401) {
                $state.go('session');
                $scope.message = data.message;
            } else {
                $scope.errorOccured = true;
                $scope.errorMsg = data.message;
            }
        });

    };

    $scope.addApprovalDialog = function () {
        $mdDialog.show({
            controller: AddApprovalStepDialogController,
            templateUrl: 'views/template/approval_step_add.html',
            resolve: {
                taskType: function () {
                    return $scope.taskType;
                }
            }
        });
    };

    function AddApprovalStepDialogController($scope, $mdDialog, $rootScope, taskType, appService) {
        var config = appService.getCofig();
        $scope.myForm = {};
        $scope.taskType = taskType;
        $scope.form = {};
        $scope.data = {};

        var request = {};
        request.page = 0;
        request.size = 100;
        request.filter = '';

        //Get active billing month

        //Get payment types
        appService.getRoles(request).success(function (response) {
            $scope.userRoles = response.payload.content;
        });


        $scope.cancel = function () {
            $mdDialog.cancel();
        };
        $scope.save = function (form) {
            var myForm = $scope.myForm.object;
            if (myForm.$invalid === false) {
                //good to go
                $scope.showErrorInfo = true;
                $scope.errorClass = config.cssAlertInfo;
                $scope.errorMsg = config.msgSendingData;

                var request = form;
                //set billing month
                request.taskType = {};
                request.taskType.taskTypeId = $scope.taskType.taskTypeId;

                //send request
                appService.createApprovalStep(request).success(function (response) {
                    $scope.errorOccured = true;
                    $scope.errorClass = config.cssAlertSucess;
                    $scope.errorMsg = response.message;
                    //notify
                    $rootScope.$broadcast('onReloadAccountData');
                }).error(function (data, status) {
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


    $scope.removeStepDialog = function (index) {
        var approval = $scope.approvals[index];
        $mdDialog.show({
            controller: RemoveStepDialogController,
            templateUrl: 'views/template/approval_step_remove.html',
            resolve: {
                approval: function () {
                    return approval;
                }
            }
        });
    };

    function RemoveStepDialogController($scope, $mdDialog, $rootScope, approval, appService) {
        var config = appService.getCofig();
        $scope.myForm = {};
        $scope.approval = approval;
        $scope.form = approval;
        $scope.data = {};

        console.log(approval);

        var request = {};
        request.page = 0;
        request.size = 100;
        request.filter = '';

        //Get active billing month

        //Get payment types
        appService.getRoles(request).success(function (response) {
            $scope.userRoles = response.payload.content;
        });


        $scope.cancel = function () {
            $mdDialog.cancel();
        };
        $scope.save = function (form) {
            var myForm = $scope.myForm.object;
            //good to go
            $scope.showErrorInfo = true;
            $scope.errorClass = config.cssAlertInfo;
            $scope.errorMsg = config.msgSendingData;

            var request = form;

            //send request
            appService.removeApprovalStep(request).success(function (response) {
                $scope.errorOccured = true;
                $scope.errorClass = config.cssAlertSucess;
                $scope.errorMsg = response.message;
                //notify
                $rootScope.$broadcast('onReloadAccountData');
            }).error(function (data, status) {
                if (status === 401) {
                    $state.go('session');
                    $scope.message = data.message;
                } else {
                    $scope.errorOccured = true;
                    $scope.errorClass = config.cssAlertDanger;
                    $scope.errorMsg = data.message;
                }
            });
        };
    };

});