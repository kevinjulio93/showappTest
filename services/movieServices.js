(function () {
    'use strict';
    angular
        .module('moduleService')
        .factory('movieServices', movieServices);
    
    movieServices.$inject = ['$http', 'API_URL', 'API_KEY'];

    function movieServices($http, API_URL, API_KEY) {
        return {
            getById: getById,
            getAll: getAll,
            // getGenres: getGenres,
            // search: search,
            // getTrailers: getTrailers
        };

        function getById(id) {
            var url = API_URL+'movie/'+id+'?api_key='+API_KEY;
            return $http.get(url);
        }

        function getAll(params){
            return $http.get(API_URL + 'discover/movie'+'?api_key='+API_KEY);
        }
        
    }
})();