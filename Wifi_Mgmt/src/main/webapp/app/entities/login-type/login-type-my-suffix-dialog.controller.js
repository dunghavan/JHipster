(function() {
    'use strict';

    angular
        .module('wifiMgmtApp')
        .controller('LoginTypeMySuffixDialogController', LoginTypeMySuffixDialogController);

    LoginTypeMySuffixDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'LoginType', 'LandingPage'];

    function LoginTypeMySuffixDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, LoginType, LandingPage) {
        var vm = this;

        vm.loginType = entity;
        vm.clear = clear;
        vm.save = save;
        vm.landingpages = LandingPage.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.loginType.id !== null) {
                LoginType.update(vm.loginType, onSaveSuccess, onSaveError);
            } else {
                LoginType.save(vm.loginType, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('wifiMgmtApp:loginTypeUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
