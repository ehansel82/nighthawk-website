(function () {
    angular.module("nighthawkApp")
        .factory('scheduleFactory', ['$http', scheduleFactory])

    function scheduleFactory($http) {

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
            if (a.date < b.date) {
                return -1;
            } else if (a.date > b.date) {
                return 1;
            } else {
                return 0;
            }
        }

        return scheduleFactory;

    }
})();