function Game(images) {
    var isGameOver = false;

    var isGameOverByRef = function ()
    {
        return isGameOver;
    };

    var stage = new Stage(images);
    var shotFactory = new ShotFactory(stage.shotImage, stage.playerLayer);
    var enemyFactory = new EnemyFactory(stage.enemyImage, stage.enemyLayer);
    var player = new Player(stage.playerImage, shotFactory);
    var obstacles = defineObstacles(stage.objectsOnStage);
    var gameSvgStatistics = gameStats(player.life);

    player.layer.moveDown();
    player.isBehindTrees = true;

    startMusic();
    var eventsPlayer = events(player, obstacles, isGameOverByRef);

    var collisionChekingShotsEnemies = setInterval(function () {
        shotsEnemiesColliding(shotFactory.shots, enemyFactory.enemies, stage.enemyLayer, player);
    }, 5);

    var playerLifeDown = setInterval(function () {
        player.life -= 5;

        gameSvgStatistics.setPlayerLife(player.life);
        gameSvgStatistics.lifeBarUpdate();

        if (player.life <= 0 && !isGameOver) {
            isGameOver = true;
            gameOver(stage.stage, player);
        }
    }, 1000);

    var addNewEnemy = setInterval(function () {
        enemyFactory.createEnemy();
    }, 5000);

    function gameOver(stage, player) {
        clearInterval(addNewEnemy);
        clearInterval(playerLifeDown);
        clearInterval(collisionChekingShotsEnemies);
        player.image.stop();
        eventsPlayer.playerMoving.stop();

        displayPopUp(stage);

        function displayPopUp(stage) {
            var gameOverLayer = new Kinetic.Layer();

            var gameOverText = new Kinetic.Text({
                x: 0,
                y: 0,
                text: 'GAME OVER\n\n\This is the end of the road for you. Try better next time.',
                fontSize: 25,
                fontFamily: 'Calibri',
                fontStyle: '500',
                fill: '#F5009F',
                width: 380,
                padding: 20,
                align: 'center'
            });

            var rect = new Kinetic.Rect({
                x: 0,
                y: 0,
                stroke: '#555',
                strokeWidth: 5,
                fill: 'black',
                width: 380,
                height: gameOverText.height(),
                shadowColor: 'black',
                shadowBlur: 10,
                shadowOffset: { x: 10, y: 10 },
                shadowOpacity: 0.8,
                cornerRadius: 10
            });

            var gameOverRectX = stage.getWidth() / 2 - 380 / 2;
            var gameOverRectY = stage.getHeight() / 2 - gameOverText.height() / 2;

            gameOverText.setX(gameOverRectX);
            gameOverText.setY(gameOverRectY);
            rect.setX(gameOverRectX);
            rect.setY(gameOverRectY);

            gameOverLayer.add(rect);
            gameOverLayer.add(gameOverText);
            stage.add(gameOverLayer);

            gameOverLayer.draw();
        }
    }

    function startMusic() {
        var audio = $("audio")[0];
        audio.play();
        audio.volume = 0.5;

        var sliderVolume = document.getElementById('slider-volume');
        sliderVolume.onchange = function () {
            audio.volume = sliderVolume.value;
        }
    }

    Array.prototype.clone = function () {
        return this.slice(0);
    };

    // clone object: jQuery.extend(true, {}, shots);
}