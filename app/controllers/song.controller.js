(function () {
    angular.module("nighthawkApp")
        .controller('songController', ['$scope', '$sce', songController])

    function songController($scope, $sce) {

        $scope.playDemo = function (song) {
            $sce.trustAsResourceUrl(song.demoPath);
            $scope.song = song;
            $scope.$broadcast('playSong', song);
        }

        $scope.stopDemo = function () {
            $scope.$broadcast('stopSong');
            $scope.song = null;
        }

    }
})();