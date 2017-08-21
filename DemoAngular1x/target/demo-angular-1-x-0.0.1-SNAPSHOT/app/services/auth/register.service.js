(function () {
    'use strict';

    angular
        .module('demoAngular1XApp')
        .factory('Register', Register);

    Register.$inject = ['$resource'];

    function Register ($resource) {
        return $resource('api/register', {}, {});
    }
})();
