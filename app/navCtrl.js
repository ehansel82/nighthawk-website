var app = angular.module('nighthawkApp',[]);

app.controller('navCtrl', ['$scope', '$location', function($scope, $location) {
    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
}]);