(function () {
    'use strict';

    angular
        .module('socialLoginHttpSessionApp')
        .factory('Register', Register);

    Register.$inject = ['$resource'];

    function Register ($resource) {
        return $resource('api/register', {}, {});
    }
})();
