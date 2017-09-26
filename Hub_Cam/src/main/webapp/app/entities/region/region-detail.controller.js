(function() {
    'use strict';

    angular
        .module('hubCamApp')
        .controller('RegionDetailController', RegionDetailController);

    RegionDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Region', 'Camera', 'Organization'];

    function RegionDetailController($scope, $rootScope, $stateParams, previousState, entity, Region, Camera, Organization) {
        var vm = this;

        vm.region = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('hubCamApp:regionUpdate', function(event, result) {
            vm.region = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
