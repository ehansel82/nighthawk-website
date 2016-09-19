(function () {
    angular.module("nighthawkApp")
        .factory('songFactory', ['$http', songFactory])

    function songFactory($http) {

        var songFactory = {};

        songFactory.getAllSongs = function () {
            return $http.get("data/songs.json");
        };

        songFactory.filterByType = function (songs, type) {
            return songs.filter(function (song) {
                return (song.type === type);
            })
        };

        songFactory.songSort = function (a, b) {
            if (a.artist < b.artist) {
                return -1;
            } else if (a.artist > b.artist) {
                return 1;
            } else {
                return 0;
            }
        }

        return songFactory;
    }
})();