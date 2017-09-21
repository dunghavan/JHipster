(function() {
    'use strict';

    angular
        .module('demoAngular1XApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('wlan-group-my-suffix', {
            parent: 'entity',
            url: '/wlan-group-my-suffix',
            data: {
                authorities: ['ROLE_ADMIN', 'ROLE_SUPERUSER'],
                pageTitle: 'demoAngular1XApp.wLANGroup.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/w-lan-group/w-lan-groups-my-Suffix.html',
                    controller: 'WLANGroupMySuffixController',
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
        })
        .state('wlan-group-my-suffix-detail', {
            parent: 'wlan-group-my-suffix',
            url: '/wlan-group-my-suffix/{id}',
            data: {
                authorities: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_SUPERUSER'],
                pageTitle: 'demoAngular1XApp.wLANGroup.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/w-lan-group/wlan-group-my-suffix-detail.html',
                    controller: 'WLANGroupMySuffixDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('wLANGroup');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'WLANGroup', function($stateParams, WLANGroup) {
                    return WLANGroup.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'wlan-group-my-suffix',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('wlan-group-my-suffix-detail.edit', {
            parent: 'wlan-group-my-suffix-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_SUPERUSER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/w-lan-group/wlan-group-my-suffix-dialog.html',
                    controller: 'WLANGroupMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['WLANGroup', function(WLANGroup) {
                            return WLANGroup.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('wlan-group-my-suffix.new', {
            parent: 'wlan-group-my-suffix',
            url: '/new',
            data: {
                authorities: ['ROLE_SUPERUSER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/w-lan-group/wlan-group-my-suffix-dialog.html',
                    controller: 'WLANGroupMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                alias: null,
                                ssid: null,
                                encryption: null,
                                passphase: null,
                                id: null
                            };
                        }, //@Dung Add:
                        user: ['User', function(User) {
                            return User.getCurrentUser().$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('wlan-group-my-suffix', null, { reload: 'wlan-group-my-suffix' });
                }, function() {
                    $state.go('wlan-group-my-suffix');
                });
            }]
        })

        // @Dung Add:
        //     .state('wlan-group-my-suffix.new', {
        //         parent: 'wlan-group-my-suffix',
        //         url: '/new',
        //         data: {
        //             authorities: ['ROLE_USER']
        //         },
        //         onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
        //             $uibModal.open({
        //                 templateUrl: 'app/entities/w-lan-group/wlan-group-my-suffix-dialog.html',
        //                 controller: 'WLANGroupMySuffixDialogController',
        //                 controllerAs: 'vm',
        //                 backdrop: 'static',
        //                 size: 'lg',
        //                 resolve: {
        //                     entity: function (WLANGroup) {
        //                         return {
        //                             alias: null,
        //                             ssid: null,
        //                             encryption: null,
        //                             passphase: null,
        //                             id: null
        //                         };
        //                     }
        //                 }
        //             }).result.then(function() {
        //                 $state.go('wlan-group-my-suffix', null, { reload: 'wlan-group-my-suffix' });
        //             }, function() {
        //                 $state.go('wlan-group-my-suffix');
        //             });
        //         }]
        //     })
            //----------------------

        .state('wlan-group-my-suffix.edit', {
            parent: 'wlan-group-my-suffix',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_SUPERUSER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/w-lan-group/wlan-group-my-suffix-dialog.html',
                    controller: 'WLANGroupMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['WLANGroup', function(WLANGroup) {
                            var v = WLANGroup.get({id : $stateParams.id}).$promise;
                            console.log('Struct of WLANGroup resource: ', v);
                            return v;
                        }]
                        //@Dung Add:
                        // ,entity2: function(){
                        //     return 'ROLE_SUPERUSER';
                        // }
                    }
                }).result.then(function() {
                    $state.go('wlan-group-my-suffix', null, { reload: 'wlan-group-my-suffix' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('wlan-group-my-suffix.delete', {
            parent: 'wlan-group-my-suffix',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_SUPERUSER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/w-lan-group/wlan-group-my-suffix-delete-dialog.html',
                    controller: 'WLANGroupMySuffixDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['WLANGroup', function(WLANGroup) {
                            return WLANGroup.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('wlan-group-my-suffix', null, { reload: 'wlan-group-my-suffix' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
