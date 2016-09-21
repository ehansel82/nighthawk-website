(function () {
    angular.module("nighthawkApp")
        .controller('songController', ['$scope', '$sce', songController])

    function songController($scope, $sce) {

        var vm = this;

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