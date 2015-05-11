'use strict';

describe('Controller: BillingSummaryCtrl', function () {

  // load the controller's module
  beforeEach(module('equismsApp'));

  var BillingSummaryCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BillingSummaryCtrl = $controller('BillingSummaryCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
