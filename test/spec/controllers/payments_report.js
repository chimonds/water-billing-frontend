'use strict';

describe('Controller: PaymentsReportCtrl', function () {

  // load the controller's module
  beforeEach(module('equismsApp'));

  var PaymentsReportCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PaymentsReportCtrl = $controller('PaymentsReportCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
