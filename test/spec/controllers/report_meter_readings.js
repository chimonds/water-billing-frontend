'use strict';

describe('Controller: ReportMeterReadingsCtrl', function () {

  // load the controller's module
  beforeEach(module('equismsApp'));

  var ReportMeterReadingsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ReportMeterReadingsCtrl = $controller('ReportMeterReadingsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
