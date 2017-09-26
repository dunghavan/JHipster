'use strict';

angular.module('demoAngular1XApp')
    .factory('BootSwatchService', ['$http', function ($http) {
        return {
            get: function() {
                return $http.get('http://bootswatch.com/api/2.json').then(function (response) {
                    return response.data.themes;
                });
            }
        };
    }] );
