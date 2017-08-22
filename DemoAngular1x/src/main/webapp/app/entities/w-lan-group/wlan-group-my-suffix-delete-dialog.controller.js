(function() {
    'use strict';

    angular
        .module('demoAngular1XApp')
        .controller('WLANGroupMySuffixDeleteController',WLANGroupMySuffixDeleteController);

    WLANGroupMySuffixDeleteController.$inject = ['$uibModalInstance', 'entity', 'WLANGroup'];

    function WLANGroupMySuffixDeleteController($uibModalInstance, entity, WLANGroup) {
        var vm = this;

        vm.wLANGroup = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            WLANGroup.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
