(function() {
    'use strict';

    angular
        .module('demoAngular1XApp')
        .controller('WLANGroupMySuffixDialogController', WLANGroupMySuffixDialogController);

    WLANGroupMySuffixDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'WLANGroup', 'WLANConfig'];

    function WLANGroupMySuffixDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, WLANGroup, WLANConfig) {
        var vm = this;

        vm.wLANGroup = entity;
        vm.clear = clear;
        vm.save = save;
        vm.wlanconfigs = WLANConfig.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.wLANGroup.id !== null) {
                WLANGroup.update(vm.wLANGroup, onSaveSuccess, onSaveError);
            } else {
                WLANGroup.save(vm.wLANGroup, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('demoAngular1XApp:wLANGroupUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
