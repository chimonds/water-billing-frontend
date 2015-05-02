'use strict';

describe('Controller: ReportMeterStopsCtrl', function () {

  // load the controller's module
  beforeEach(module('equismsApp'));

  var ReportMeterStopsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ReportMeterStopsCtrl = $controller('ReportMeterStopsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
