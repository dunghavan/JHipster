(function() {
    'use strict';

    angular
        .module('wifiMgmtApp')
        .controller('LocationDetailController', LocationDetailController);

    LocationDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Location', 'Organization', 'LandingPage'];

    function LocationDetailController($scope, $rootScope, $stateParams, previousState, entity, Location, Organization, LandingPage) {
        var vm = this;

        vm.location = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('wifiMgmtApp:locationUpdate', function(event, result) {
            vm.location = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
