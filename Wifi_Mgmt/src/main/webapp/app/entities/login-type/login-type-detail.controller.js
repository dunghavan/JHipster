(function() {
    'use strict';

    angular
        .module('wifiMgmtApp')
        .controller('LoginTypeDetailController', LoginTypeDetailController);

    LoginTypeDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'LoginType', 'LandingPage'];

    function LoginTypeDetailController($scope, $rootScope, $stateParams, previousState, entity, LoginType, LandingPage) {
        var vm = this;

        vm.loginType = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('wifiMgmtApp:loginTypeUpdate', function(event, result) {
            vm.loginType = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
