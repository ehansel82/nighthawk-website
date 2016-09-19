(function () {
    angular.module("nighthawkApp")
        .config(['$routeProvider', config]);

    function config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "app/views/home.html",
                controller: "homeController"
            })
            .when("/schedule", {
                templateUrl: "app/views/schedule.html",
                controller: "scheduleController"
            })
            .when("/about", {
                templateUrl: "app/views/about.html",
                controller: "aboutController"
            })
            .when("/songs", {
                templateUrl: "app/views/songs.html",
                controller: "songController"
            })
    }
})();