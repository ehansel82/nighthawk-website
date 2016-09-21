(function () {
    angular.module("nighthawkApp")
        .controller('homeController', ['scheduleFactory', homeController])

    function homeController(scheduleFactory) {
        
        var vm = this;
        
        scheduleFactory.getAllShows()
            .then(function (response) {
                vm.shows = scheduleFactory.filterUpcoming(response.data);
            });

    }
})();