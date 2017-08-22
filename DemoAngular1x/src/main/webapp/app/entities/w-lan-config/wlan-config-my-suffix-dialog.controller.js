(function() {
    'use strict';

    angular
        .module('demoAngular1XApp')
        .controller('WLANConfigMySuffixDialogController', WLANConfigMySuffixDialogController);

    WLANConfigMySuffixDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'WLANConfig', 'WLANGroup'];

    function WLANConfigMySuffixDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, WLANConfig, WLANGroup) {
        var vm = this;

        vm.wLANConfig = entity;
        vm.clear = clear;
        vm.save = save;
        vm.wlangroups = WLANGroup.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.wLANConfig.id !== null) {
                WLANConfig.update(vm.wLANConfig, onSaveSuccess, onSaveError);
            } else {
                WLANConfig.save(vm.wLANConfig, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('demoAngular1XApp:wLANConfigUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
