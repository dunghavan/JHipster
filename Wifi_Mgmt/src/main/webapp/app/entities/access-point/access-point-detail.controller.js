(function() {
    'use strict';

    angular
        .module('wifiMgmtApp')
        .controller('AccessPointDetailController', AccessPointDetailController);

    AccessPointDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'AccessPoint', 'Location'];

    function AccessPointDetailController($scope, $rootScope, $stateParams, previousState, entity, AccessPoint, Location) {
        var vm = this;

        vm.accessPoint = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('wifiMgmtApp:accessPointUpdate', function(event, result) {
            vm.accessPoint = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
