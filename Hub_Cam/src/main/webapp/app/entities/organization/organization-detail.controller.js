(function() {
    'use strict';

    angular
        .module('hubCamApp')
        .controller('OrganizationDetailController', OrganizationDetailController);

    OrganizationDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Organization', 'Hub', 'Region'];

    function OrganizationDetailController($scope, $rootScope, $stateParams, previousState, entity, Organization, Hub, Region) {
        var vm = this;

        vm.organization = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('hubCamApp:organizationUpdate', function(event, result) {
            vm.organization = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
