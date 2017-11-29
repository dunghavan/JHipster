(function() {
    'use strict';

    angular
        .module('wifiMgmtApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('theme-my-suffix', {
            parent: 'entity',
            url: '/theme-my-suffix',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'wifiMgmtApp.theme.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/theme/themesmySuffix.html',
                    controller: 'ThemeMySuffixController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('theme');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('theme-my-suffix-detail', {
            parent: 'theme-my-suffix',
            url: '/theme-my-suffix/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'wifiMgmtApp.theme.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/theme/theme-my-suffix-detail.html',
                    controller: 'ThemeMySuffixDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('theme');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Theme', function($stateParams, Theme) {
                    return Theme.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'theme-my-suffix',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('theme-my-suffix-detail.edit', {
            parent: 'theme-my-suffix-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/theme/theme-my-suffix-dialog.html',
                    controller: 'ThemeMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Theme', function(Theme) {
                            return Theme.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('theme-my-suffix.new', {
            parent: 'theme-my-suffix',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/theme/theme-my-suffix-dialog.html',
                    controller: 'ThemeMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                data: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('theme-my-suffix', null, { reload: 'theme-my-suffix' });
                }, function() {
                    $state.go('theme-my-suffix');
                });
            }]
        })
        .state('theme-my-suffix.edit', {
            parent: 'theme-my-suffix',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/theme/theme-my-suffix-dialog.html',
                    controller: 'ThemeMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Theme', function(Theme) {
                            return Theme.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('theme-my-suffix', null, { reload: 'theme-my-suffix' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('theme-my-suffix.delete', {
            parent: 'theme-my-suffix',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/theme/theme-my-suffix-delete-dialog.html',
                    controller: 'ThemeMySuffixDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Theme', function(Theme) {
                            return Theme.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('theme-my-suffix', null, { reload: 'theme-my-suffix' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
