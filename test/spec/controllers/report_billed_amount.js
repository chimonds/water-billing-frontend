'use strict';

describe('Controller: ReportBilledAmountCtrl', function () {

  // load the controller's module
  beforeEach(module('equismsApp'));

  var ReportBilledAmountCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ReportBilledAmountCtrl = $controller('ReportBilledAmountCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
