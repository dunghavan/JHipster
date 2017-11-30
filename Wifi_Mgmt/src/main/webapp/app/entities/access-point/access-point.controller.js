(function() {
    'use strict';

    angular
        .module('wifiMgmtApp')
        .controller('AccessPointController', AccessPointController);

    AccessPointController.$inject = ['AccessPoint'];

    function AccessPointController(AccessPoint) {

        var vm = this;

        vm.accessPoints = [];

        loadAll();

        function loadAll() {
            AccessPoint.query(function(result) {
                vm.accessPoints = result;
                vm.searchQuery = null;
            });
        }
    }
})();
