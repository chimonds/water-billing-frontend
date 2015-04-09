'use strict';

describe('Controller: GroupfilesCtrl', function () {

  // load the controller's module
  beforeEach(module('billingApp'));

  var GroupfilesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GroupfilesCtrl = $controller('GroupfilesCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
