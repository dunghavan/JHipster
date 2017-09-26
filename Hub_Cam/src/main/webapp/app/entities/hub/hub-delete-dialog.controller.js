(function() {
    'use strict';

    angular
        .module('hubCamApp')
        .controller('HubDeleteController',HubDeleteController);

    HubDeleteController.$inject = ['$uibModalInstance', 'entity', 'Hub'];

    function HubDeleteController($uibModalInstance, entity, Hub) {
        var vm = this;

        vm.hub = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Hub.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
