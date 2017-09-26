(function() {
    'use strict';

    angular
        .module('hubCamApp')
        .controller('CameraDetailController', CameraDetailController);

    CameraDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Camera', 'Hub', 'Region'];

    function CameraDetailController($scope, $rootScope, $stateParams, previousState, entity, Camera, Hub, Region) {
        var vm = this;

        vm.camera = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('hubCamApp:cameraUpdate', function(event, result) {
            vm.camera = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
