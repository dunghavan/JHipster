'use strict';

describe('Controller Tests', function() {

    describe('LandingPage Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockLandingPage, MockTheme, MockOrganization, MockLoginType;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockLandingPage = jasmine.createSpy('MockLandingPage');
            MockTheme = jasmine.createSpy('MockTheme');
            MockOrganization = jasmine.createSpy('MockOrganization');
            MockLoginType = jasmine.createSpy('MockLoginType');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'LandingPage': MockLandingPage,
                'Theme': MockTheme,
                'Organization': MockOrganization,
                'LoginType': MockLoginType
            };
            createController = function() {
                $injector.get('$controller')("LandingPageDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'wifiMgmtApp:landingPageUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
