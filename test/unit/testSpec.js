describe('MainController', function() {

    beforeEach(module("app"));

    var scope, MainController;

    beforeEach(inject(function($rootScope, $controller) {

        scope = $rootScope.$new();
        $controller('MainController', {$scope: scope});

    }));

    it('the lesson is', function() {

        expect(scope.test).toBe('test1');

    });

    /*
    var element;
    beforeEach(inject(function($compile, $rootScope) {
        $scope = $rootScope;
        element = angular.element('<div directive-name>HEY</div>');
        $compile(element)($rootScope);

    }));

    it('test this directive', function() {
        scope.digest();//important
        expect(element.html()).toBe('4');

    });

    describe('directive-name', function() {

     it('test this directive', function() {
     scope.
     expect(element.hasClass('test')).toBe(true);

     });

    });

//or


     describe("Directive", function () {
     2
     3     var $scope;
     4
     5     beforeEach(inject(function($rootScope, $compile) {
     6         $scope = $rootScope.$new();
     7         var element = angular.element("<test></test>");
     8         template = $compile(element)($scope);
     9         $scope.$digest();
     10         controller = element.controller;
     11     }));
     12
     13     it("should toogle open when toggle() is called", inject(function() {
     14         $scope.open = false;
     15         $scope.toggle();
     16         expect($scope.open).toBeTruthy();
     17         $scope.toggle();
     18         expect($scope.open).toBeFalsy();
     19     }));
     20
     21 });



     */


});