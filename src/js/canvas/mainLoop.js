function mainLoop(player, shots, obstacles) {
    var gameStatsObj = gameStats(player.life);

    var interval = 50;

    Array.prototype.remove = function (item) {
        var indexOfItem = this.indexOf(item);

        if (indexOfItem > -1)
        {
            for (var index = 0; index < this.length; index++)
            {
                if(index === indexOfItem) {
                    array.splice(i, 1);
                }
            }
        }
    }

    var mainLoop = setInterval(function () {
        player.life--;
        gameStatsObj.setPlayerLife(player.life);
        gameStatsObj.lifeBarUpdate();

        shotsUpdate();
    }, interval);


    function shotsUpdate() {
        // Lifetime elapsed checking
        var shotIndexesForRemoval = [];

        for (var index in shots) {
            var currentShot = shots[index];

            if (currentShot.isForRemoving) {
                currentShot.animate.stop();
                currentShot.image.remove();
                shotIndexesForRemoval.push(index);
            }
        }

        for (var index in shotIndexesForRemoval) {
            // TO DO: remove correctly!
        }
    }
}