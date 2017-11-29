(function() {
    'use strict';

    angular
        .module('wifiMgmtApp')
        .controller('LandingPageMySuffixDeleteController',LandingPageMySuffixDeleteController);

    LandingPageMySuffixDeleteController.$inject = ['$uibModalInstance', 'entity', 'LandingPage'];

    function LandingPageMySuffixDeleteController($uibModalInstance, entity, LandingPage) {
        var vm = this;

        vm.landingPage = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            LandingPage.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
