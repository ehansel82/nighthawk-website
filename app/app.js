var app = angular.module("nighthawkApp", ["ngRoute"]);

app.config(function ($routeProvider) {

    $routeProvider
        .when("/", {
            templateUrl: "app/home.htm",
            controller: "homeCtrl"
        })
        .when("/schedule", {
            templateUrl: "app/schedule.htm",
            controller: "scheduleCtrl"
        })
        .when("/about", {
            templateUrl: "app/about.htm",
            controller: "aboutCtrl"
        })
        .when("/demos", {
            templateUrl: "app/demos.htm",
            controller: "demoCtrl"
        })
        .when("/songs", {
            templateUrl: "app/songs.htm"
        })

});

app.factory('songFactory', ['$http', function ($http) {

    var songFactory = {};

    songFactory.getAllSongs = function () {
        return $http.get("data/songs.json");
    };

    songFactory.filterByType = function (songs, type) {
        return songs.filter(function (song) {
            return (song.type === type);
        })
    };

    return songFactory;

}]);


app.factory('scheduleFactory', ['$http', function ($http) {

    var scheduleFactory = {};

    scheduleFactory.getAllShows = function () {
        return $http.get("data/schedule.json");
    }

    scheduleFactory.filterFuture = function (shows) {
        var filteredShows = shows.filter(futureFilter);
        filteredShows.sort(showCompare);
        return filteredShows;
    }

    scheduleFactory.filterUpcoming = function (shows) {
        var futureShows = shows.filter(futureFilter);
        var upcomingShows = shows.filter(upcomingFilter);
        upcomingShows.sort(showCompare);
        return upcomingShows;
    }

    function futureFilter(show) {
        var twoDaysAgo = new moment().subtract(2, 'days');
        var schedDate = moment(show.date, "MM/DD/YYYY");
        if (schedDate > twoDaysAgo) {
            return true;
        }
    }

    function upcomingFilter(show) {
        var upcomingThreshold = new moment().add(1, 'month');
        var schedDate = moment(show.date, "MM/DD/YYYY");
        if (schedDate <= upcomingThreshold) {
            return true;
        }
    }

    function showCompare(a, b) {
        var aDate = moment(a.date, "MM/DD/YYYY");
        var bDate = moment(b.date, "MM/DD/YYYY");

        if (a.date < b.date) {
            return -1;
        } else if (a.date > b.date) {
            return 1;
        } else {
            return 0;
        }
    }

    return scheduleFactory;

}]);

app.controller('navCtrl', ['$scope', function ($scope) {

    $scope.clearAllActive();
    $scope.setHomeActive();

    $scope.setScheduleActive = function () {
        $scope.clearAllActive();
        $scope.isScheduleActive = true;
    };

    $scope.setAboutActive = function () {
        $scope.clearAllActive();
        $scope.isAboutActive = true;
    };

    $scope.setHomeActive = function () {
        $scope.clearAllActive();
        $scope.isHomeActive = true;
    };

    $scope.setDemosActive = function () {
        $scope.clearAllActive();
        $scope.isDemosActive = true;
    };

    $scope.setSongsActive = function () {
        $scope.clearAllActive();
        $scope.isSongsActive = true;
    };

    $scope.clearAllActive = function () {
        $scope.isAboutActive = false;
        $scope.isScheduleActive = false;
        $scope.isHomeActive = false;
        $scope.isDemosActive = false;
        $scope.isSongsActive = false;
    };

}]);

app.controller('demoCtrl', ['$scope', '$http', function ($scope, $http) {
    $http.get("data/demos.json")
        .then(function (response) {
            $scope.demos = response.data;
        });

    $scope.toggleOpen = function ($index) {
        if ($scope.demos[$index].isOpen === undefined) {
            $scope.demos[$index].isOpen = true;
        } else {
            $scope.demos[$index].isOpen = !$scope.demos[$index].isOpen;
        }
    }
}]);

app.controller('aboutCtrl', ['$scope', function ($scope) {

    if ($(window).width() <= 768) {
        $scope.isBobOpen = false;
        $scope.isSteveOpen = false;
    } else {
        $scope.isBobOpen = true;
        $scope.isSteveOpen = true;
    }

}]);

app.controller('scheduleCtrl', ['$scope', 'scheduleFactory', function ($scope, scheduleFactory) {

    scheduleFactory.getAllShows()
        .then(function (response) {
            $scope.shows = scheduleFactory.filterFuture(response.data);
        });

}]);

app.controller('homeCtrl', ['$scope', 'scheduleFactory', function ($scope, scheduleFactory) {

    scheduleFactory.getAllShows()
        .then(function (response) {
            $scope.shows = scheduleFactory.filterUpcoming(response.data);
        });

}]);

app.directive('songList', ['songFactory', function (songFactory) {
    return {
        restrict: 'EA',
        scope: {
            type: '@'
        },
        templateUrl: 'app/songListDirective.htm',
        link: function ($scope, element, attrs) {

            if ($scope.type === 'cover') {
                $scope.title = 'Covers';
            } else {
                $scope.title = 'Originals';
            }

            songFactory.getAllSongs()
                .then(function (response) {
                    $scope.songs = songFactory.filterByType(response.data, $scope.type);
                });
        }
    }
}]);