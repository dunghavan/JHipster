(function() {
    'use strict';

    angular
        .module('wifiMgmtApp')
        .controller('OrganizationMySuffixDialogController', OrganizationMySuffixDialogController);

    OrganizationMySuffixDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Organization'];

    function OrganizationMySuffixDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Organization) {
        var vm = this;

        vm.organization = entity;
        vm.clear = clear;
        vm.save = save;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.organization.id !== null) {
                Organization.update(vm.organization, onSaveSuccess, onSaveError);
            } else {
                Organization.save(vm.organization, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('wifiMgmtApp:organizationUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
