(function() {
    'use strict';

    angular
        .module('wifiMgmtApp')
        .factory('LoginTypeSearch', LoginTypeSearch);

    LoginTypeSearch.$inject = ['$resource'];

    function LoginTypeSearch($resource) {
        var resourceUrl =  'api/_search/login-types/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
