(function() {
    'use strict';

    angular
        .module('demoAngular1XApp')
        .controller('WLANConfigMySuffixDetailController', WLANConfigMySuffixDetailController);

    WLANConfigMySuffixDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'WLANConfig', 'WLANGroup'];

    function WLANConfigMySuffixDetailController($scope, $rootScope, $stateParams, previousState, entity, WLANConfig, WLANGroup) {
        var vm = this;

        vm.wLANConfig = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('demoAngular1XApp:wLANConfigUpdate', function(event, result) {
            vm.wLANConfig = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
