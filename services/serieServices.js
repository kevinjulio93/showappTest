(function () {
    'use strict';
    angular
        .module('moduleService')
        .factory('serieServices', serieServices);
    
    serieServices.$inject = ['$http', 'API_URL', 'API_KEY' ];

    function serieServices($http, API_URL, API_KEY) {
        return {
            getById: getById,
            getAll: getAll,
            getConfig: getConfig,
            getGenres: getGenres,
            searchSeries : searchSeries,
            getTrailer : getTrailer,
            
        };

        function getById(id) {
            
            return $http.get(API_URL+'tv/'+id+'?api_key='+API_KEY);
        }

        function getAll(year, page, genre){
            
            return $http.get(API_URL +'discover/tv'+'?api_key='+API_KEY +'&first_air_date_year='+year+'&page='+page+'&with_genres='+genre);
        }
        
        function getConfig() {
            var url = API_URL + 'configuration?api_key=' + API_KEY;
            console.log(url);
            return $http.get(url);
        }

        function getGenres(){
            return $http.get(API_URL+'genre/tv/list?api_key='+API_KEY);
        } 

        function searchSeries(q){
            return $http.get(API_URL + 'search/tv' +'?api_key=' + API_KEY+'&query='+q );
        }

        function getTrailer(id){
            return $http.get(API_URL + 'tv/' + id + '/videos?api_key='+API_KEY  );
        }
    }
})();