'use strict';

describe('Controller: MyProfileCtrl', function () {

  // load the controller's module
  beforeEach(module('equismsApp'));

  var MyProfileCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MyProfileCtrl = $controller('MyProfileCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
