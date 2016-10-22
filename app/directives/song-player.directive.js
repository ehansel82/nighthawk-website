(function () {
    angular.module("nighthawkApp")
        .directive('songPlayer', songPlayer)

    function songPlayer() {

        return {
            restrict: 'E',
            scope: {
            },
            templateUrl: 'app/directives/song-player.directive.html',
            controller: function ($scope) {
                $scope.stopDemo = function () {
                    $scope.$broadcast('stopSong');
                }
            },
            link: function ($scope, $element, attrs) {
                angular.element('#song-player-close').on('click', function(){
                    angular.element($element.find('audio')[0]).trigger('pause');
                    $scope.playingSong = false;
                    $scope.$apply();
                });

                $scope.$on('playSong', function (event, mass) {
                    $scope.playingSong = true;
                    $scope.demoPath = mass.demoPath;
                    $scope.title = mass.title;

                    angular.element($element.find('audio')[0]).trigger('pause');
                    angular.element($element.find('audio')[0]).trigger('load');
                    angular.element($element.find('audio')[0]).trigger('play');

                });

                $scope.$on('stopSong', function () {
                    angular.element($element.find('audio')[0]).trigger('pause');
                    $scope.playingSong = false;
                });
            }
        }

    }
})();