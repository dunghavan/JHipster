(function() {
    'use strict';

    angular
        .module('hubCamApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('region-super-admin', {
            parent: 'entity',
            url: '/region-super-admin',
            data: {
                authorities: ['ROLE_SUPERADMIN', 'ROLE_ADMIN'],
                pageTitle: 'hubCamApp.region.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/region/regions.html',
                    controller: 'RegionSuperAdminController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('region');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        });
    }

})();
