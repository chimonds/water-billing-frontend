'use strict';

/**
 * @ngdoc function
 * @name majiApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the DashboardCtrl
 */
app.controller('DashboardCtrl', function ($scope, $http, appService, $cookieStore, $state, $mdDialog, $mdToast, $animate, $rootScope) {

  $scope.loadPaymentBillsChart = function () {
    $scope.paymentsBillsChart = {};
    $scope.paymentsBillsChart.credits = {enabled: false};
    $scope.paymentsBillsChart.options = {chart: {type: 'line'}};
    $scope.paymentsBillsChart.title = {'text': 'Bill Items vs Payment Items'};
    $scope.paymentsBillsChart.loading = true;
    $scope.paymentsBillsChart.series = $scope.billsPaymentsLineGraph.series;
    $scope.paymentsBillsChart.xAxis = {};
    $scope.paymentsBillsChart.xAxis.categories = $scope.billsPaymentsLineGraph.xAxisMeta.items;
    $scope.paymentsBillsChart.yAxis = {
      title: {
        text: 'Amount'
      }
    };
    $scope.paymentsBillsChart.loading = false;
  };

  $scope.loadZonesBarChart = function () {
    $scope.zonesBarChart = {};
    $scope.zonesBarChart.credits = {enabled: false};
    $scope.zonesBarChart.options = {chart: {type: 'column'}};
    $scope.zonesBarChart.title = {'text': 'Zones'};
    $scope.zonesBarChart.loading = false;
    $scope.zonesBarChart.series = $scope.stats.zonesBarGraph.series;
    $scope.zonesBarChart.xAxis = {};
    $scope.zonesBarChart.xAxis.categories = $scope.stats.zonesBarGraph.xAxisMeta.items;
    $scope.zonesBarChart.yAxis = {
      title: {
        text: 'Amount'
      }
    };
  };

  $scope.loadPaymentBillsPie = function () {
    $scope.paymentsBillsPie = {};
    $scope.paymentsBillsPie.plotOptions = {
      pie: {
        dataLabels: {
          enabled: true,
          distance: -50,
          style: {
            fontWeight: 'bold',
            color: 'white',
            textShadow: '0px 1px 2px black'
          }
        },
        startAngle: -90,
        endAngle: 90,
        center: ['50%', '75%']
      }
    };
    $scope.paymentsBillsPie.options =
    {
      chart: {
        type: 'pie',
        options3d: {
          enabled: true,
          alpha: 45
        }
      }
    };

    $scope.paymentsBillsPie.title = {'text': 'Bills vs Payments Pie'};
    $scope.paymentsBillsPie.loading = false;
    $scope.paymentsBillsPie.series = [
      {
        //name: 'Browser share',
        innerSize: '50%',
        data: [
          ['Payments', 4,],
          ['Bills', 10],
        ]
        //color: "#03A9F4", data: [8000]

      }


    ];

  };

  //$scope.loadPaymentBillsChart();
  $scope.loadPaymentBillsPie();


  //get config
  var config = appService.getCofig();


  var request = {};

  //send request
  appService.getStats(request).success(function (response) {
    console.log(response);
    $scope.stats = response.payload;

    $scope.billsPaymentsLineGraph = $scope.stats.billsPaymentsLineGraph;


    $scope.loadPaymentBillsChart();
    $scope.loadZonesBarChart();
    $state.go('dashboard');
  }).error(function (data, status) {
    if (status === 401) {
      $state.go('session');
      $scope.message = data.message;


    } else {
      //$scope.errorOccured = true;
      //$scope.errorMsg = data.message;
      //$state.go('consumers');
    }
  });


});
