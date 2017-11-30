(function() {
    'use strict';

    angular
        .module('wifiMgmtApp')
        .controller('LandingPageDetailController', LandingPageDetailController);

    LandingPageDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'LandingPage', 'Theme', 'Organization', 'LoginType'];

    function LandingPageDetailController($scope, $rootScope, $stateParams, previousState, entity, LandingPage, Theme, Organization, LoginType) {
        var vm = this;

        vm.landingPage = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('wifiMgmtApp:landingPageUpdate', function(event, result) {
            vm.landingPage = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
