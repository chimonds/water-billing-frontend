'use strict';

/**
 * @ngdoc function
 * @name billingApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the DashboardCtrl
 */
app.controller('DashboardCtrl', function ($scope, $http, appService, $cookieStore, $state, $mdDialog, $mdToast, $animate, $rootScope) {

  $scope.loadPaymentBillsChart = function () {
    //"#01579B"
    //color: "#03A9F4",
    $scope.paymentsBillsChart = {};
    $scope.paymentsBillsChart.options = {chart: {type: 'line'}};
    $scope.paymentsBillsChart.title = {'text': 'Bill Items vs Payment Items'};
    $scope.paymentsBillsChart.loading = true;
    $scope.paymentsBillsChart.series = $scope.billsPaymentsLineGraph.series;
    $scope.paymentsBillsChart.xAxis = {};
    $scope.paymentsBillsChart.xAxis.categories = $scope.billsPaymentsLineGraph.xAxisMeta.items;


    console.log($scope.paymentsBillsChart.xAxis);

    $scope.paymentsBillsChart.yAxis = {
      title: {
        text: 'Amount (KES)'
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
    $scope.paymentsBillsChart.loading = false;
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
