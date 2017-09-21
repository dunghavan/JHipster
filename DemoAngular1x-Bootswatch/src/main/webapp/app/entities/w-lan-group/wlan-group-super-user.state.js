(function() {
    'use strict';

    angular
        .module('demoAngular1XApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
            .state('wlan-group-super-user', {
                parent: 'entity',
                url: '/wlan-group-super-user',
                data: {
                    authorities: ['ROLE_SUPERUSER', 'ROLE_ADMIN'],
                    pageTitle: 'demoAngular1XApp.wLANGroup.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'app/entities/w-lan-group/w-lan-groups-my-Suffix.html',
                        controller: 'WLANGroupSuperUserController',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('wLANGroup');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            });
    }

})();
