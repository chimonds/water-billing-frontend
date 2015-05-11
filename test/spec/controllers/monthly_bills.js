'use strict';

describe('Controller: MonthlyBillsCtrl', function () {

  // load the controller's module
  beforeEach(module('equismsApp'));

  var MonthlyBillsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MonthlyBillsCtrl = $controller('MonthlyBillsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
