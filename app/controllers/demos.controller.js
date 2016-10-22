(function () {
    angular.module("nighthawkApp")
        .controller('demosController', ['$scope', '$sce', demosController])

    function demosController($scope, $sce) {

        var vm = this;

        vm.playingSong = false;

        vm.playDemo = function (song) {
            $sce.trustAsResourceUrl(song.demoPath);
            vm.song = song;
            $scope.$broadcast('playSong', song);
        }

        vm.stopDemo = function () {
            $scope.$broadcast('stopSong');
            vm.song = null;
        }

    }
})();