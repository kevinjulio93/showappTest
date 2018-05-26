(function () {
    'use strict';

    var app = angular.module("ShowApp",[
        'ui.router',
        'moduleService',
        'moduleController'
        
    ]);

    app.config(function($stateProvider, $urlRouterProvider){

        $stateProvider

        .state('movies',{

            url:'/movies',
            templateUrl : "views/movies/main.html",
            controller: ''

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
