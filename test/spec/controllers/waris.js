'use strict';

describe('Controller: WarisCtrl', function () {

  // load the controller's module
  beforeEach(module('equismsApp'));

  var WarisCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WarisCtrl = $controller('WarisCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
