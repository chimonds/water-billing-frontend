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

    //Getting billing months
    appService.getBillingMonths().success(function (response) {
        $scope.billingMonths = response.payload;
    }).error(function (data, status) {
        $state.go('session');
    });

    //get schemes
    appService.getSchemesList().success(function (response) {
        $scope.schemes = response.payload;
    }).error(function (data, status) {
        $state.go('session');
    });


    //get schemes
    appService.getMeterReaders().success(function (response) {
        $scope.users = response.payload;
    }).error(function (data, status) {
        $state.go('session');
    });

    //Load zones
    $scope.getSchemeZones = function () {
        $scope.zones = {};
        $scope.form.zoneId = "";

        var request = {};
        request.schemeId = $scope.form.schemeId;
        appService.getZonesByScheme(request).success(function (response) {
            $scope.zones = response.payload;
        }).error(function (data, status) {
            $state.go('session');
        });
    };


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

    $scope.form = {};
    $scope.generate = function (form) {
        $scope.form = form;
        $scope.getData(1);
    };

    //handle pagination
    $scope.pageChanged = function (newPage) {
        $scope.getData(newPage);
    };

    $scope.getData = function (newPage) {
        newPage--;
        var request = $scope.form;
        request.page = newPage;
        request.size = 1;


        //set search filter

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
                $scope.meterReadings = {};
                $scope.totalMeterReadings = 0;
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
            $scope.showImage = true;
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


    $scope.editDialog = function (index) {
        $scope.meterReading = $scope.meterReadings[index];
        $mdDialog.show({
            controller: EditDialogController,
            templateUrl: 'views/template/meter_reading_edit.html',
            resolve: {
                meterReading: function () {
                    return $scope.meterReading;
                }
            }
        });
    };

    function EditDialogController($scope, $mdDialog, $rootScope, meterReading, appService) {
        var config = appService.getCofig();
        $scope.myForm = {};
        $scope.reading = meterReading;

        $scope.form = meterReading;

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.update = function (form) {
            var myForm = $scope.myForm.object;
            if (myForm.$invalid === false) {
                //good to go
                $scope.errorOccured = true;
                $scope.errorClass = config.cssAlertInfo;
                $scope.errorMsg = config.msgSendingData;

                var meterReadingId = $scope.reading.meterReadingId;
                var request = {};
                request.currentReading = form.currentReading;

                console.log(request);

                //send request
                appService.updateMeterReading(request, meterReadingId).success(function (response) {
                    $scope.errorOccured = true;
                    $scope.errorClass = config.cssAlertSucess;
                    $scope.errorMsg = response.message;
                    //notify roles page to reload data
                    $rootScope.$broadcast('onReloadPageData');

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