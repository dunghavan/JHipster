(function() {
    'use strict';

    angular
        .module('wifiMgmtApp')
        .controller('ThemeMySuffixDetailController', ThemeMySuffixDetailController);

    ThemeMySuffixDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Theme'];

    function ThemeMySuffixDetailController($scope, $rootScope, $stateParams, previousState, entity, Theme) {
        var vm = this;

        vm.theme = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('wifiMgmtApp:themeUpdate', function(event, result) {
            vm.theme = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
