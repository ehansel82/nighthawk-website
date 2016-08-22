var app = angular.module("nighthawkApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "app/main.htm"
    })
    .when("/red", {
        templateUrl : "app/red.htm"
    })
});