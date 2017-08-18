(function() {
    'use strict';

    angular
        .module('demoAngular1XApp')
        .controller('ModelMySuffixDetailController', ModelMySuffixDetailController);

    ModelMySuffixDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Model'];

    function ModelMySuffixDetailController($scope, $rootScope, $stateParams, previousState, entity, Model) {
        var vm = this;

        vm.model = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('demoAngular1XApp:modelUpdate', function(event, result) {
            vm.model = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
