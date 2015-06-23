'use strict';

describe('Controller: SmsCtrl', function () {

  // load the controller's module
  beforeEach(module('majiApp'));

  var SmsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SmsCtrl = $controller('SmsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
