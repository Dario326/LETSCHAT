angular.module("letsChat", ['ui.router'])
.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider
        .otherwise('/letsChat');
    $stateProvider
        .state('main', {
            url: '/letsChat',
            templateUrl: 'views/main-component.html',
            controller: "mainCtrl"
        })
})
.directive('navBar', function() {
    return {
        templateUrl: 'views/nav.html'

    }
});