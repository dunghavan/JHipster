(function() {
    'use strict';

    angular
        .module('wifiMgmtApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('login-type-my-suffix', {
            parent: 'entity',
            url: '/login-type-my-suffix',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'wifiMgmtApp.loginType.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/login-type/login-typesmySuffix.html',
                    controller: 'LoginTypeMySuffixController',
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
        .state('login-type-my-suffix-detail', {
            parent: 'login-type-my-suffix',
            url: '/login-type-my-suffix/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'wifiMgmtApp.loginType.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/login-type/login-type-my-suffix-detail.html',
                    controller: 'LoginTypeMySuffixDetailController',
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
                        name: $state.current.name || 'login-type-my-suffix',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('login-type-my-suffix-detail.edit', {
            parent: 'login-type-my-suffix-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/login-type/login-type-my-suffix-dialog.html',
                    controller: 'LoginTypeMySuffixDialogController',
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
        .state('login-type-my-suffix.new', {
            parent: 'login-type-my-suffix',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/login-type/login-type-my-suffix-dialog.html',
                    controller: 'LoginTypeMySuffixDialogController',
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
                    $state.go('login-type-my-suffix', null, { reload: 'login-type-my-suffix' });
                }, function() {
                    $state.go('login-type-my-suffix');
                });
            }]
        })
        .state('login-type-my-suffix.edit', {
            parent: 'login-type-my-suffix',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/login-type/login-type-my-suffix-dialog.html',
                    controller: 'LoginTypeMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['LoginType', function(LoginType) {
                            return LoginType.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('login-type-my-suffix', null, { reload: 'login-type-my-suffix' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('login-type-my-suffix.delete', {
            parent: 'login-type-my-suffix',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/login-type/login-type-my-suffix-delete-dialog.html',
                    controller: 'LoginTypeMySuffixDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['LoginType', function(LoginType) {
                            return LoginType.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('login-type-my-suffix', null, { reload: 'login-type-my-suffix' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
