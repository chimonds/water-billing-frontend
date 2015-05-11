'use strict';

describe('Controller: PotentialCutOffCtrl', function () {

  // load the controller's module
  beforeEach(module('equismsApp'));

  var PotentialCutOffCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PotentialCutOffCtrl = $controller('PotentialCutOffCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
