(function () {
    'use strict';
    angular.module('moduleController')
        .controller('favoritoController', favoritoController)
        
        

        favoritoController.$inject = ['movieServices','serieServices' ,'$sce', 'ngDialog'];

    function favoritoController(movieServices,serieServices,$sce, ngDialog) {
        var ctrlFv = this;
        ctrlFv.favoritos = [];
        ctrlFv.years = [];
        ctrlFv.year= 0;
        ctrlFv.genre = "";
        ctrlFv.nombre = "";
        ctrlFv.images = [];


        ctrlFv.selectYear = function () {
            var currentYear = new Date().getFullYear();
            ctrlFv.year = currentYear;
            var startYear = 1900;

            while (currentYear >= startYear) {
                ctrlFv.years.push(currentYear--);
            }
        }

        ctrlFv.getGenres = function () {
            movieServices.getGenres().then(function (resp) {
                ctrlFv.genres = resp.data.genres;
                console.log(ctrlFv.genres);
            })
        }


        ctrlFv.getAll = function () {
            ctrlFv.favoritos = JSON.parse(localStorage.getItem('favs'));
            
            console.log(ctrlFv.favoritos);

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


        ctrlFv.getAll();
        ctrlFv.getGenres();     
        ctrlFv.selectYear();
        ctrlFv.getConfiguration();
    }
})();