(function () {
    'use strict';
    angular.module('moduleController')
        .controller('favoritoController', favoritoController)
        
        

        favoritoController.$inject = ['movieServices','serieServices' ,'$sce', 'ngDialog', '$rootScope'];

    function favoritoController(movieServices,serieServices,$sce, ngDialog, $rootScope) {
        var ctrlFv = this;
        ctrlFv.favoritos = [];
        ctrlFv.years = [];
        ctrlFv.year= 0;
        ctrlFv.genre = "";
        ctrlFv.nombre = "";
        ctrlFv.images = [];


        $rootScope.menuMovie =false;
        $rootScope.menuSerie =false;
        $rootScope.menuFav =true;


        ctrlFv.selectYear = function () {
            var currentYear = new Date().getFullYear();
            var startYear = 1900;

            while (currentYear >= startYear) {
                ctrlFv.years.push(currentYear--);
            }
        }

        ctrlFv.getGenres = function () {
            movieServices.getGenres().then(function (resp) {
                ctrlFv.genres = resp.data.genres;
                
            })
        }


        ctrlFv.getAll = function () {
            ctrlFv.favoritos = JSON.parse(localStorage.getItem('favs'));
            
            

        }

        ctrlFv.getConfiguration = function () {
            movieServices.getConfig().then(function (resp) {
                ctrlFv.images = resp.data.images;
        
            });
        }

        ctrlFv.searchSerie = function(){
            serieServices.searchSeries(ctrlSc.q).then(function(resp){
                ctrlSc.series = resp.data.results;
            })
        }

        ctrlFv.watchTrailer = function (fav) {
            
            movieServices.getTrailer(fav.id).then(setTrailer);

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

        ctrlFv.getAll();
        ctrlFv.getGenres();     
        ctrlFv.selectYear();
        ctrlFv.getConfiguration();
    }
})();