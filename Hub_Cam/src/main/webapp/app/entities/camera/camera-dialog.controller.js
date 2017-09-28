(function() {
    'use strict';

    angular
        .module('hubCamApp')
        .controller('CameraDialogController', CameraDialogController);

    CameraDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Camera', 'Hub', 'Region'];

    function CameraDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Camera, Hub, Region) {
        var vm = this;

        vm.camera = entity;
        vm.clear = clear;
        vm.save = save;
        vm.filterRegionByHub = filterRegionByHub;
        vm.filterHubByRegion = filterHubByRegion;
        vm.hubs = Hub.query();
        vm.regions = Region.query();

        vm.list_regions_after_filt = [];
        vm.list_regions_after_filt = vm.regions;

        vm.list_hubs_after_filt = [];
        vm.list_hubs_after_filt = vm.hubs;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        //@Dung Add:
        function filterRegionByHub () {
            if(vm.list_hubs_after_filt !== null && vm.camera.hub !== null) {
                vm.list_regions_after_filt = [];
                var orgId = vm.camera.hub.organization.id;
                for(var i = 0; i < vm.regions.length; i++){
                    if(vm.regions[i].organization.id === orgId)
                        vm.list_regions_after_filt.push(vm.regions[i]);
                }
                if(vm.list_regions_after_filt !== null)
                    vm.camera.region = vm.list_regions_after_filt[0];
                console.log('------List region match: ', vm.list_regions_after_filt);
                console.log('------vm.camera.hub.organization: ', vm.camera.hub.organization);
            }
            else {
                vm.list_regions_after_filt = vm.regions;
            }

        }
        //@Dung Add:
        function filterHubByRegion () {
            if(vm.list_regions_after_filt !== null && vm.camera.region !== null){
                vm.list_hubs_after_filt = [];
                var orgId = vm.camera.region.organization.id;
                for(var i = 0; i < vm.hubs.length; i++){
                    if(vm.hubs[i].organization.id === orgId)
                        vm.list_hubs_after_filt.push(vm.hubs[i]);
                }
                if(vm.list_hubs_after_filt !== null)
                    vm.camera.hub = vm.list_hubs_after_filt[0];
                console.log('------List region match: ', vm.list_hubs_after_filt);
            }
            else{
                vm.list_hubs_after_filt = vm.hubs;
            }

        }

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save() {
            vm.isSaving = true;
            if (vm.camera.id !== null) {
                console.log('------Hubs in save function: ', vm.hubs[0].organization.id);
                console.log('------Selected hub: ', vm.camera.hub.organization.id);
                //filterRegionByHub();
                Camera.update(vm.camera, onSaveSuccess, onSaveError);
            } else {
                console.log('------Camera to save: ', vm.camera);
                Camera.save(vm.camera, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('hubCamApp:cameraUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
