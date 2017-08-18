(function() {
    'use strict';

    angular
        .module('demoAngular1XApp')
        .controller('DeviceMySuffixDetailController', DeviceMySuffixDetailController);

    DeviceMySuffixDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Device', 'Model'];

    function DeviceMySuffixDetailController($scope, $rootScope, $stateParams, previousState, entity, Device, Model) {
        var vm = this;

        vm.devices = [];

        vm.devices = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('demoAngular1XApp:deviceUpdate', function(event, result) {
            vm.devices = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
