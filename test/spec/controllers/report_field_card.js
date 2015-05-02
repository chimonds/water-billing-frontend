'use strict';

describe('Controller: ReportFieldCardCtrl', function () {

  // load the controller's module
  beforeEach(module('equismsApp'));

  var ReportFieldCardCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ReportFieldCardCtrl = $controller('ReportFieldCardCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
