(function() {
    'use strict';

    angular
        .module('hubCamApp')
        .controller('ConfirmController', ConfirmController);


    ConfirmController.$inject = ['$translate', '$timeout', 'Auth', 'LoginService', 'User', '$location'];

    function ConfirmController ($translate, $timeout, Auth, LoginService, User, $scope, $location) {
        var vm = this;

        vm.doNotMatch = null;
        vm.error = null;
        vm.errorUserExists = null;
        vm.login = LoginService.open;
        vm.confirm = confirm;
        vm.getUserToken = getUserToken;
        vm.registerAccount = {};
        vm.success = null;
        console.log('Confirm Controller running!');

        $timeout(function (){angular.element('#password').focus();});

        function confirm () {
            if (vm.registerAccount.password !== vm.confirmPassword) {
                vm.doNotMatch = 'ERROR';
            } else {
                getUserToken();
                User.save(vm.registerAccount, onSaveSuccess, onSaveError());
            }
        }

        function onSaveSuccess (result) {
            console.log('onSaveSuccess!');
        }

        function onSaveError () {
            console.log('onSaveError!');
        }

        function getUserToken()
        {
            var query = window.location.search.substring(1);
            console.log('query: ', query);
            var parameters = window.location.href.substring(1).split("&");
            console.log(parameters);

            var temp = parameters[0].split("=");

            console.log('Token: ', temp[1]);
            vm.registerAccount.token = temp[1];
            //document.getElementById("token1").innerHTML = temp[1];
        }
    }
})();
