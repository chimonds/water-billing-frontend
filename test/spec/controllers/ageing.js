'use strict';

describe('Controller: AgeingCtrl', function () {

  // load the controller's module
  beforeEach(module('equismsApp'));

  var AgeingCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AgeingCtrl = $controller('AgeingCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
