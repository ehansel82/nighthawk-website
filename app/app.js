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
});

app.controller('navCtrl', ['$scope', function($scope) {
    $scope.isAboutActive = false;
    $scope.isScheduleActive = false;
    $scope.isHomeActive = false;

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

    $scope.clearAllActive = function(){
      $scope.isAboutActive = false;
      $scope.isScheduleActive = false;
      $scope.isHomeActive = false;
    };
}]);