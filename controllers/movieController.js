(function () {
    'use strict';
    angular.module('moduleController')
        .controller('movieController', moviesController)


    moviesController.$inject = ['movieServices','$sce','ngDialog','$rootScope'];

    function moviesController(movieServices,$sce, ngDialog, $rootScope ) {
        var ctrlMc = this;
        ctrlMc.movies = [];
        ctrlMc.images = [];
        ctrlMc.years = [];
        ctrlMc.genres = [];
        ctrlMc.page = 1;
        ctrlMc.year= 0;
        ctrlMc.genre = "";
        ctrlMc.favoritos = [];
        
        
        

        $rootScope.menuMovie=true;
        $rootScope.menuSerie =false;
        $rootScope.menuFav =false;

        

        ctrlMc.getAll = function () {
            movieServices.getAll(ctrlMc.year,ctrlMc.page,ctrlMc.genre ).then(function (resp) {
                ctrlMc.movies = resp.data.results;
                
            }, function (error) {
                    console.log(error);
                }
            );

        };

        ctrlMc.getConfiguration = function () {
            movieServices.getConfig().then(function (resp) {
                ctrlMc.images = resp.data.images;
                
            });
        }

        ctrlMc.selectYear = function () {
            var currentYear = new Date().getFullYear();
            ctrlMc.year = currentYear;
            var startYear = 1900;

            while (currentYear >= startYear) {
                ctrlMc.years.push(currentYear--);
            }
        }

        ctrlMc.getGenres = function() {
            movieServices.getGenres().then(function(resp){
                ctrlMc.genres = resp.data.genres;
                
            })
        }

        

        ctrlMc.watchTrailer = function (movie) {
            
            movieServices.getTrailer(movie.id).then(setTrailer);

            function setTrailer(resp) {
                var trailerId = resp.data.results[0].key;
                var url = $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + trailerId + '?rel=0&autoplay=1');
                
                ngDialog.open({
                    template: 'views/movies/trailers.html',
                    controller: function Ctrl() {
                        var vm = this;
                        vm.trailerUrl = url;
                        
                    },
                    controllerAs: 'vm'
                });
            }
        }


        ctrlMc.searchMovie = function(){
            movieServices.searchMovies(ctrlMc.q).then(function(resp){
                ctrlMc.movies = resp.data.results;
            })
        }

        ctrlMc.prevPage= function (){
            ctrlMc.page -= 1;
            
            ctrlMc.getAll();
        }

        ctrlMc.nextPage =function (){
            ctrlMc.page +=  1;
            
            ctrlMc.getAll();
        }

        ctrlMc.createFavs = function(){
            let aux = localStorage.getItem('favs');
            
            if ( aux == null) {
                ctrlMc.favoritos[0]=1;
                var fav = JSON.stringify(ctrlMc.favoritos);
                localStorage.setItem("favs",fav);
                
            } 
        }

        ctrlMc.addFav = function(serie){
           
            ctrlMc.favoritos = JSON.parse(localStorage.getItem('favs'));
          
            if (ctrlMc.favoritos[0]==1) {
                //ctrlSc.favoritos.push(serie);
                ctrlMc.favoritos[0]=serie;
                var fav = JSON.stringify(ctrlMc.favoritos);
                localStorage.setItem("favs", fav);
            }else{
                ctrlMc.favoritos.push(serie);
                //ctrlMc.favoritos[0]=serie;
                var fav = JSON.stringify(ctrlMc.favoritos);
                localStorage.setItem("favs", fav);
            }
            
        }



        ctrlMc.getGenres();
        ctrlMc.selectYear();
        ctrlMc.getConfiguration();
        ctrlMc.getAll();
        ctrlMc.createFavs();
    }
})();