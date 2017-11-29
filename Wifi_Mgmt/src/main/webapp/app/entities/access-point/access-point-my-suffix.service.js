(function() {
    'use strict';
    angular
        .module('wifiMgmtApp')
        .factory('AccessPoint', AccessPoint);

    AccessPoint.$inject = ['$resource', 'DateUtils'];

    function AccessPoint ($resource, DateUtils) {
        var resourceUrl =  'api/access-points/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.lastActive = DateUtils.convertLocalDateFromServer(data.lastActive);
                    }
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.lastActive = DateUtils.convertLocalDateToServer(copy.lastActive);
                    return angular.toJson(copy);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.lastActive = DateUtils.convertLocalDateToServer(copy.lastActive);
                    return angular.toJson(copy);
                }
            }
        });
    }
})();
