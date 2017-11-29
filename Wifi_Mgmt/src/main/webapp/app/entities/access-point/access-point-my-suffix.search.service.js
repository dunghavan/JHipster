(function() {
    'use strict';

    angular
        .module('wifiMgmtApp')
        .factory('AccessPointSearch', AccessPointSearch);

    AccessPointSearch.$inject = ['$resource'];

    function AccessPointSearch($resource) {
        var resourceUrl =  'api/_search/access-points/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
