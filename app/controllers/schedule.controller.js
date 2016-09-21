(function () {
    angular.module("nighthawkApp")
        .controller('scheduleController', ['scheduleFactory', scheduleController])

    function scheduleController(scheduleFactory) {

        var vm = this;

        scheduleFactory.getAllShows()
            .then(function (response) {
                vm.shows = scheduleFactory.filterFuture(response.data);
            });

    }
})();