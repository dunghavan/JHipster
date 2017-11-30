(function() {
    'use strict';

    angular
        .module('wifiMgmtApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('landing-page', {
            parent: 'entity',
            url: '/landing-page',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'wifiMgmtApp.landingPage.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/landing-page/landing-pages.html',
                    controller: 'LandingPageController',
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
        .state('landing-page-detail', {
            parent: 'landing-page',
            url: '/landing-page/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'wifiMgmtApp.landingPage.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/landing-page/landing-page-detail.html',
                    controller: 'LandingPageDetailController',
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
                        name: $state.current.name || 'landing-page',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('landing-page-detail.edit', {
            parent: 'landing-page-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/landing-page/landing-page-dialog.html',
                    controller: 'LandingPageDialogController',
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
        .state('landing-page.new', {
            parent: 'landing-page',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/landing-page/landing-page-dialog.html',
                    controller: 'LandingPageDialogController',
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
                    $state.go('landing-page', null, { reload: 'landing-page' });
                }, function() {
                    $state.go('landing-page');
                });
            }]
        })
        .state('landing-page.edit', {
            parent: 'landing-page',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/landing-page/landing-page-dialog.html',
                    controller: 'LandingPageDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['LandingPage', function(LandingPage) {
                            return LandingPage.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('landing-page', null, { reload: 'landing-page' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('landing-page.delete', {
            parent: 'landing-page',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/landing-page/landing-page-delete-dialog.html',
                    controller: 'LandingPageDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['LandingPage', function(LandingPage) {
                            return LandingPage.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('landing-page', null, { reload: 'landing-page' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
