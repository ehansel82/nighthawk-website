var app = angular.module("nighthawkApp", ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "app/home.htm"
    })
    .when("/schedule", {
        templateUrl : "app/schedule.htm"
    })
    .when("/about", {
        templateUrl : "app/about.htm"
    })
    .when("/demos", {
        templateUrl : "app/demos.htm",
        controller : "songCtrl"
    })
});

app.controller('navCtrl', ['$scope', function($scope) {
    $scope.isAboutActive = false;
    $scope.isScheduleActive = false;
    $scope.isHomeActive = false;
    $scope.isDemosActive = false;

    $scope.setScheduleActive = function(){
      $scope.clearAllActive();
      $scope.isScheduleActive = true;
    };

    $scope.setAboutActive = function(){
      $scope.clearAllActive();
      $scope.isAboutActive = true;
    };

    $scope.setHomeActive = function(){
      $scope.clearAllActive();
      $scope.isHomeActive = true;
    };

    $scope.setDemosActive = function(){
      $scope.clearAllActive();
      $scope.isDemosActive = true;
    };

    $scope.clearAllActive = function(){
      $scope.isAboutActive = false;
      $scope.isScheduleActive = false;
      $scope.isHomeActive = false;
      $scope.isDemosActive = false;
    };
}]);

app.controller('songCtrl', ['$scope', '$http', function($scope, $http) {
      $http.get("resources/demos.json")
        .then(function(response) {
            $scope.songs = response.data;
        });
}]);