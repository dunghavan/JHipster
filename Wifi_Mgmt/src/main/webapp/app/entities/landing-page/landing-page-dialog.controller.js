(function() {
    'use strict';

    angular
        .module('wifiMgmtApp')
        .controller('LandingPageDialogController', LandingPageDialogController);

    LandingPageDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'LandingPage', 'LoginType', 'Theme', 'Organization'];

    function LandingPageDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, LandingPage, LoginType, Theme, Organization) {
        var vm = this;

        vm.landingPage = entity;
        vm.clear = clear;
        vm.save = save;
        vm.logintypes = LoginType.query();
        vm.themes = Theme.query();
        vm.organizations = Organization.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.landingPage.id !== null) {
                LandingPage.update(vm.landingPage, onSaveSuccess, onSaveError);
            } else {
                LandingPage.save(vm.landingPage, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('wifiMgmtApp:landingPageUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
