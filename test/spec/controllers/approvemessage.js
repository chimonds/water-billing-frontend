'use strict';

describe('Controller: ApprovemessageCtrl', function () {

  // load the controller's module
  beforeEach(module('billingApp'));

  var ApprovemessageCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ApprovemessageCtrl = $controller('ApprovemessageCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
