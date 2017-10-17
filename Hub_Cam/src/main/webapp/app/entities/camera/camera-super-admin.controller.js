(function() {
    'use strict';

    angular
        .module('hubCamApp')
        .controller('CameraSuperAdminController', CameraSuperAdminController);

    CameraSuperAdminController.$inject = ['Camera'];

    function CameraSuperAdminController(Camera) {

        var vm = this;

        vm.cameras = [];

        loadAll();
        //loadAllCamerasByOrgId();

        function loadAll() {
            Camera.query(function(result) {
                vm.cameras = result;
                vm.searchQuery = null;
            });
        }

        //@Dung Add:
        function loadAllCamerasByOrgId() {
            Camera.getAllCamerasByOrgId(function(result) {
                vm.cameras = result;
                vm.searchQuery = null;
            });
        }

    }
})();
