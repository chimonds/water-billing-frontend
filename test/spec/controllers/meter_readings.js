'use strict';

describe('Controller: MeterReadingsCtrl', function () {

  // load the controller's module
  beforeEach(module('majiApp'));

  var MeterReadingsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MeterReadingsCtrl = $controller('MeterReadingsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
