(function() {
    'use strict';

    angular
        .module('demoAngular1XApp')
        .controller('WLANGroupMySuffixDetailController', WLANGroupMySuffixDetailController);

    WLANGroupMySuffixDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'WLANGroup', 'WLANConfig'];

    function WLANGroupMySuffixDetailController($scope, $rootScope, $stateParams, previousState, entity, WLANGroup, WLANConfig) {
        var vm = this;

        vm.wLANGroup = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('demoAngular1XApp:wLANGroupUpdate', function(event, result) {
            vm.wLANGroup = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
