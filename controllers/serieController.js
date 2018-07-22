(function () {
    'use strict';
    angular.module('moduleController')
        .controller('serieController', serieController)


    serieController.$inject = ['serieServices','$sce','ngDialog','$rootScope'];

    function serieController(serieServices, $sce, ngDialog, $rootScope ) {
        var ctrlSc = this;
        ctrlSc.series = [];
        ctrlSc.images = [];
        ctrlSc.years = [];
        ctrlSc.genres = [];
        ctrlSc.parameters = {};
        ctrlSc.page = 1;
        ctrlSc.year= 0;
        ctrlSc.genre = "";
        ctrlSc.favoritos = [];
        

        $rootScope.menuMovie =false;
        $rootScope.menuSerie =true;
        $rootScope.menuFav =false;

        ctrlSc.getAll = function () {
            serieServices.getAll(ctrlSc.year, ctrlSc.page, ctrlSc.genre ).then(function (resp) {
                ctrlSc.series = resp.data.results;
                
            }, function (error) {
                    console.log(error);
                }
            );

        };

        ctrlSc.getConfiguration = function () {
            serieServices.getConfig().then(function (resp) {
                ctrlSc.images = resp.data.images;
                
            });
        }

        ctrlSc.selectYear = function () {
            var currentYear = new Date().getFullYear();
            ctrlSc.parameters.year = currentYear;
            var startYear = 1900;

            while (currentYear >= startYear) {
                ctrlSc.years.push(currentYear--);
            }
        }

        ctrlSc.getGenres = function() {
            serieServices.getGenres().then(function(resp){
                ctrlSc.genres = resp.data.genres;
                
            })
        }


        ctrlSc.watchTrailer = function (serie) {
            
            serieServices.getTrailer(serie.id).then(setTrailer);

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

        
        ctrlSc.searchSerie = function(){
            serieServices.searchSeries(ctrlSc.q).then(function(resp){
                ctrlSc.series = resp.data.results;
            })
        }

        ctrlSc.prevPage= function (){
            ctrlSc.page -= 1;
            
            ctrlSc.getAll();
        }

        ctrlSc.nextPage =function (){
            ctrlSc.page +=  1;
            
            ctrlSc.getAll();
        }

        ctrlSc.createFavs = function(){
            let aux = localStorage.getItem('favs');
            
            if ( aux == null) {
                ctrlSc.favoritos[0]=1;
                var fav = JSON.stringify(ctrlSc.favoritos);
                localStorage.setItem("favs",fav);
                
            } 
        }

        ctrlSc.addFav = function(serie){
           
            ctrlSc.favoritos = JSON.parse(localStorage.getItem('favs'));
          
            if (ctrlSc.favoritos[0]==1) {
                //ctrlSc.favoritos.push(serie);
                ctrlSc.favoritos[0]=serie;
                var fav = JSON.stringify(ctrlSc.favoritos);
                localStorage.setItem("favs", fav);
            }else{
                ctrlSc.favoritos.push(serie);
                //ctrlMc.favoritos[0]=serie;
                var fav = JSON.stringify(ctrlSc.favoritos);
                localStorage.setItem("favs", fav);
            }
            
        }



        ctrlSc.getGenres();
        ctrlSc.selectYear();
        ctrlSc.getConfiguration();
        ctrlSc.getAll();
        ctrlSc.createFavs();
    }
})();