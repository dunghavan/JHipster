(function() {
    'use strict';

    angular
        .module('hubCamApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('confirm', {
            parent: 'account',
            url: '/confirm',
            data: {
                authorities: [],
                pageTitle: 'confirm.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/account/confirm/confirm.html',
                    controller: 'ConfirmController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('confirm');
                    return $translate.refresh();
                }]
            }
        });
    }
})();
