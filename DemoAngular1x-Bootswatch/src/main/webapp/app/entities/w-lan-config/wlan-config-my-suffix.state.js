(function() {
    'use strict';

    angular
        .module('demoAngular1XApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('wlan-config-my-suffix', {
            parent: 'entity',
            url: '/wlan-config-my-suffix?page&sort&search',
            data: {
                authorities: ['ROLE_USER', 'ROLE_SUPERUSER'],
                pageTitle: 'demoAngular1XApp.wLANConfig.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/w-lan-config/w-lan-configsmySuffix.html',
                    controller: 'WLANConfigMySuffixController',
                    controllerAs: 'vm'
                }
            },
            params: {
                page: {
                    value: '1',
                    squash: true
                },
                sort: {
                    value: 'id,asc',
                    squash: true
                },
                search: null
            },
            resolve: {
                pagingParams: ['$stateParams', 'PaginationUtil', function ($stateParams, PaginationUtil) {
                    return {
                        page: PaginationUtil.parsePage($stateParams.page),
                        sort: $stateParams.sort,
                        predicate: PaginationUtil.parsePredicate($stateParams.sort),
                        ascending: PaginationUtil.parseAscending($stateParams.sort),
                        search: $stateParams.search
                    };
                }],
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('wLANConfig');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('wlan-config-my-suffix-detail', {
            parent: 'wlan-config-my-suffix',
            url: '/wlan-config-my-suffix/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'demoAngular1XApp.wLANConfig.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/w-lan-config/wlan-config-my-suffix-detail.html',
                    controller: 'WLANConfigMySuffixDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('wLANConfig');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'WLANConfig', function($stateParams, WLANConfig) {
                    return WLANConfig.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'wlan-config-my-suffix',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('wlan-config-my-suffix-detail.edit', {
            parent: 'wlan-config-my-suffix-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/w-lan-config/wlan-config-my-suffix-dialog.html',
                    controller: 'WLANConfigMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['WLANConfig', function(WLANConfig) {
                            return WLANConfig.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('wlan-config-my-suffix.new', {
            parent: 'wlan-config-my-suffix',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/w-lan-config/wlan-config-my-suffix-dialog.html',
                    controller: 'WLANConfigMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                alias: null,
                                chanel: null,
                                maxAssoc: null,
                                htMode: null,
                                txPower: null,
                                maxInactivity: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('wlan-config-my-suffix', null, { reload: 'wlan-config-my-suffix' });
                }, function() {
                    $state.go('wlan-config-my-suffix');
                });
            }]
        })
        .state('wlan-config-my-suffix.edit', {
            parent: 'wlan-config-my-suffix',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/w-lan-config/wlan-config-my-suffix-dialog.html',
                    controller: 'WLANConfigMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['WLANConfig', function(WLANConfig) {
                            return WLANConfig.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('wlan-config-my-suffix', null, { reload: 'wlan-config-my-suffix' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('wlan-config-my-suffix.delete', {
            parent: 'wlan-config-my-suffix',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/w-lan-config/wlan-config-my-suffix-delete-dialog.html',
                    controller: 'WLANConfigMySuffixDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['WLANConfig', function(WLANConfig) {
                            return WLANConfig.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('wlan-config-my-suffix', null, { reload: 'wlan-config-my-suffix' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
