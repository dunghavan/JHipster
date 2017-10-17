(function() {
    'use strict';

    angular
        .module('hubCamApp')
        .controller('HubSuperAdminController', HubSuperAdminController);

    HubSuperAdminController.$inject = ['Hub'];

    function HubSuperAdminController(Hub) {

        var vm = this;

        vm.hubs = [];

        loadAll();

        function loadAll() {
            Hub.query(function(result) {
                vm.hubs = result;
                vm.searchQuery = null;
            });
        }

    }
})();
