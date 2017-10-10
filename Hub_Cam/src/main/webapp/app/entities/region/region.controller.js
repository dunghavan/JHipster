(function() {
    'use strict';

    angular
        .module('hubCamApp')
        .controller('RegionController', RegionController);

    RegionController.$inject = ['Region'];

    function RegionController(Region) {

        var vm = this;

        vm.regions = [];

        //loadAll();
        loadByOrgId();

        function loadAll() {
            Region.query(function(result) {
                vm.regions = result;
                vm.searchQuery = null;
            });
        }

        function loadByOrgId() {
            Region.getByOrgId(function(result) {
                vm.regions = result;
                vm.searchQuery = null;
            });
        }
    }
})();
