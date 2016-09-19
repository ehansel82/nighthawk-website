(function () {
    angular.module("nighthawkApp")
        .controller('homeController', ['$scope', 'scheduleFactory', homeController])

    function homeController($scope, scheduleFactory) {

        scheduleFactory.getAllShows()
            .then(function (response) {
                $scope.shows = scheduleFactory.filterUpcoming(response.data);
            });

    }
})();