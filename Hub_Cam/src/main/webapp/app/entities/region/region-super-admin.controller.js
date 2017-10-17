(function() {
    'use strict';

    angular
        .module('hubCamApp')
        .controller('RegionSuperAdminController', RegionSuperAdminController);

    RegionSuperAdminController.$inject = ['Region'];

    function RegionSuperAdminController(Region) {

        var vm = this;

        vm.regions = [];

        loadAll();
        console.log('region: ', vm.regions);

        function loadAll() {
            Region.query(function(result) {
                vm.regions = result;
                vm.searchQuery = null;
            });
        }
    }
})();
