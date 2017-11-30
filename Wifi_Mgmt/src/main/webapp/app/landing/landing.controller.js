(function() {
    'use strict';

    angular
        .module('wifiMgmtApp')
        .controller('LandingController', LandingController);

    LandingController.$inject = ['$scope', 'Principal', 'LoginService', '$state'];

    function LandingController ($scope, Principal, LoginService, $state) {
        var vm = this;

        vm.account = null;
        vm.isAuthenticated = null;
        vm.login = LoginService.open;
        vm.register = register;
        $scope.$on('authenticationSuccess', function() {
            getAccount();
        });
        console.log('Run LandingController');

        getAccount();

        function getAccount() {
            Principal.identity().then(function(account) {
                vm.account = account;
                vm.isAuthenticated = Principal.isAuthenticated;

                //dunghv:
                console.log('Check isAuthenticated in LandingController: ', vm.isAuthenticated());
                if(vm.isAuthenticated() === true)
                {
                    console.log('Go to \'home\' state...');
                    $state.go('home');
                }

            });
        }
        function register () {
            $state.go('register');
        }
    }
})();
