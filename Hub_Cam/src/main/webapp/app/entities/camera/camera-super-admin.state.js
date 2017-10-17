(function() {
    'use strict';

    angular
        .module('hubCamApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
            .state('camera-super-admin', {
                parent: 'entity',
                url: '/camera-super-admin',
                data: {
                    authorities: ['ROLE_SUPERADMIN', 'ROLE_ADMIN'],
                    pageTitle: 'hubCamApp.camera.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'app/entities/camera/cameras.html',
                        controller: 'CameraSuperAdminController',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('camera');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            });
    }
})();
