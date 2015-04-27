'use strict';

describe('Controller: BalancesCtrl', function () {

  // load the controller's module
  beforeEach(module('equismsApp'));

  var BalancesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BalancesCtrl = $controller('BalancesCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
