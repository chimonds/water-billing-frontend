
    // Left Sidebar Controller
    app.controller('SidebarCtrl', function($scope, $timeout, $mdSidenav) {
      $scope.toggleMenu = function() {
        $mdSidenav('left').toggle();
      };

      $scope.menus =[
        {
          'category': 'Main',
          'items': [
            {'title': 'Dashboard', 'state': 'dashboard', 'icon': 'icon-grid'},
            {'title': 'Consumers', 'state': 'consumers', 'icon': 'icon-users'},
            {'title': 'Accounts', 'state': 'accounts', 'icon': 'icon-share'},
            {'title': 'Payments', 'state': 'payments', 'icon': 'icon-wallet'},
            {'title': 'M-PESA', 'state': 'mpesa', 'icon': 'icon-wallet'},
            {'title': 'PostBank', 'state': 'postbank', 'icon': 'icon-wallet'},
            {'title': 'Billing', 'state': 'billing', 'icon': 'icon-calculator'},
            {'title': 'SMS', 'state': 'sms', 'icon': 'icon-envelope'},
            {'title': 'Meters', 'state': 'meters', 'icon': 'icon-compass'}]
        },
        {
          'category': 'Billing Setups',
          'items': [
            {'title': 'Billing Months', 'state': 'billing_months', 'icon': 'icon-calendar'},
            {'title': 'Locations', 'state': 'locations', 'icon': 'icon-pointer'},
            {'title': 'Zones', 'state': 'zones', 'icon': 'icon-cursor-move'}]
        },
        {
          'category': 'Reports',
          'items': [
            {'title': 'Accounts Receivable', 'state': 'balances', 'icon': 'icon-bar-chart'},
            {'title': 'Credit Balances', 'state': 'credit_balances', 'icon': 'icon-bar-chart'},
            {'title': 'Meter Readings', 'state': 'meter_readings', 'icon': 'icon-bar-chart'},
            {'title': 'Meter Stops', 'state': 'meter_stops', 'icon': 'icon-bar-chart'},
            {'title': 'Negative Readings', 'state': 'negative_readings', 'icon': 'icon-bar-chart'},
            {'title': 'Billed Amount', 'state': 'billed_amount', 'icon': 'icon-bar-chart'},
            {'title': 'Billing Checklist', 'state': 'billing_checklist', 'icon': 'icon-bar-chart'},
            {'title': 'Field Card', 'state': 'field_card', 'icon': 'icon-bar-chart'},

            {'title': 'Payments', 'state': 'payments_report', 'icon': 'icon-bar-chart'},
            {'title': 'Billing Summary', 'state': 'billing_summary', 'icon': 'icon-bar-chart'},
            {'title': 'Potential Cut Off', 'state': 'potential_cut_off', 'icon': 'icon-bar-chart'},
            {'title': 'Monthly Bills', 'state': 'monthly_bills', 'icon': 'icon-bar-chart'},
            {'title': 'Ageing', 'state': 'ageing', 'icon': 'icon-bar-chart'},
            //{'title': 'WARIS', 'state': 'waris', 'icon': 'icon-bar-chart'}
          ]
        },
        {
          'category':'Administration',
          'items':[
            {'title':'Users', 'state':'users','icon':'icon-user'},
            {'title':'Roles', 'state':'roles','icon':'icon-lock-open'},
            {'title':'Settings', 'state':'settings','icon':'icon-settings'},
            {'title':'Change Password', 'state':'my_profile','icon':'icon-lock'}]
        }
      ];

        $scope.close = function() {
            $mdSidenav('left').close();
        };
    });
