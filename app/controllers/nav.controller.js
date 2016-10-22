(function () {
    angular.module("nighthawkApp")
        .controller('navController', navController)

    function navController() {

        var vm = this;

        vm.setScheduleActive = function () {
            vm.clearAllActive();
            vm.isScheduleActive = true;
        };

        vm.setAboutActive = function () {
            vm.clearAllActive();
            vm.isAboutActive = true;
        };

        vm.setHomeActive = function () {
            vm.clearAllActive();
            vm.isHomeActive = true;
        };

        vm.setSongsActive = function () {
            vm.clearAllActive();
            vm.isSongsActive = true;
        };

        vm.setPhotosActive = function () {
            vm.clearAllActive();
            vm.isPhotosActive = true;
        };

        vm.clearAllActive = function () {
            vm.isAboutActive = false;
            vm.isScheduleActive = false;
            vm.isHomeActive = false;
            vm.isSongsActive = false;
            vm.isPhotosActive = false;
        };

        vm.clearAllActive();
        vm.setHomeActive();
    }
})();