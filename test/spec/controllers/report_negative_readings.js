'use strict';

describe('Controller: ReportNegativeReadingsCtrl', function () {

  // load the controller's module
  beforeEach(module('equismsApp'));

  var ReportNegativeReadingsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ReportNegativeReadingsCtrl = $controller('ReportNegativeReadingsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
