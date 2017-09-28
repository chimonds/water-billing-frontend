'use strict';

/**
 * @ngdoc function
 * @name majiApp.controller:MeterReadingsCtrl
 * @description
 * # MeterReadingsCtrl
 * Controller of the majiApp
 */

app.controller('RemoteReadingsCtrl', function ($scope, $http, appService, $cookieStore, $state, $mdDialog, $mdToast, $animate, $rootScope) {
    //get config
    var config = appService.getCofig();
    $scope.params = {};
    $scope.params.page = 1;
    $scope.params.size = 2;

    //search filter
    $scope.searchFilter = {};
    $scope.searchFilter.text = '';

    //listen on role added
    $scope.$on('onReloadData', function (event) {
        $scope.getData(1);
    });

    //handle pagination
    $scope.pageChanged = function (newPage) {
        $scope.getData(newPage);
    };

    $scope.getData = function (newPage) {
        newPage--;
        var request = {};
        request.page = newPage;
        request.size = 1;


        if (typeof $scope.searchFilter.text === 'undefined') {
            $scope.searchFilter.text = '';
        }

        //set search filter
        request.filter = $scope.searchFilter.text;
        $scope.showImage = false;

        //send request
        appService.getRemoteMeterReadings(request).success(function (response) {
            $scope.errorOccured = false;
            $scope.meterReadings = response.payload.content;
            $scope.totalMeterReadings = response.payload.totalElements; //to change this

            var meterReading = response.payload.content[0];
            $scope.getImageData(meterReading);

            //$state.go('settings');
        }).error(function (data, status) {
            if (status === 401) {
                $state.go('session');
                $scope.message = data.message;
            } else {
                $scope.errorOccured = true;
                $scope.errorMsg = data.message;
                //$state.go('settings');
            }
        });
    };

    $scope.getImageData = function (meterReading) {
        var request = {};
        request.meterReadingId = meterReading.meterReadingId;

        appService.getRemoteMeterReadingImage(request).success(function (response) {
            $scope.errorOccured = false;
            $scope.image = response.payload;
            console.log($scope.image);
            $scope.showImage = true;



            //$state.go('settings');
        }).error(function (data, status) {
            if (status === 401) {
                $state.go('session');
                $scope.message = data.message;
            } else {
                $scope.errorOccured = true;
                $scope.errorMsg = data.message;
                //$state.go('settings');
            }
        });
    };

    //load users
    $scope.getData(1);

    $scope.seachOptions = function () {
        $scope.getData(1);
    };

});