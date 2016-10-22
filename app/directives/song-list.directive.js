(function () {
    angular.module("nighthawkApp")
        .directive('songList', ['songFactory', songList])

    function songList(songFactory) {

        return {
            restrict: 'EA',
            scope: {
                title: '@',
                onDemoClick: '&',
                restrict: '@'
            },
            templateUrl: 'app/directives/song-list.directive.html',
            link: function ($scope, element, attrs) {

                $scope.playDemo = function (index) {
                    $scope.onDemoClick({ selectedSong: $scope.songs[index] });
                }

                songFactory.getAllSongs()
                    .then(function (response) {
                        if ($scope.restrict === 'demos') {
                            $scope.songs = songFactory.onlyDemos(response.data, $scope.type).sort(songFactory.songSort);
                        } else {
                            $scope.songs = response.data.sort(songFactory.songSort);
                        }

                    });
            }
        }

    }
})();