(function() {
    'use strict';
    angular
        .module('hubCamApp')
        .factory('Hub', Hub);

    Hub.$inject = ['$resource', 'DateUtils'];

    function Hub ($resource, DateUtils) {
        var resourceUrl =  'api/hubs/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.lastactive = DateUtils.convertDateTimeFromServer(data.lastactive);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
