'use strict';

/**
 * @ngdoc overview
 * @name billingApp
 * @description
 * # billingApp
 *
 * Main module of the application.
 */
var app = angular
    .module('equismsApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ngMaterial',
        'siTable',
        'ngMessages',
        'chart.js',
        'ui.bootstrap.datetimepicker',
        'ui.router',
        'angularUtils.directives.dirPagination',
        'angular-loading-bar',
        'angularMoment',
        'highcharts-ng',
        'ngTagsInput'
    ])
    .config(function($stateProvider, $urlRouterProvider, $mdThemingProvider, $httpProvider, paginationTemplateProvider) {

        // Allow Cross Domain
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        paginationTemplateProvider.setPath('bower_components/angular-utils-pagination/dirPagination.tpl.html');


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
          .state('billing', {
            url: '/billing',
            templateUrl: 'views/billing.html',
            controller: 'BillingCtrl',
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

          .state('meter_readings', {
            url: '/meter_readings',
            templateUrl: 'views/reports/meter_readings.html',
            controller: 'ReportMeterReadingsCtrl',
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


                $mdThemingProvider.definePalette('amazingPaletteName', {
            '50': 'ffebee',
            '100': 'ffcdd2',
            '200': 'ef9a9a',
            '300': 'e57373',
            '400': 'ef5350',
            '500': 'eb6706',
            '600': 'e53935',
            '700': 'd32f2f',
            '800': 'c62828',
            '900': 'b71c1c',
            'A100': 'ff8a80',
            'A200': 'ff5252',
            'A400': 'ff1744',
            'A700': 'd50000',
            'contrastDefaultColor': 'light', // whether, by default, text (contrast)
            // on this palette should be dark or light
            'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
                '200', '300', '400', 'A100'
            ],
            'contrastLightColors': undefined // could also specify this if default was 'dark'
        });


        $mdThemingProvider.theme('default')
            .primaryColor('amazingPaletteName');
    //.primaryColor('blue');

        //teal
        // $mdThemingProvider.theme('default')
        //     .primaryColor('amazingPaletteName')


    });

app.run(function($rootScope, $state, $location, $cookieStore) {

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
        var requireLogin = toState.data.requireLogin;
        var userInfo = $cookieStore.get('userInfo');


        if (typeof userInfo === 'undefined') {} else {
            $rootScope.currentUser = userInfo;
            $rootScope.showMainToolbar = true;
        }

        if (requireLogin && typeof $rootScope.currentUser === 'undefined') {
            event.preventDefault();
            $state.go('login');
        }
    });
});
