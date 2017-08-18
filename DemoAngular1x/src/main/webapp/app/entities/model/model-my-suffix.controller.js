(function() {
    'use strict';

    angular
        .module('demoAngular1XApp')
        .controller('ModelMySuffixController', ModelMySuffixController);

    ModelMySuffixController.$inject = ['Model'];

    function ModelMySuffixController(Model) {

        var vm = this;

        vm.models = [];

        loadAll();

        function loadAll() {
            Model.query(function(result) {
                vm.models = result;
                vm.searchQuery = null;
            });
        }
    }
})();
