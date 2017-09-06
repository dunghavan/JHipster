(function() {
    'use strict';

    angular
        .module('demoAngular1XApp')
        .controller('DeviceMySuffixDeleteController',DeviceMySuffixDeleteController);

    DeviceMySuffixDeleteController.$inject = ['$uibModalInstance', 'entity', 'Device'];

    function DeviceMySuffixDeleteController($uibModalInstance, entity, Device) {
        var vm = this;

        vm.device = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Device.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
