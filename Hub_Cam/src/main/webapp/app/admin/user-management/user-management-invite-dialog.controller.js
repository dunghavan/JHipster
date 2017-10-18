(function() {
    'use strict';

    angular
        .module('hubCamApp')
        .controller('UserManagementInviteDialogController',UserManagementInviteDialogController);

    UserManagementInviteDialogController.$inject = ['$stateParams', '$uibModalInstance', 'entity', 'User', 'Organization', 'JhiLanguageService'];

    function UserManagementInviteDialogController ($stateParams, $uibModalInstance, entity, User, Organization, JhiLanguageService) {
        var vm = this;

        vm.authorities = ['ROLE_ADMIN'];
        vm.clear = clear;
        vm.languages = null;
        vm.invite = invite;
        vm.user = entity;

        //@Dung Add:
        vm.organizations = Organization.query();
        vm.exist_users = [];
        vm.exist_users = User.query();


        JhiLanguageService.getAll().then(function (languages) {
            vm.languages = languages;
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function onSaveSuccess (result) {
            vm.isInviting = false;
            $uibModalInstance.close(result);
        }

        function onSaveError () {
            vm.isInviting = false;
        }

        function invite () {
            console.log('call invite method()!');
            vm.isInviting = true;
            for(var i = 0; i < vm.exist_users.length ; i++){
                if(vm.email === vm.exist_users[i].email){
                    // mail existing....
                    break;
                    console.log('Mail already exist!');
                }
            }
            User.invite(vm.user, onSaveSuccess, onSaveError);
            console.log('Mail valid!');
        }
    }
})();
