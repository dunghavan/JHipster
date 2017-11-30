(function() {
    'use strict';
    angular
        .module('wifiMgmtApp')
        .factory('LandingPage', LandingPage);

    LandingPage.$inject = ['$resource'];

    function LandingPage ($resource) {
        var resourceUrl =  'api/landing-pages/:id';

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
