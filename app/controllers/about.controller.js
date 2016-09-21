(function () {
    angular.module("nighthawkApp")
        .controller('aboutController', ['$scope', aboutController])

    function aboutController($window) {

        var vm = this;

        if ($(window).width() <= 768) {
            vm.isBobOpen = false;
            vm.isSteveOpen = false;
        } else {
            vm.isBobOpen = true;
            vm.isSteveOpen = true;
        }

    }
})();