(function() {
    'use strict';

    angular
        .module('demoAngular1XApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('model-my-suffix', {
            parent: 'entity',
            url: '/model-my-suffix',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'demoAngular1XApp.model.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/model/modelsmySuffix.html',
                    controller: 'ModelMySuffixController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('model');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('model-my-suffix-detail', {
            parent: 'model-my-suffix',
            url: '/model-my-suffix/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'demoAngular1XApp.model.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/model/model-my-suffix-detail.html',
                    controller: 'ModelMySuffixDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('model');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Model', function($stateParams, Model) {
                    return Model.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'model-my-suffix',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('model-my-suffix-detail.edit', {
            parent: 'model-my-suffix-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/model/model-my-suffix-dialog.html',
                    controller: 'ModelMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Model', function(Model) {
                            return Model.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('model-my-suffix.new', {
            parent: 'model-my-suffix',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/model/model-my-suffix-dialog.html',
                    controller: 'ModelMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                modelName: null,
                                note: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('model-my-suffix', null, { reload: 'model-my-suffix' });
                }, function() {
                    $state.go('model-my-suffix');
                });
            }]
        })
        .state('model-my-suffix.edit', {
            parent: 'model-my-suffix',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/model/model-my-suffix-dialog.html',
                    controller: 'ModelMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Model', function(Model) {
                            return Model.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('model-my-suffix', null, { reload: 'model-my-suffix' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('model-my-suffix.delete', {
            parent: 'model-my-suffix',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/model/model-my-suffix-delete-dialog.html',
                    controller: 'ModelMySuffixDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Model', function(Model) {
                            return Model.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('model-my-suffix', null, { reload: 'model-my-suffix' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
