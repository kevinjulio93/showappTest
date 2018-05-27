(function () {
    'use strict';
    angular.module('moduleController')
        .controller('movieController', moviesController)

    moviesController.$inject = ['movieServices'];

    function moviesController(movieServices) {
        var ctrlMc = this;
        // vm.years = [];
        // vm.genres = [];
        
        ctrlMc.getAll=function () {
            movieServices.getAll().then(function(resp){
                console.log(resp.data);
            },function(error){
                console.log(error);
            });

        };

        ctrlMc.getAll();

        

        
    }
})();