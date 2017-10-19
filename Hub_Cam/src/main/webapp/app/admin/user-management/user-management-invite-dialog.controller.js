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
        vm.save = save;
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

        var conflic_email = false;
        function invite () {
            console.log('call invite method()!');
            vm.user = { id: null, login: vm.user.email, firstName: null, lastName: null, email: vm.user.email,
                activated: true, langKey: vm.user.langKey, createdBy: null, createdDate: null,
                lastModifiedBy: null, lastModifiedDate: null, resetDate: null,
                resetKey: null, authorities: vm.user.authorities , organization: vm.user.organization};

            vm.isInviting = true;
            // check email:
            console.log('Current mail: ', vm.user.email);
            for(var i = 0; i < vm.exist_users.length ; i++){
                console.log('List mail: ' + vm.exist_users[i].email);
                if(vm.user.email === vm.exist_users[i].email){
                    // mail existing....
                    conflic_email =  true;
                    console.log('Mail already exist!');
                    break;
                }
            }
            if(!conflic_email){
                console.log('Mail OK!');
                User.invite(vm.user, onSaveSuccess, onSaveError);
            }

        }

        function save () {
            console.log('------save() method: ', vm.user);
            vm.isSaving = true;
            if (vm.user.id !== null) {
                console.log('------User to update: ', vm.user);
                User.update(vm.user, onSaveSuccess, onSaveError);
            } else {
                console.log('------User to save: ', vm.user);
                User.save(vm.user, onSaveSuccess, onSaveError);
            }
        }
    }
})();
