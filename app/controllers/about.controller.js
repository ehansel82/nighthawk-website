(function () {
    angular.module("nighthawkApp")
        .controller('aboutController', ['$scope', aboutController])

    function aboutController($scope) {

        if ($(window).width() <= 768) {
            $scope.isBobOpen = false;
            $scope.isSteveOpen = false;
        } else {
            $scope.isBobOpen = true;
            $scope.isSteveOpen = true;
        }

    }
})();