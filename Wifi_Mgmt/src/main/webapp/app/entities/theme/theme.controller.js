(function() {
    'use strict';

    angular
        .module('wifiMgmtApp')
        .controller('ThemeController', ThemeController);

    ThemeController.$inject = ['Theme'];

    function ThemeController(Theme) {

        var vm = this;

        vm.themes = [];

        loadAll();

        function loadAll() {
            Theme.query(function(result) {
                vm.themes = result;
                vm.searchQuery = null;
            });
        }
    }
})();
