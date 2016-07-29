'use strict';

/**
 * @ngdoc overview
 * @name majiApp
 * @description
 * # majiApp
 *
 * Main module of the application.
 */
var app = angular
  .module('majiApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    // 'ngTouch',
    'ngMaterial',
    'siTable',
    'ngMessages',
    'chart.js',
    // 'ui.bootstrap.datetimepicker',
    'ui.router',
    'angularUtils.directives.dirPagination',
    'angular-loading-bar',
    'angularMoment',
    'highcharts-ng',
    'ngCsv',
    'ngTagsInput',
    'ngFileUpload'
  ])
  .config(function ($stateProvider, $urlRouterProvider, $mdThemingProvider, $httpProvider, paginationTemplateProvider) {

    // Allow Cross Domain
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    //paginationTemplateProvider.setPath('bower_components/angular-utils-pagination/dirPagination.tpl.html');
    paginationTemplateProvider.setPath('views/dirPagination.tpl.html');


    $urlRouterProvider.otherwise('/login');

    //var requireLogin = { requireLogin: true };
    // Now set up the states
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl',
        data: {
          requireLogin: true
        }
      })

      .state('users', {
        url: '/users',
        templateUrl: 'views/users.html',
        controller: 'UsersCtrl',
        data: {
          requireLogin: true
        }
      })
      .state('settings', {
        url: '/settings',
        templateUrl: 'views/settings.html',
        controller: 'SettingsCtrl',
        data: {
          requireLogin: true
        }
      })
      .state('roles', {
        url: '/roles',
        templateUrl: 'views/roles.html',
        controller: 'RolesCtrl',
        data: {
          requireLogin: true
        }
      })
      .state('session', {
        url: '/session',
        templateUrl: 'views/logout.html',
        controller: 'SessionCtrl',
        data: {
          requireLogin: false
        }
      })
      .state('logout', {
        url: '/logout',
        //templateUrl: 'views/users.html',
        controller: 'LogoutCtrl',
        data: {
          requireLogin: false
        }
      })
      .state('zones', {
        url: '/zones',
        templateUrl: 'views/zones.html',
        controller: 'ZonesCtrl',
        data: {
          requireLogin: true
        }
      })
      .state('categories', {
        url: '/categories',
        templateUrl: 'views/accountCategories.html',
        controller: 'CategoriesCtrl',
        data: {
          requireLogin: true
        }
      })
      .state('locations', {
        url: '/locations',
        templateUrl: 'views/locations.html',
        controller: 'LocationsCtrl',
        data: {
          requireLogin: true
        }
      })
      .state('meters', {
        url: '/meters',
        templateUrl: 'views/meters.html',
        controller: 'MetersCtrl',
        data: {
          requireLogin: true
        }
      })

      .state('billing_months', {
        url: '/billing_months',
        templateUrl: 'views/billing_months.html',
        controller: 'BillingMonthsCtrl',
        data: {
          requireLogin: true
        }
      })
      .state('bill_item_types', {
        url: '/bill_item_types',
        templateUrl: 'views/bill_item_types.html',
        controller: 'BillItemTypesCtrl',
        data: {
          requireLogin: true
        }
      })
      .state('consumers', {
        url: '/consumers',
        templateUrl: 'views/consumers.html',
        controller: 'ConsumersCtrl',
        data: {
          requireLogin: true
        }
      })
      .state('accounts', {
        url: '/accounts',
        templateUrl: 'views/accounts.html',
        controller: 'AccountsCtrl',
        data: {
          requireLogin: true
        }
      })
      .state('account', {
        url: '/accounts/{accountId}',
        templateUrl: 'views/accounts.detail.html',
        controller: 'AccountsDetailCtrl',
        data: {
          requireLogin: true
        }
      })
      .state('statement', {
        url: '/statement/{accountId}',
        templateUrl: 'views/reports/statement.html',
        controller: 'StatementCtrl',
        data: {
          requireLogin: true
        }
      })
      .state('billing', {
        url: '/billing',
        templateUrl: 'views/billing.html',
        controller: 'BillingCtrl',
        data: {
          requireLogin: true
        }
      })
      .state('sms', {
        url: '/sms/outbox',
        templateUrl: 'views/sms.html',
        controller: 'SmsCtrl',
        data: {
          requireLogin: true
        }
      })
      .state('sms_templates', {
        url: '/sms/templates',
        templateUrl: 'views/sms_templates.html',
        controller: 'SmsTemplatesCtrl',
        data: {
          requireLogin: true
        }
      })
      .state('balances', {
        url: '/balances',
        templateUrl: 'views/reports/balances.html',
        controller: 'BalancesCtrl',
        data: {
          requireLogin: true
        }
      })

      .state('bills', {
        url: '/monthly_bill_report',
        templateUrl: 'views/reports/monthly_bill_report.html',
        controller: 'MonthlyBillReportCtrl',
        data: {
          requireLogin: true
        }
      })

      .state('credit_balances', {
        url: '/credit_balances',
        templateUrl: 'views/reports/credit_balances.html',
        controller: 'ReportCreditBalancesCtrl',
        data: {
          requireLogin: true
        }
      })

      .state('customers_without_phones', {
        url: '/customers_without_phone_numbers',
        templateUrl: 'views/reports/customers_without_phone_numbers.html',
        controller: 'ReportCustomersWithoutPhoneNumbersCtrl',
        data: {
          requireLogin: true
        }
      })

      .state('remote_readings', {
        url: '/remote_readings',
        templateUrl: 'views/meter_readings.html',
        controller: 'RemoteReadingsCtrl',
        data: {
          requireLogin: true
        }
      })

      .state('meter_readings', {
        url: '/meter_readings',
        templateUrl: 'views/reports/meter_readings.html',
        controller: 'ReportMeterReadingsCtrl',
        data: {
          requireLogin: true
        }
      })

      .state('report_accounts', {
        url: '/report_accounts',
        templateUrl: 'views/reports/accounts.html',
        controller: 'ReportAccountsCtrl',
        data: {
          requireLogin: true
        }
      })
      .state('meter_stops', {
        url: '/meter_stops',
        templateUrl: 'views/reports/meter_stops.html',
        controller: 'ReportMeterStopsCtrl',
        data: {
          requireLogin: true
        }
      })
      .state('negative_readings', {
        url: '/negative_readings',
        templateUrl: 'views/reports/negative_readings.html',
        controller: 'ReportNegativeReadingsCtrl',
        data: {
          requireLogin: true
        }
      })
      .state('billed_amount', {
        url: '/billed_amount',
        templateUrl: 'views/reports/billed_amount.html',
        controller: 'ReportBilledAmountCtrl',
        data: {
          requireLogin: true
        }
      })
      .state('billing_checklist', {
        url: '/billing_checklist',
        templateUrl: 'views/reports/billing_checklist.html',
        controller: 'ReportBillingChecklistCtrl',
        data: {
          requireLogin: true
        }
      })
      .state('field_card', {
        url: '/field_card',
        templateUrl: 'views/reports/field_card.html',
        controller: 'ReportFieldCardCtrl',
        data: {
          requireLogin: true
        }
      })
      .state('payments_report', {
        url: '/payments_report',
        templateUrl: 'views/reports/payments.html',
        controller: 'PaymentsReportCtrl',
        data: {
          requireLogin: true
        }
      })
      .state('billing_summary', {
        url: '/billing_summary',
        templateUrl: 'views/reports/billing_summary.html',
        controller: 'BillingSummaryCtrl',
        data: {
          requireLogin: true
        }
      })
      .state('potential_cut_off', {
        url: '/potential_cut_off',
        templateUrl: 'views/reports/potential_cut_off.html',
        controller: 'PotentialCutOffCtrl',
        data: {
          requireLogin: true
        }
      })
      .state('accounts_not_billed', {
        url: '/accounts_not_billed',
        templateUrl: 'views/reports/accounts_not_billed.html',
        controller: 'AccountsNotBilledCtrl',
        data: {
          requireLogin: true
        }
      })
      .state('monthly_bills', {
        url: '/monthly_bills',
        templateUrl: 'views/reports/monthly_bills.html',
        controller: 'ReportMonthlyBillsCtrl',
        data: {
          requireLogin: true
        }
      })
      .state('ageing', {
        url: '/ageing',
        templateUrl: 'views/reports/ageing.html',
        controller: 'AgeingCtrl',
        data: {
          requireLogin: true
        }
      })
      .state('my_profile', {
        url: '/my_profile',
        templateUrl: 'views/my_profile.html',
        controller: 'MyProfileCtrl',
        data: {
          requireLogin: true
        }
      })
      .state('waris', {
        url: '/waris',
        templateUrl: 'views/reports/waris.html',
        controller: 'WarisCtrl',
        data: {
          requireLogin: true
        }
      })
      .state('mpesa', {
        url: '/mpesa',
        templateUrl: 'views/mpesa.html',
        controller: 'MpesaCtrl',
        data: {
          requireLogin: true
        }
      })
      .state('postbank', {
        url: '/postbank',
        templateUrl: 'views/postbank.html',
        controller: 'PostBankCtrl',
        data: {
          requireLogin: true
        }
      })
      .state('postbankFile', {
        url: '/postbank/{fileId}',
        templateUrl: 'views/postbank_transactions.html',
        controller: 'PostBankTransactionsCtrl',
        data: {
          requireLogin: true
        }
      })
      .state('payments', {
        url: '/payments',
        templateUrl: 'views/payments.html',
        controller: 'PaymentsCtrl',
        data: {
          requireLogin: true
        }
      });


    // $mdThemingProvider.definePalette('amazingPaletteName', {
    //     '50': 'ffebee',
    //     '100': 'ffcdd2',
    //     '200': 'ef9a9a',
    //     '300': 'e57373',
    //     '400': 'ef5350',
    //     '500': 'eb6706',
    //     '600': 'e53935',
    //     '700': 'd32f2f',
    //     '800': 'c62828',
    //     '900': 'b71c1c',
    //     'A100': 'ff8a80',
    //     'A200': 'ff5252',
    //     'A400': 'ff1744',
    //     'A700': 'd50000',
    //     'contrastDefaultColor': 'light', // whether, by default, text (contrast)
    //     // on this palette should be dark or light
    //     'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
    //         '200', '300', '400', 'A100'
    //     ],
    //     'contrastLightColors': undefined // could also specify this if default was 'dark'
    // });


    // $mdThemingProvider.definePalette('amazingPaletteName', {
    //   '50': 'ffebee',
    //   '100': 'ffcdd2',
    //   '200': 'ef9a9a',
    //   '300': 'e57373',
    //   '400': 'ef5350',
    //   '500': 'eb6706',
    //   '600': 'e53935',
    //   '700': 'd32f2f',
    //   '800': 'c62828',
    //   '900': 'b71c1c',
    //   'A100': 'ff8a80',
    //   'A200': 'ff5252',
    //   'A400': 'ff1744',
    //   'A700': 'd50000',
    //   'contrastDefaultColor': 'light', // whether, by default, text (contrast)
    //   // on this palette should be dark or light
    //   'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
    //     '200', '300', '400', 'A100'
    //   ],
    //   'contrastLightColors': undefined // could also specify this if default was 'dark'
    // });

    $mdThemingProvider.theme('default')
    .primaryColor('blue');

    //teal
    // $mdThemingProvider.theme('default')
    //     .primaryColor('amazingPaletteName')
  });

app.run(function ($rootScope, $state, $location, $cookieStore) {

  $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
    var requireLogin = toState.data.requireLogin;
    var userInfo = $cookieStore.get('userInfo');

    if (typeof userInfo === 'undefined') {
    } else {
      $rootScope.currentUser = userInfo;
      $rootScope.showMainToolbar = true;

      var permissions = $cookieStore.get('permissions');
      angular.forEach(permissions, function (permission) {
        $rootScope[permission] = true;
      });
    }

    if (requireLogin && typeof $rootScope.currentUser === 'undefined') {
      event.preventDefault();
      $state.go('login');
    }
  });
});
