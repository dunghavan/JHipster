(function() {
    'use strict';
    angular
        .module('demoAngular1XApp')
        .factory('WLANGroup', WLANGroup);

    WLANGroup.$inject = ['$resource'];

    function WLANGroup ($resource) {
        var resourceUrl =  'api/w-lan-groups/:id';

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
            'getByUserId' : {method: 'GET',
                isArray: true,
                url: resourceUrl + '/get-by-user-logged-in'}

        }
        );
    }
})();

//@Dung Add:
// (function() {
//     'use strict';
//     angular
//         .module('demoAngular1XApp')
//         .factory('WLANGroup', WLANGroup);
//
//     WLANGroup.$inject = ['$resource'];
//
//     function WLANGroup ($resource) {
//         var resourceUrl =  'api/w-lan-groups/:id';
//
//         return $resource(resourceUrl, {}, {
//             'query': { method: 'GET', isArray: true},
//             'get': {
//                 method: 'GET',
//                 transformResponse: function (data) {
//                     if (data) {
//                         data = angular.fromJson(data);
//                     }
//                     return data;
//                 }
//             },
//             'update': { method:'PUT' }
//         });
//     }
// })();

