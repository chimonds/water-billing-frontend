'use strict';

/**
 * @ngdoc function
 * @name billingApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the DashboardCtrl
 */
app.controller('DashboardCtrl', function ($scope,$rootScope, $cookieStore, $location, $window) {

  $scope.loadPaymentBillsChart = function () {
    //"#01579B"
    //color: "#03A9F4",
    $scope.paymentsBillsChart = {};
    $scope.paymentsBillsChart.options = {chart: {type: 'line'}};
    $scope.paymentsBillsChart.title = {'text': 'Bills vs Payments'};
    $scope.paymentsBillsChart.loading = false;
    $scope.paymentsBillsChart.series = [
      {
        name: 'Payments',  data: [10, 15, 12, 8, 7, 80,10, 15, 12, 8, 7, 80,4, 20, 12, 3, 40, 30,10, 15, 12, 8, 7, 80]
      },
      {
        name: 'Bills', data: [4, 20, 12, 3, 40, 30,10, 15, 12, 8, 7, 80,4, 20, 12, 3, 40, 30,10, 15, 12, 8, 7, 80]
      },
      {
        name: 'Cut off Fee', data: [4, 60, 12, 80, 40, 30,10, 15, 12, 6, 7, 40,4, 20, 18, 3, 40, 30,10, 15, 12, 8, 7, 80]
      },



    ];
    console.log( $scope.paymentsBillsChart.series);
    $scope.paymentsBillsChart.xAxis = {
      categories: ['Jan 2015', 'Feb 2015', 'Mar 2015', 'Apr 2015', 'May 2015', 'Jun 2015','Jan 2015', 'Feb 2015', 'Mar 2015', 'Apr 2015', 'May 2015', 'Jun 2015','Jan 2015', 'Feb 2015', 'Mar 2015', 'Apr 2015', 'May 2015', 'Jun 2015','Jan 2015', 'Feb 2015', 'Mar 2015', 'Apr 2015', 'May 2015', 'Jun 2015']
    };

    $scope.paymentsBillsChart.yAxis = {
      title: {
        text: 'Amount (KES)'
      }
    };
  };

  $scope.loadPaymentBillsPie = function () {
    $scope.paymentsBillsPie = {};
    $scope.paymentsBillsPie.plotOptions= {
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
                ['Payments',   4,],
                ['Bills',       10],
              ]
        //color: "#03A9F4", data: [8000]

      }


    ];

  };


  $scope.loadPaymentBillsChart();
  $scope.loadPaymentBillsPie();

});
