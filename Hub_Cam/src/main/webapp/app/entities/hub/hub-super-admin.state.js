(function() {
    'use strict';

    angular
        .module('hubCamApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('hub-super-admin', {
            parent: 'entity',
            url: '/hub-super-admin',
            data: {
                authorities: ['ROLE_SUPERADMIN', 'ROLE_ADMIN'],
                pageTitle: 'hubCamApp.hub.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/hub/hubs.html',
                    controller: 'HubSuperAdminController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('hub');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        });
    }

})();
