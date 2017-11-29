(function() {
    'use strict';

    angular
        .module('wifiMgmtApp')
        .controller('LoginTypeMySuffixDeleteController',LoginTypeMySuffixDeleteController);

    LoginTypeMySuffixDeleteController.$inject = ['$uibModalInstance', 'entity', 'LoginType'];

    function LoginTypeMySuffixDeleteController($uibModalInstance, entity, LoginType) {
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
