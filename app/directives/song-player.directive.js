(function () {
    angular.module("nighthawkApp")
        .directive('songPlayer', songPlayer)

    function songPlayer() {

        return {
            restrict: 'E',
            scope: {
            },
            templateUrl: 'app/directives/song-player.directive.html',
            link: function ($scope, element, attrs) {
                $scope.$on('playSong', function (event, mass) {
                    $scope.demoPath = mass.demoPath;
                    $scope.title = mass.title;
                    $(element).find('audio')[0].trigger('pause');
                    $(element).find('audio')[0].trigger('load');
                    $(element).find('audio')[0].trigger('play');
                });

                $scope.$on('stopSong', function () {
                    $(element).find('audio').trigger[0]('pause');
                });
            }
        }

    }
})();