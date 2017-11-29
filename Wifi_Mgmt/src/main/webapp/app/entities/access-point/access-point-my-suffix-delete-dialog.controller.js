(function() {
    'use strict';

    angular
        .module('wifiMgmtApp')
        .controller('AccessPointMySuffixDeleteController',AccessPointMySuffixDeleteController);

    AccessPointMySuffixDeleteController.$inject = ['$uibModalInstance', 'entity', 'AccessPoint'];

    function AccessPointMySuffixDeleteController($uibModalInstance, entity, AccessPoint) {
        var vm = this;

        vm.accessPoint = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            AccessPoint.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
