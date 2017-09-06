(function() {
    'use strict';

    angular
        .module('demoAngular1XApp')
        .controller('ModelMySuffixDialogController', ModelMySuffixDialogController);

    ModelMySuffixDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Model'];

    function ModelMySuffixDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Model) {
        var vm = this;

        vm.model = entity;
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
            if (vm.model.id !== null) {
                Model.update(vm.model, onSaveSuccess, onSaveError);
            } else {
                Model.save(vm.model, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('demoAngular1XApp:modelUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
