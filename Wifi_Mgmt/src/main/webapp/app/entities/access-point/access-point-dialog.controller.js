(function() {
    'use strict';

    angular
        .module('wifiMgmtApp')
        .controller('AccessPointDialogController', AccessPointDialogController);

    AccessPointDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'AccessPoint', 'Location'];

    function AccessPointDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, AccessPoint, Location) {
        var vm = this;

        vm.accessPoint = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.locations = Location.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.accessPoint.id !== null) {
                AccessPoint.update(vm.accessPoint, onSaveSuccess, onSaveError);
            } else {
                AccessPoint.save(vm.accessPoint, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('wifiMgmtApp:accessPointUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.lastActive = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
