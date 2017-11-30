(function() {
    'use strict';

    angular
        .module('wifiMgmtApp')
        .controller('LoginTypeDeleteController',LoginTypeDeleteController);

    LoginTypeDeleteController.$inject = ['$uibModalInstance', 'entity', 'LoginType'];

    function LoginTypeDeleteController($uibModalInstance, entity, LoginType) {
        var vm = this;

        vm.loginType = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            LoginType.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
