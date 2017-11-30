(function() {
    'use strict';

    angular
        .module('wifiMgmtApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('access-point', {
            parent: 'entity',
            url: '/access-point',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'wifiMgmtApp.accessPoint.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/access-point/access-points.html',
                    controller: 'AccessPointController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('accessPoint');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('access-point-detail', {
            parent: 'access-point',
            url: '/access-point/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'wifiMgmtApp.accessPoint.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/access-point/access-point-detail.html',
                    controller: 'AccessPointDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('accessPoint');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'AccessPoint', function($stateParams, AccessPoint) {
                    return AccessPoint.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'access-point',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('access-point-detail.edit', {
            parent: 'access-point-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/access-point/access-point-dialog.html',
                    controller: 'AccessPointDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['AccessPoint', function(AccessPoint) {
                            return AccessPoint.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('access-point.new', {
            parent: 'access-point',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/access-point/access-point-dialog.html',
                    controller: 'AccessPointDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                mac: null,
                                description: null,
                                status: null,
                                lastActive: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('access-point', null, { reload: 'access-point' });
                }, function() {
                    $state.go('access-point');
                });
            }]
        })
        .state('access-point.edit', {
            parent: 'access-point',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/access-point/access-point-dialog.html',
                    controller: 'AccessPointDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['AccessPoint', function(AccessPoint) {
                            return AccessPoint.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('access-point', null, { reload: 'access-point' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('access-point.delete', {
            parent: 'access-point',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/access-point/access-point-delete-dialog.html',
                    controller: 'AccessPointDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['AccessPoint', function(AccessPoint) {
                            return AccessPoint.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('access-point', null, { reload: 'access-point' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
