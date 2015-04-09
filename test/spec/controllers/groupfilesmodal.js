'use strict';

describe('Controller: GroupfilesmodalCtrl', function () {

  // load the controller's module
  beforeEach(module('billingApp'));

  var GroupfilesmodalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GroupfilesmodalCtrl = $controller('GroupfilesmodalCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
