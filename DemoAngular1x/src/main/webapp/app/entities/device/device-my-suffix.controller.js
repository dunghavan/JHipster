(function() {
    'use strict';

    angular
        .module('demoAngular1XApp')
        .controller('DeviceMySuffixController', DeviceMySuffixController);

    DeviceMySuffixController.$inject = ['Device'];

    function DeviceMySuffixController(Device) {

        var vm = this;

        vm.devices = [];

        loadAll();

        function loadAll() {
            Device.query(function(result){ //@Dung add
            //Device.get({id: 2})(function(result){
                vm.devices = result;
                vm.searchQuery = null;
            });
        }
    }
})();
