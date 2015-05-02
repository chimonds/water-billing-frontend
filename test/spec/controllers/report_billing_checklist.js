'use strict';

describe('Controller: ReportBillingChecklistCtrl', function () {

  // load the controller's module
  beforeEach(module('equismsApp'));

  var ReportBillingChecklistCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ReportBillingChecklistCtrl = $controller('ReportBillingChecklistCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
