'use strict';

describe('Controller: AddrolemodalCtrl', function () {

  // load the controller's module
  beforeEach(module('billingApp'));

  var AddrolemodalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddrolemodalCtrl = $controller('AddrolemodalCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
