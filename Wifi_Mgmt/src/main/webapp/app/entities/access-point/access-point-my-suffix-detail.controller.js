(function() {
    'use strict';

    angular
        .module('wifiMgmtApp')
        .controller('AccessPointMySuffixDetailController', AccessPointMySuffixDetailController);

    AccessPointMySuffixDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'AccessPoint', 'Location'];

    function AccessPointMySuffixDetailController($scope, $rootScope, $stateParams, previousState, entity, AccessPoint, Location) {
        var vm = this;

        vm.accessPoint = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('wifiMgmtApp:accessPointUpdate', function(event, result) {
            vm.accessPoint = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
