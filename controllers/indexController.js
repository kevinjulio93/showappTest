(function () {
    'use strict';
    angular.module('moduleController')
        .controller('indexController', indexController)

        indexController.$inject = ['$rootScope'];

    function indexController($rootScope) {
        $rootScope.menuMovie =false;
        $rootScope.menuSerie =false;
        $rootScope.menuFav =false;

        
    
    
    }
})();