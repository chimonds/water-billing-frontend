'use strict';

describe('Controller: StatementCtrl', function () {

  // load the controller's module
  beforeEach(module('equismsApp'));

  var StatementCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StatementCtrl = $controller('StatementCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
