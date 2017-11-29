(function() {
    'use strict';

    angular
        .module('wifiMgmtApp')
        .factory('LandingPageSearch', LandingPageSearch);

    LandingPageSearch.$inject = ['$resource'];

    function LandingPageSearch($resource) {
        var resourceUrl =  'api/_search/landing-pages/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
