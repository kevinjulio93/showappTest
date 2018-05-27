(function () {
    'use strict';
    angular.module('moduleController')
        .controller('movieController', moviesController)


    moviesController.$inject = ['movieServices', 'URL_IMG'];

    function moviesController(movieServices) {
        var ctrlMc = this;
        ctrlMc.movies = [];
        ctrlMc.images = [];
        ctrlMc.years = [];
        ctrlMc.genres = [];

        ctrlMc.getAll = function () {
            movieServices.getAll().then(function (resp) {
                ctrlMc.movies = resp.data.results;
                /* console.log(ctrlMc.movies); */
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
            var startYear = 1900;

            while (currentYear >= startYear) {
                ctrlMc.years.push(currentYear--);
            }
        }

        ctrlMc.getGenres = function() {
            movieServices.getGenres().then(function(resp){
                ctrlMc.genres = resp.data.genres;
                console.log(ctrlMc.genres);
            })
        }






        ctrlMc.getGenres();
        ctrlMc.selectYear();
        ctrlMc.getConfiguration();
        ctrlMc.getAll();
    }
})();