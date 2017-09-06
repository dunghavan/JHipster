(function() {
    'use strict';
    angular
        .module('demoAngular1XApp')
        .factory('WLANConfig', WLANConfig);

    WLANConfig.$inject = ['$resource'];

    function WLANConfig ($resource) {
        var resourceUrl =  'api/w-lan-configs/:id';

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
            'update': { method:'PUT' },
            //@Dung Add:
            'getByWlanGroup':{method: 'GET', isArray: true, url: resourceUrl + '/get-by-wlan-group'}
        });
    }
})();
