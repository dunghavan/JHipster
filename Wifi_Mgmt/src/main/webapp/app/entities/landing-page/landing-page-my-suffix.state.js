(function() {
    'use strict';

    angular
        .module('wifiMgmtApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('landing-page-my-suffix', {
            parent: 'entity',
            url: '/landing-page-my-suffix',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'wifiMgmtApp.landingPage.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/landing-page/landing-pagesmySuffix.html',
                    controller: 'LandingPageMySuffixController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('landingPage');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('landing-page-my-suffix-detail', {
            parent: 'landing-page-my-suffix',
            url: '/landing-page-my-suffix/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'wifiMgmtApp.landingPage.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/landing-page/landing-page-my-suffix-detail.html',
                    controller: 'LandingPageMySuffixDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('landingPage');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'LandingPage', function($stateParams, LandingPage) {
                    return LandingPage.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'landing-page-my-suffix',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('landing-page-my-suffix-detail.edit', {
            parent: 'landing-page-my-suffix-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/landing-page/landing-page-my-suffix-dialog.html',
                    controller: 'LandingPageMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['LandingPage', function(LandingPage) {
                            return LandingPage.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('landing-page-my-suffix.new', {
            parent: 'landing-page-my-suffix',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/landing-page/landing-page-my-suffix-dialog.html',
                    controller: 'LandingPageMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                text1: null,
                                text2: null,
                                text3: null,
                                image1: null,
                                image2: null,
                                image3: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('landing-page-my-suffix', null, { reload: 'landing-page-my-suffix' });
                }, function() {
                    $state.go('landing-page-my-suffix');
                });
            }]
        })
        .state('landing-page-my-suffix.edit', {
            parent: 'landing-page-my-suffix',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/landing-page/landing-page-my-suffix-dialog.html',
                    controller: 'LandingPageMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['LandingPage', function(LandingPage) {
                            return LandingPage.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('landing-page-my-suffix', null, { reload: 'landing-page-my-suffix' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('landing-page-my-suffix.delete', {
            parent: 'landing-page-my-suffix',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/landing-page/landing-page-my-suffix-delete-dialog.html',
                    controller: 'LandingPageMySuffixDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['LandingPage', function(LandingPage) {
                            return LandingPage.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('landing-page-my-suffix', null, { reload: 'landing-page-my-suffix' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
