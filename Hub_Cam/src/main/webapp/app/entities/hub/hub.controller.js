(function() {
    'use strict';

    angular
        .module('hubCamApp')
        .controller('HubController', HubController);

    HubController.$inject = ['Hub'];

    function HubController(Hub) {

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
