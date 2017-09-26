(function() {
    'use strict';

    angular
        .module('hubCamApp')
        .controller('HubDetailController', HubDetailController);

    HubDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Hub', 'Camera', 'Organization'];

    function HubDetailController($scope, $rootScope, $stateParams, previousState, entity, Hub, Camera, Organization) {
        var vm = this;

        vm.hub = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('hubCamApp:hubUpdate', function(event, result) {
            vm.hub = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
