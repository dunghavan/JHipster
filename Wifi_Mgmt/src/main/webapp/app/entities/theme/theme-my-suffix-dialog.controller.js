(function() {
    'use strict';

    angular
        .module('wifiMgmtApp')
        .controller('ThemeMySuffixDialogController', ThemeMySuffixDialogController);

    ThemeMySuffixDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Theme'];

    function ThemeMySuffixDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Theme) {
        var vm = this;

        vm.theme = entity;
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
            if (vm.theme.id !== null) {
                Theme.update(vm.theme, onSaveSuccess, onSaveError);
            } else {
                Theme.save(vm.theme, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('wifiMgmtApp:themeUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
