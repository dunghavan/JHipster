(function() {
    'use strict';

    angular
        .module('demoAngular1XApp')
        .controller('ModelMySuffixDeleteController',ModelMySuffixDeleteController);

    ModelMySuffixDeleteController.$inject = ['$uibModalInstance', 'entity', 'Model'];

    function ModelMySuffixDeleteController($uibModalInstance, entity, Model) {
        var vm = this;

        vm.model = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Model.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
