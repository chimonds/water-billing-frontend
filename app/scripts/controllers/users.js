'use strict';

/**
 * @ngdoc function
 * @name majiApp.controller:ReportsCtrl
 * @description
 * # UsersCtrl
 * Controller of the majiApp
 */

app.controller('UsersCtrl', function ($scope, $http, appService, $cookieStore, $state, $mdDialog, $mdToast, $animate, $rootScope) {

    //get config
    var config = appService.getCofig();
    $scope.params = {};
    $scope.params.page = 1;
    $scope.params.size = 10;

    //search filter
    $scope.searchFilter = {};
    $scope.searchFilter.text = '';

    //listen on user added
    $scope.$on('onReloadUsers', function (event) {
        $scope.getUsers(1);
    });

    //handle pagination
    $scope.pageChangedUsers = function (newPage) {
        $scope.getUsers(newPage);
    };



    $scope.getUsers = function (newPage) {
        newPage--;
        var request = {};
        request.page = newPage;
        request.size = 10;

        //toggle roles view
        $scope.showRoles = true;



        if (typeof $scope.searchFilter.text === 'undefined') {
            $scope.searchFilter.text = '';
        }
        //set search filter
        request.filter = $scope.searchFilter.text;

        //send request
        appService.getUsers(request).success(function (response) {
            $scope.errorOccured = false;
            $scope.users = response.payload.content;
            $scope.totalUsers = response.payload.totalElements; //to change this
            $state.go('users');
        }).error(function (data, status) {
            if (status === 401) {
                $state.go('session');
                $scope.message = data.message;
            } else {
                $scope.errorOccured = true;
                $scope.errorMsg = data.message;
                $state.go('users');
            }
        });
    };

    //load users
    $scope.getUsers(1);

    $scope.seachUsers = function () {
        $scope.getUsers(1);
    };


    $scope.editUserDialog = function (index) {
        $scope.selectedUser = $scope.users[index];

        $mdDialog.show({
            controller: EditUserDialogController,
            templateUrl: 'views/template/user_edit.html',
            resolve: {
                selectedUser: function () {
                    return $scope.selectedUser;
                }
            }
        });
    };

    $scope.resetUserDialog = function (index) {
        $scope.selectedUser = $scope.users[index];
        $mdDialog.show({
            controller: resetPasswordDialogController,
            templateUrl: 'views/template/reset_password.html',
            resolve: {
                selectedUser: function () {
                    return $scope.selectedUser;
                }
            }
        });
    };

    function resetPasswordDialogController($scope, $mdDialog, $rootScope, selectedUser, appService) {
        var config = appService.getCofig();
        $scope.myForm = {};
        $scope.selectedUser = selectedUser;
        $scope.form = selectedUser;

        $scope.cancel = function () {
            $mdDialog.cancel();
        };
        $scope.update = function (form) {
            var myForm = $scope.myForm.object;
            if (myForm.$invalid === false) {
                //good to go
                $scope.showErrorInfo = true;
                $scope.errorClass = config.cssAlertInfo;
                $scope.errorMsg = config.msgSendingData;


                var request = {};
                request.emailAddress = form.emailAddress;

                //send request
                appService.resetUserPassword(request).success(function (response) {
                    $scope.errorOccured = false;
                    $scope.errorClass = config.cssAlertSucess;
                    $scope.errorMsg = response.message;
                    //notify roles page to reload data
                    $rootScope.$broadcast('onReloadUsers');

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


    function EditUserDialogController($scope, $mdDialog, $rootScope, selectedUser, appService) {
        var config = appService.getCofig();
        $scope.myForm = {};
        $scope.selectedUser = selectedUser;
        $scope.form = selectedUser;


        var request = {};
        request.page = 0;
        request.size = 1000;
        request.filter = '';

        //send request
        appService.getRoles(request).success(function (response) {
            $scope.roles = response.payload.content;
        }).error(function (data) { });

        $scope.cancel = function () {
            $mdDialog.cancel();
        };
        $scope.update = function (form) {
            var myForm = $scope.myForm.object;
            if (myForm.$invalid === false) {
                //good to go
                $scope.showErrorInfo = true;
                $scope.errorClass = config.cssAlertInfo;
                $scope.errorMsg = config.msgSendingData;

                var userRole = form.userRoleList;
                console.log('Selected user role:' + userRole);

                var request = {};
                request.firstName = form.firstName;
                request.lastName = form.lastName;
                request.emailAddress = form.emailAddress;
                request.active = form.active;
                request.userRole = $scope.roles[userRole];
                request.userId = $scope.selectedUser.userId;
                request.mobileNo = form.mobileNo;

                console.log(request);

                //send request
                appService.updateUser(request).success(function (response) {
                    $scope.errorOccured = false;
                    $scope.errorClass = config.cssAlertSucess;
                    $scope.errorMsg = response.message;
                    //notify roles page to reload data
                    $rootScope.$broadcast('onReloadUsers');

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
    }

    $scope.addUserDialog = function () {
        $mdDialog.show({
            controller: AddUserDialogController,
            templateUrl: 'views/template/user_add.html',
        });
    };

    function AddUserDialogController($scope, $mdDialog, $rootScope, appService) {
        $scope.myForm = {};

        $scope.form = {};
        $scope.form.userRole = '';
        $scope.form.status = 0;


        var config = appService.getCofig();


        var request = {};
        request.page = 0;
        request.size = 1000;
        request.filter = '';

        //send request
        appService.getRoles(request).success(function (response) {
            $scope.errorOccured = false;
            $scope.roles = response.payload.content;
        }).error(function (data) { });


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

                var userRole = form.userRole;

                var request = {};
                request.firstName = form.firstName;
                request.lastName = form.lastName;
                request.emailAddress = form.emailAddress;
                request.active = form.isActive;
                request.userRole = {};
                request.userRole.userRoleId = form.userRole.userRoleId;
                request.mobileNo = form.mobileNo;

                //send request
                appService.createUser(request).success(function (response) {
                    $scope.errorOccured = false;
                    $scope.errorClass = config.cssAlertSucess;
                    $scope.errorMsg = response.message;
                    //notify users page to reload data
                    $rootScope.$broadcast('onReloadUsers');

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
    }
});
