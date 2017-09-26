(function() {
    'use strict';

    angular
        .module('demoAngular1XApp')
        .factory('LoginService', LoginService);

    LoginService.$inject = ['$uibModal'];

    console.log('----------------- login.service.js file');
    function LoginService ($uibModal) {
        var service = {
            open: open
        };
        console.log('-----------------Run constructor LoginService in login.service.js');

        var modalInstance = null;
        var resetModal = function () {
            modalInstance = null;
        };

        return service;

        function open () {
            if (modalInstance !== null) return;
            modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/components/login/login.html',
                controller: 'LoginController',
                controllerAs: 'vm',
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('login');
                        return $translate.refresh();
                    }]
                }
            });

            console.log('2-----------------function open() in login.service.js file');
            modalInstance.result.then(
                resetModal,
                resetModal
            );
        }
    }
})();
