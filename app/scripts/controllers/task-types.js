'use strict';

/**
 * @author maitha.manyala [at] gmail.com
 * @ngdoc function
 * @name majiApp.controller:TaskTypesCtrl
 * @description
 * # TaskTypesCtrl
 * Controller of the TaskTypesCtrl
 */

app.controller('TaskTypesCtrl', function ($scope, $http, appService, $cookieStore, $state, $mdDialog, $mdToast, $animate, $rootScope) {
    //get config
    var config = appService.getCofig();
    $scope.params = {};
    $scope.params.page = 1;
    $scope.params.size = 10;

    //search filter
    $scope.searchFilter = {};
    $scope.searchFilter.text = '';

    //listen on zone added
    $scope.$on('onReloadPageData', function (event) {
        $scope.getPageData(1);
    });

    //handle pagination
    $scope.pageChanged = function (newPage) {
        $scope.getPageData(newPage);
    };

    $scope.getPageData = function (newPage) {
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
        appService.getTaskTypes(request).success(function (response) {
            $scope.errorOccured = false;
            $scope.taskTypes = response.payload.content;
            $scope.totalRecords = response.payload.totalElements; //to change this
            $state.go('task-types');
        }).error(function (data, status) {
            if (status === 401) {
                $state.go('session');
                $scope.message = data.message;
            } else {
                $scope.errorOccured = true;
                $scope.errorMsg = data.message;
                $state.go('task-types');
            }
        });
    };

    //load page data
    $scope.getPageData(1);

    $scope.seach = function () {
        $scope.getPageData(1);
    };
});