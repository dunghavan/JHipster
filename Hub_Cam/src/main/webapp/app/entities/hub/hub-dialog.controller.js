(function() {
    'use strict';

    angular
        .module('hubCamApp')
        .controller('HubDialogController', HubDialogController);

    HubDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Hub', 'Camera', 'Organization'];

    function HubDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Hub, Camera, Organization) {
        var vm = this;

        vm.hub = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.cameras = Camera.query();
        vm.organizations = Organization.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.hub.id !== null) {
                Hub.update(vm.hub, onSaveSuccess, onSaveError);
            } else {
                Hub.save(vm.hub, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('hubCamApp:hubUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.lastactive = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
