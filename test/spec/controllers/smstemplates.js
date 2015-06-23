'use strict';

describe('Controller: SmstemplatesCtrl', function () {

  // load the controller's module
  beforeEach(module('majiApp'));

  var SmstemplatesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SmstemplatesCtrl = $controller('SmstemplatesCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
