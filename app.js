(function () {
    'use strict';

    var app = angular.module("ShowApp",[
        'ui.router',
        'moduleController',
        'moduleService'
        
        
    ]);

    app.config(function($stateProvider, $urlRouterProvider){

        $stateProvider

        .state('movies',{

            url:'/movies',
            templateUrl : "views/movies/main.html",
            controller: 'movieController',
            controllerAs: 'ctrlMc'

        })

        .state('series',{

            url:'/series',
            templateUrl : "views/series/main.html",
            controller: 'serieController'

        })

        .state('favoritos',{

            url:'/favs',
            templateUrl : 'view/favoritos/fav.html',
            controller: ''

        })
        $urlRouterProvider.otherwise('/movies');
    });
})();
