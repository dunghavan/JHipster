(function() {
    'use strict';

    angular
        .module('hubCamApp')
        .controller('CameraController', CameraController);

    CameraController.$inject = ['Camera'];

    function CameraController(Camera) {

        var vm = this;

        vm.cameras = [];

        loadAll();
        //loadAllCamerasByOrgId();

        function loadAll() {
            Camera.getAllCamerasByOrgId(function(result) {
                vm.cameras = result;
                vm.searchQuery = null;
            });
        }

        // function loadAllCamerasByOrgId() {
        //     Camera.getAllCamerasByOrgId(function(result) {
        //         vm.cameras = result;
        //         vm.searchQuery = null;
        //     });
        // }

    }
})();
