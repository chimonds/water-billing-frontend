'use strict';

describe('Controller: EditcontactmodalCtrl', function () {

  // load the controller's module
  beforeEach(module('billingApp'));

  var EditcontactmodalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditcontactmodalCtrl = $controller('EditcontactmodalCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
