(function() {
    'use strict';

    angular
        .module('demoAngular1XApp')
        .controller('DeviceMySuffixDialogController', DeviceMySuffixDialogController);

    DeviceMySuffixDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Device', 'Model'];

    function DeviceMySuffixDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Device, Model) {
        var vm = this;

        vm.device = entity;
        vm.clear = clear;
        vm.save = save;
        vm.models = Model.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            console.log('DeviceMySuffixDialogController: Ham save trong new Device'); //Dung Add
            vm.isSaving = true;
            if (vm.device.id !== null) {
                Device.update(vm.device, onSaveSuccess, onSaveError);
            } else {
                Device.save(vm.device, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('demoAngular1XApp:deviceUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
