(function () {
    angular.module("nighthawkApp")
        .config(['$routeProvider', config]);

    function config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "app/views/home.html",
                controller: "homeController as vm"
            })
            .when("/schedule", {
                templateUrl: "app/views/schedule.html",
                controller: "scheduleController as vm"
            })
            .when("/about", {
                templateUrl: "app/views/about.html",
                controller: "aboutController as vm"
            })
            .when("/demos", {
                templateUrl: "app/views/demos.html",
                controller: "demosController as vm"
            })
            .when("/songs", {
                templateUrl: "app/views/songs.html"
            })
            .when("/photos", {
                templateUrl: "app/views/photos.html"
            })
    }
})();