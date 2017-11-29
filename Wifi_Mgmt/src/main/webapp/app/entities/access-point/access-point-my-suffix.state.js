(function() {
    'use strict';

    angular
        .module('wifiMgmtApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('access-point-my-suffix', {
            parent: 'entity',
            url: '/access-point-my-suffix',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'wifiMgmtApp.accessPoint.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/access-point/access-pointsmySuffix.html',
                    controller: 'AccessPointMySuffixController',
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
        .state('access-point-my-suffix-detail', {
            parent: 'access-point-my-suffix',
            url: '/access-point-my-suffix/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'wifiMgmtApp.accessPoint.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/access-point/access-point-my-suffix-detail.html',
                    controller: 'AccessPointMySuffixDetailController',
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
                        name: $state.current.name || 'access-point-my-suffix',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('access-point-my-suffix-detail.edit', {
            parent: 'access-point-my-suffix-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/access-point/access-point-my-suffix-dialog.html',
                    controller: 'AccessPointMySuffixDialogController',
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
        .state('access-point-my-suffix.new', {
            parent: 'access-point-my-suffix',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/access-point/access-point-my-suffix-dialog.html',
                    controller: 'AccessPointMySuffixDialogController',
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
                    $state.go('access-point-my-suffix', null, { reload: 'access-point-my-suffix' });
                }, function() {
                    $state.go('access-point-my-suffix');
                });
            }]
        })
        .state('access-point-my-suffix.edit', {
            parent: 'access-point-my-suffix',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/access-point/access-point-my-suffix-dialog.html',
                    controller: 'AccessPointMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['AccessPoint', function(AccessPoint) {
                            return AccessPoint.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('access-point-my-suffix', null, { reload: 'access-point-my-suffix' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('access-point-my-suffix.delete', {
            parent: 'access-point-my-suffix',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/access-point/access-point-my-suffix-delete-dialog.html',
                    controller: 'AccessPointMySuffixDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['AccessPoint', function(AccessPoint) {
                            return AccessPoint.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('access-point-my-suffix', null, { reload: 'access-point-my-suffix' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
