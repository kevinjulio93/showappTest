(function () {
    'use strict';
    angular
        .module('moduleService')
        .factory('movieServices', movieServices);
    
    movieServices.$inject = ['$http', 'API_URL', 'API_KEY', 'URL_IMG' ];

    function movieServices($http, API_URL, API_KEY) {
        return {
            getById: getById,
            getAll: getAll,
            getConfig: getConfig,
            getGenres: getGenres,
            // search: search,
            // getTrailers: getTrailers
        };

        function getById(id) {
            
            return $http.get(API_URL+'movie/'+id+'?api_key='+API_KEY);
        }

        function getAll(){
            return $http.get(API_URL +'discover/movie'+'?api_key='+API_KEY);
        }
        
        function getConfig() {
            var url = API_URL + 'configuration?api_key=' + API_KEY;
            console.log(url);
            return $http.get(url);
        }

        function getGenres(){
            return $http.get(API_URL+'genre/movie/list?api_key='+API_KEY);
        } 
    }
})();