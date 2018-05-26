(function () {
    'use strict';
    angular
        .module('moduleService')
        .factory('moviesServices', moviesServices);
    
    moviesServices.$inject = ['$http', 'API_URL', 'API_KEY'];

    function moviesServices($http, URL_TMDB, API_KEY) {
        return {
            getById: getById,
            getAll: getAll,
            getGenres: getGenres,
            search: search,
            getTrailers: getTrailers
        };

        function getById(id) {
            var url = API_URL+'/movie'+id+API_KEY;
        }
        
    }
})();