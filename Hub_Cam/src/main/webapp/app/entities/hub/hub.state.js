(function() {
    'use strict';

    angular
        .module('hubCamApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('hub', {
            parent: 'entity',
            url: '/hub',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'hubCamApp.hub.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/hub/hubs.html',
                    controller: 'HubController',
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
        })
        .state('hub-detail', {
            parent: 'hub',
            url: '/hub/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'hubCamApp.hub.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/hub/hub-detail.html',
                    controller: 'HubDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('hub');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Hub', function($stateParams, Hub) {
                    return Hub.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'hub',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('hub-detail.edit', {
            parent: 'hub-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/hub/hub-dialog.html',
                    controller: 'HubDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Hub', function(Hub) {
                            return Hub.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('hub.new', {
            parent: 'hub',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/hub/hub-dialog.html',
                    controller: 'HubDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                uid: null,
                                alias: null,
                                uuid: null,
                                lastactive: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('hub', null, { reload: 'hub' });
                }, function() {
                    $state.go('hub');
                });
            }]
        })
        .state('hub.edit', {
            parent: 'hub',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/hub/hub-dialog.html',
                    controller: 'HubDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Hub', function(Hub) {
                            return Hub.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('hub', null, { reload: 'hub' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('hub.delete', {
            parent: 'hub',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/hub/hub-delete-dialog.html',
                    controller: 'HubDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Hub', function(Hub) {
                            return Hub.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('hub', null, { reload: 'hub' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
