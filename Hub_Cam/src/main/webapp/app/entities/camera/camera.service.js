(function() {
    'use strict';
    angular
        .module('hubCamApp')
        .factory('Camera', Camera);

    Camera.$inject = ['$resource'];

    function Camera ($resource) {
        var resourceUrl =  'api/cameras/:id';

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
            'getAllCamerasByOrgId': {method:'GET', isArray:true, url: resourceUrl + '/get-all-cameras-by-org-id'}
        });
    }
})();
