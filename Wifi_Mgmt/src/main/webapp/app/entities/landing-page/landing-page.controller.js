(function() {
    'use strict';

    angular
        .module('wifiMgmtApp')
        .controller('LandingPageController', LandingPageController);

    LandingPageController.$inject = ['LandingPage'];

    function LandingPageController(LandingPage) {

        var vm = this;

        vm.landingPages = [];

        loadAll();

        function loadAll() {
            LandingPage.query(function(result) {
                vm.landingPages = result;
                vm.searchQuery = null;
            });
        }
    }
})();
