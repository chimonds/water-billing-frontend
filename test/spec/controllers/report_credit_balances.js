'use strict';

describe('Controller: ReportCreditBalancesCtrl', function () {

  // load the controller's module
  beforeEach(module('equismsApp'));

  var ReportCreditBalancesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ReportCreditBalancesCtrl = $controller('ReportCreditBalancesCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
