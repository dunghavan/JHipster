(function() {
    'use strict';

    angular
        .module('wifiMgmtApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('login-type', {
            parent: 'entity',
            url: '/login-type',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'wifiMgmtApp.loginType.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/login-type/login-types.html',
                    controller: 'LoginTypeController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('loginType');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('login-type-detail', {
            parent: 'login-type',
            url: '/login-type/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'wifiMgmtApp.loginType.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/login-type/login-type-detail.html',
                    controller: 'LoginTypeDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('loginType');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'LoginType', function($stateParams, LoginType) {
                    return LoginType.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'login-type',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('login-type-detail.edit', {
            parent: 'login-type-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/login-type/login-type-dialog.html',
                    controller: 'LoginTypeDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['LoginType', function(LoginType) {
                            return LoginType.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('login-type.new', {
            parent: 'login-type',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/login-type/login-type-dialog.html',
                    controller: 'LoginTypeDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('login-type', null, { reload: 'login-type' });
                }, function() {
                    $state.go('login-type');
                });
            }]
        })
        .state('login-type.edit', {
            parent: 'login-type',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/login-type/login-type-dialog.html',
                    controller: 'LoginTypeDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['LoginType', function(LoginType) {
                            return LoginType.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('login-type', null, { reload: 'login-type' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('login-type.delete', {
            parent: 'login-type',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/login-type/login-type-delete-dialog.html',
                    controller: 'LoginTypeDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['LoginType', function(LoginType) {
                            return LoginType.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('login-type', null, { reload: 'login-type' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
