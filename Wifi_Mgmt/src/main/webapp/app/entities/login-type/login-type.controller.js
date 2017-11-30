(function() {
    'use strict';

    angular
        .module('wifiMgmtApp')
        .controller('LoginTypeController', LoginTypeController);

    LoginTypeController.$inject = ['LoginType'];

    function LoginTypeController(LoginType) {

        var vm = this;

        vm.loginTypes = [];

        loadAll();

        function loadAll() {
            LoginType.query(function(result) {
                vm.loginTypes = result;
                vm.searchQuery = null;
            });
        }
    }
})();
