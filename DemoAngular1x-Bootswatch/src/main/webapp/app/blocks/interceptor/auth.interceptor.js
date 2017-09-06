(function() {
    'use strict';

    angular
        .module('demoAngular1XApp')
        // @Dung Add
        .factory('authInterceptor', function ($rootScope, $q, $location, localStorageService) {
            return {
                // Add authorization token to headers
                request: function (config) {
                    config.headers = config.headers || {};
                    // exclude bootswatch url
                    if (config.url.indexOf('api.bootswatch.com') === -1) {
                        var token = localStorageService.get('token');
                    }
                    return config;
                }
            }
        })
        // End Add
        .factory('authInterceptor', authInterceptor);


    authInterceptor.$inject = ['$rootScope', '$q', '$location', '$localStorage', '$sessionStorage'];

    function authInterceptor ($rootScope, $q, $location, $localStorage, $sessionStorage) {
        var service = {
            request: request
        };

        return service;

        function request (config) {
            /*jshint camelcase: false */
            config.headers = config.headers || {};
            var token = $localStorage.authenticationToken || $sessionStorage.authenticationToken;
            if (token) {
                config.headers.Authorization = 'Bearer ' + token;
            }
            return config;
        }
    }

})();
