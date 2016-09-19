(function () {
    angular.module("nighthawkApp")
        .controller('navController', ['$scope', navController])

    function navController($scope) {

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

        $scope.setSongsActive = function () {
            $scope.clearAllActive();
            $scope.isSongsActive = true;
        };

        $scope.clearAllActive = function () {
            $scope.isAboutActive = false;
            $scope.isScheduleActive = false;
            $scope.isHomeActive = false;
            $scope.isSongsActive = false;
        };

        $scope.clearAllActive();
        $scope.setHomeActive();
    }
})();