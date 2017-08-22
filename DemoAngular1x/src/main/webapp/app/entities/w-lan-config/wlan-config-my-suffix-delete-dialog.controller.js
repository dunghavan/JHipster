(function() {
    'use strict';

    angular
        .module('demoAngular1XApp')
        .controller('WLANConfigMySuffixDeleteController',WLANConfigMySuffixDeleteController);

    WLANConfigMySuffixDeleteController.$inject = ['$uibModalInstance', 'entity', 'WLANConfig'];

    function WLANConfigMySuffixDeleteController($uibModalInstance, entity, WLANConfig) {
        var vm = this;

        vm.wLANConfig = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            WLANConfig.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
