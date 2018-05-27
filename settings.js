(function () {
    'use strict';

    angular
        .module('ShowApp')
        .constant('API_URL', 'https://api.themoviedb.org/3/')
        .constant('URL_IMG', 'https://image.tmdb.org/t/p/')
        .constant('API_KEY', '75f10803a577a3232cab8891827768fa');
})();