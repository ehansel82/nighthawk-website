(function () {
    angular.module("nighthawkApp")
        .controller('scheduleController', ['$scope', 'scheduleFactory', scheduleController])

    function scheduleController($scope, scheduleFactory) {

        scheduleFactory.getAllShows()
            .then(function (response) {
                $scope.shows = scheduleFactory.filterFuture(response.data);
            });

    }
})();