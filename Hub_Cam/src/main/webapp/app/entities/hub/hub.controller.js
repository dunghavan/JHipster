(function() {
    'use strict';

    angular
        .module('hubCamApp')
        .controller('HubController', HubController);

    HubController.$inject = ['Hub'];

    function HubController(Hub) {

        var vm = this;

        vm.hubs = [];

        //loadAll();
        loadByOrgId();

        function loadAll() {
            Hub.query(function(result) {
                vm.hubs = result;
                vm.searchQuery = null;
            });
        }

        //@Dung Add:
        function loadByOrgId() {
            Hub.getByOrgId(function(result) {
                vm.hubs = result;
                vm.searchQuery = null;
            });
        }

    }
})();
