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
            controller: 'movieController'

        })

        .state('series',{

            url:'/series',
            templateUrl : "views/series/main.html",
            controller: ''

        })

        .state('favoritos',{

            url:'/favs',
            templateUrl : '',
            controller: ''

        })
        $urlRouterProvider.otherwise('/movies');
    });
})();
