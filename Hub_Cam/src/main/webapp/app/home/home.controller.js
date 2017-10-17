(function() {
    'use strict';

    angular
        .module('hubCamApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'Principal', 'LoginService', '$state'];

    function HomeController ($scope, Principal, LoginService, $state) {
        var vm = this;

        vm.account = null;
        vm.isAuthenticated = null;
        vm.login = LoginService.open;
        vm.register = register;
        $scope.$on('authenticationSuccess', function() {
            getAccount();
        });

        console.log('before getAccount(): ', vm.account);
        getAccount();
        console.log('after getAccount()',  vm.account);

        function getAccount() {
            Principal.identity().then(function(account) {
                vm.account = account;
                vm.isAuthenticated = Principal.isAuthenticated;
                console.log('getAccount(): ', vm.account);
            });
        }
        console.log('last declare: ', vm.account);

        function register () {
            $state.go('register');
        }
    }
})();
