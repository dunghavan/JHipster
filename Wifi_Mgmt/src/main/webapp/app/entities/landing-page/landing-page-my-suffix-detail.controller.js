(function() {
    'use strict';

    angular
        .module('wifiMgmtApp')
        .controller('LandingPageMySuffixDetailController', LandingPageMySuffixDetailController);

    LandingPageMySuffixDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'LandingPage', 'LoginType', 'Theme', 'Organization'];

    function LandingPageMySuffixDetailController($scope, $rootScope, $stateParams, previousState, entity, LandingPage, LoginType, Theme, Organization) {
        var vm = this;

        vm.landingPage = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('wifiMgmtApp:landingPageUpdate', function(event, result) {
            vm.landingPage = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
