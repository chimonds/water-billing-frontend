
   // Left Sidebar Controller
    app.controller('YourController', function($scope, $timeout, $mdSidenav) {
       $scope.toggleMenu = function() {
            $mdSidenav('left').toggle();
        };
    });

    // Left Sidebar Controller
    app.controller('SidebarCtrl', function($scope, $timeout, $mdSidenav) {
      $scope.menus =[
        {
          'category': 'Main',
          'items': [
            {'title': 'Dashboard', 'state': 'dashboard', 'icon': 'icon-grid'},
            {'title': 'Consumers', 'state': 'consumers', 'icon': 'icon-users'},
            {'title': 'Accounts', 'state': 'accounts', 'icon': 'icon-share'},
            {'title': 'Payments', 'state': 'payments', 'icon': 'icon-wallet'},
            {'title': 'Billing', 'state': 'billing', 'icon': 'icon-wallet'},
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
          'category':'Administration',
          'items':[
            {'title':'Users', 'state':'users','icon':'icon-user'},
            {'title':'Roles', 'state':'roles','icon':'icon-lock-open'},
            {'title':'Settings', 'state':'settings','icon':'icon-settings'}]
        }
      ];

        $scope.close = function() {
            $mdSidenav('left').close();
        };
    });
