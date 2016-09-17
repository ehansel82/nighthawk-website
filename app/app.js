var app = angular.module("nighthawkApp", ["ngRoute"]);

app.config(function ($routeProvider) {

    $routeProvider
        .when("/", {
            templateUrl: "app/home.htm"
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
            templateUrl: "app/songs.htm",
            controller: "songCtrl"
        })

});

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
        if($scope.demos[$index].isOpen === undefined){
            $scope.demos[$index].isOpen = true;
        } else {
            $scope.demos[$index].isOpen = !$scope.demos[$index].isOpen;
        }
    }
}]);

app.controller('aboutCtrl', ['$scope', function ($scope) {

    if($(window).width() <= 768){
        $scope.isBobOpen = false;
        $scope.isSteveOpen = false;
    } else {
        $scope.isBobOpen = true;
        $scope.isSteveOpen = true;        
    }

}]);

app.controller('songCtrl', ['$scope', '$http', function ($scope, $http) {

    $http.get("data/songs.json")
        .then(function (response) {
            $scope.songs = response.data;
            $scope.covers = getSongType('cover');
            $scope.originals = getSongType('original');
        });

    function getSongType(type) {
        return $scope.songs.filter(function (song) {
            return (song.type === type);
        })
    }

}]);

app.controller('scheduleCtrl', ['$scope', '$http', function ($scope, $http) {

    $http.get("data/schedule.json")
        .then(function (response) {
            $scope.shows = response.data;
            $scope.shows = $scope.shows.filter(schedFilter);
            $scope.shows.sort(schedCompare);
        });

    var schedFilter = function (show) {
        var twoDaysAgo = new moment().subtract(2, 'days');
        var schedDate = moment(show.date, "MM/DD/YYYY");
        if (schedDate > twoDaysAgo) {
            return true;
        }
    }

    var schedCompare = function (a, b) {
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

}]);