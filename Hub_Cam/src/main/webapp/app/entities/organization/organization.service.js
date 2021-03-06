(function() {
    'use strict';
    angular
        .module('hubCamApp')
        .factory('Organization', Organization);

    Organization.$inject = ['$resource'];

    function Organization ($resource) {
        var resourceUrl =  'api/organizations/:id';

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
            'getOrgIdOfAdminLoggedIn': {method: 'GET', isArray: false, url: resourceUrl + '/get-org-id-of-admin-logged-in'}
        });
    }
})();
