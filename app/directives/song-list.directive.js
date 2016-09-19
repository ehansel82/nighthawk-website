(function () {
    angular.module("nighthawkApp")
        .directive('songList', ['songFactory', songList])

    function songList(songFactory) {

        return {
            restrict: 'EA',
            scope: {
                type: '@',
                onDemoClick: '&'
            },
            templateUrl: 'app/directives/song-list.directive.html',
            link: function ($scope, element, attrs) {

                $scope.playDemo = function (index) {
                    $scope.onDemoClick({ selectedSong: $scope.songs[index] });
                }

                if ($scope.type === 'cover') {
                    $scope.title = 'Covers';
                } else {
                    $scope.title = 'Originals';
                }

                songFactory.getAllSongs()
                    .then(function (response) {
                        $scope.songs = songFactory.filterByType(response.data, $scope.type).sort(songFactory.songSort);
                    });
            }
        }

    }
})();