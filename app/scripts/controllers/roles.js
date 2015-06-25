'use strict';

/**
 * @ngdoc function
 * @name majiApp.controller:RolesCtrl
 * @description
 * # RolesCtrl
 * Controller of the majiApp
 */

app.controller('RolesCtrl', function($scope, $http, appService, $cookieStore, $state, $mdDialog, $mdToast, $animate, $rootScope) {

    //get config
    var config = appService.getCofig();
    $scope.params = {};
    $scope.params.page = 1;
    $scope.params.size = 10;

    //search filter
    $scope.roleFilter = {};
    $scope.roleFilter.text = '';


    //handle pagination
    $scope.pageChangedRoles = function(newPage) {
        $scope.getRoles(newPage);
    };

    $scope.viewRoleProfile = function(index){
        $scope.selectedRole = $scope.roles[index];
        var roleId = $scope.selectedRole.userRoleId;

        //
        $scope.showRoles =false;
        $scope.showRoleProfile =true;

        appService.getRolePermissions(roleId).success(function(response) {
            $scope.errorOccured = false;
            var roles = response.payload;
            $scope.assignedPermissions  = roles.assigned;
            $scope.availablePermissions = roles.available;
            $state.go('roles');

        }).error(function(data) {
            $scope.errorOccured = true;
            $scope.errorMsg = data.message;
            $state.go('roles');
        });
    };

    $scope.removePermission = function(index){
        var selectedPermission = $scope.assignedPermissions[index];
        console.log(index);
        console.log(selectedPermission);
        
        //remove from assigned
        $scope.assignedPermissions.splice(index, 1);

        //add to available
        $scope.availablePermissions.push(selectedPermission);

        //send request
        var request = $scope.assignedPermissions;
        var roleId = $scope.selectedRole.userRoleId;
        appService.updateRoleWithPemissions(request, roleId).success(function(response) {
            $scope.showToast(response.message);
        }).error(function(data) {
             $scope.showToast(data.message);
        });
    };

    $scope.showToast = function(message) {
        $mdToast.show(
          $mdToast.simple()
            .content(message)
            .position('bottom right')
            .hideDelay(3000)
        );
      };

    $scope.addPermission = function(index){
        var selectedPermission = $scope.availablePermissions[index];
        //remove from available
        $scope.availablePermissions.splice(index, 1);

        //add to assigned
        $scope.assignedPermissions.push(selectedPermission);

        //send request
        var request = $scope.assignedPermissions;
        var roleId = $scope.selectedRole.userRoleId;
        appService.updateRoleWithPemissions(request, roleId).success(function(response) {
            $scope.showToast(response.message);
        }).error(function(data, status) {
            if(status===401){
                $state.go('session');
                $scope.message = data.message;
            }else{
                $scope.showToast(data.message);
            }
        });
    };


    $scope.viewRoles = function(){
        $scope.showRoles =true;
        $scope.showRoleProfile =false;
    };
    /**
     * Get role list
     * @param  {[type]} newPage [page no]
     * @return {[type]}         [JSON object]
     */
    $scope.getRoles = function(newPage) {
        newPage--;
        var request = {};
        request.page = newPage;
        request.size = 10;

        //toggle roles view
        $scope.showRoles =true;


        if (typeof $scope.roleFilter.text === 'undefined') {
            $scope.roleFilter.text = '';
        }
        //set search filter
        request.filter = $scope.roleFilter.text;

        //send request
        appService.getRoles(request).success(function(response) {
            $scope.errorOccured = false;
            $scope.roles = response.payload.content;
            $scope.totalRoles = response.payload.totalElements; //to change this
            $state.go('roles');
        }).error(function(data, status) {
            if(status===401){
                $state.go('session');
                $scope.message = data.message;
            }else{
                $scope.errorOccured = true;
                $scope.errorMsg = data.message;
                $state.go('roles');
            }
        });
    };

    //load roles
    $scope.getRoles(1);

    /**
     * Search roles based on search filter
     * @return {[type]} [page number]
     */
    $scope.seachRole = function() {
        $scope.getRoles(1);
    };


    //listen on role added
    $scope.$on('onReloadRoles', function (event) {
        $scope.getRoles(1);
    });


    $scope.addRoleDialog = function() {
        $mdDialog.show({
            controller: AddRoleDialogController,
            templateUrl: 'views/template/role_add.html',
        });
    };



    function AddRoleDialogController($scope, $mdDialog, $rootScope, appService) {
        var config = appService.getCofig();

        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.save = function(form) {
            var myForm = $scope.myForm;
            if (myForm.$invalid === false) {
                //good to go
                $scope.showErrorInfo = true;
                $scope.errorClass = config.cssAlertInfo;
                $scope.errorMsg = config.msgSendingData;

                var request = {};
                request.name = form.name;
                request.description = form.description;

                //send request
                appService.createRole(request).success(function(response) {
                    $scope.errorOccured = false;
                    $scope.errorClass = config.cssAlertSucess;
                    $scope.errorMsg = response.message;

                    //notify roles page to reload data
                    $rootScope.$broadcast('onReloadRoles');

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
            }
        };
    }

    $scope.editRoleDialog = function(index) {
        $scope.selectedRole = $scope.roles[index];
        $mdDialog.show({
            controller: EditRoleDialogController,
            templateUrl: 'views/template/role_edit.html',
            resolve:{
                selectedRole: function(){
                    return $scope.selectedRole;
                }
            }
        });
    };

    function EditRoleDialogController($scope, $mdDialog, $rootScope, appService, selectedRole) {
        $scope.myForm = {};
        $scope.myForm.name = selectedRole.name;
        $scope.myForm.description = selectedRole.description;
        var config = appService.getCofig();

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        /**
         * Update user role
         * @param  {[type]} form [form object]
         * @return {[type]}      [JSON object]
         */
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

                var roleId = selectedRole.userRoleId;

                //send request
                appService.updateRole(request, roleId).success(function(response) {
                    $scope.errorOccured = false;
                    $scope.errorClass = config.cssAlertSucess;
                    $scope.errorMsg = response.message;

                    //notify roles page to reload data
                    $rootScope.$broadcast('onReloadRoles');

                }).error(function(data, status) {
                    if(status===401){
                        $state.go('session');
                        $scope.message = data.message;
                    }
                    else{
                        $scope.errorClass = config.cssAlertDanger;
                        $scope.errorOccured = true;
                        $scope.errorMsg = data.message;
                    }
                });
            }
        };
    }

});
