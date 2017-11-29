(function() {
    'use strict';
    angular
        .module('wifiMgmtApp')
        .factory('LoginType', LoginType);

    LoginType.$inject = ['$resource'];

    function LoginType ($resource) {
        var resourceUrl =  'api/login-types/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
