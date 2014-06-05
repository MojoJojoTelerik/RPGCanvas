function mainLoop(player, obstacles, shots) {
    var gameStatsObj = gameStats(player.life);

    var interval = 50;

    player.image.getLayer().moveDown();

    var mainLoop = setInterval(function () {
        lifeUpdate();
        shotsUpdate();
        //playerCollisionsCheck();
    }, interval);

    function lifeUpdate() {
        player.life--;
        gameStatsObj.setPlayerLife(player.life);
        gameStatsObj.lifeBarUpdate();
    }

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