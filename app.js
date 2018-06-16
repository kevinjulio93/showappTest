(function () {
    'use strict';

    var app = angular.module("ShowApp",[
        'ui.router',
        'moduleController',
        'moduleService',
        'ngDialog'
        
        
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
            controller: 'serieController',
            controllerAs: 'ctrlSc'

        })

        .state('favoritos',{

            url:'/favoritos',
            templateUrl : 'views/favoritos/main.html',
            controller: 'favoritoController',
            controllerAs: 'ctrlFv'

        })
        $urlRouterProvider.otherwise('/movies');
    });
})();
