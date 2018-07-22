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
            searchMovies : searchMovies,
            getTrailer:getTrailer,
           
        };

        function getById(id) {
            
            return $http.get(API_URL+'movie/'+id+'?api_key='+API_KEY);
        }

        function getAll(year, page, genre){
            return $http.get(API_URL +'discover/movie'+'?api_key='+API_KEY +'&year='+year+'&page='+page+'&with_genres='+genre);
        }
        
        function getConfig() {
            var url = API_URL + 'configuration?api_key=' + API_KEY;
            
            return $http.get(url);
        }

        function getGenres(){
            return $http.get(API_URL+'genre/movie/list?api_key='+API_KEY);
        } 

        function searchMovies(q){
            return $http.get(API_URL + 'search/movie' +'?api_key=' + API_KEY+'&query='+q );
        }

        function getTrailer(id){
            return $http.get(API_URL + 'movie/' + id + '/videos?api_key='+API_KEY  );
        }
    }
})();