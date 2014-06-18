function Game(images) {
	this.isGameOver = false;

    var stage = new Stage(images);
    var shotFactory = new ShotFactory(stage.shotImage, stage.playerLayer);
    var enemyFactory = new EnemyFactory(stage.enemyImage, stage.enemyLayer);
    var player = new Player(stage.playerImage, shotFactory);
    var obstacles = defineObstacles(stage.objectsOnStage);
    var gameSvgStatistics = gameStats(player.life);

    player.layer.moveDown();
    player.isBehindTrees = true;

    startMusic();
    eventsStart(player, obstacles);

    var mainLoop = setInterval(function () {
        if (player.life <= 0 && !this.isGameOver) {
            this.isGameOver = true;
            gameOver(stage.stage, player);
        }
        //shotFactory.shotsUpdate(player.life);
        //enemyFactory.enemiesUpdate(shotFactory.shots, player);
        shotsEnemiesColliding(shotFactory.shots, enemyFactory.enemies, player);
    }, 500);

    //var playerLifeDown = setInterval(function () {
    //    player.life -= 3;
    //    gameSvgStatistics.setPlayerLife(player.life);
    //    gameSvgStatistics.lifeBarUpdate();
    //}, 1000);

    var addNewEnemy = setInterval(function () {
        enemyFactory.createEnemy();
    }, 5000);

    function eventsStart(player, obstacles) {
        var playerMoving = new Kinetic.Animation(function (frame) {
            var timeDiff = frame.timeDiff;
            var nextPosition;

            if (timeDiff > 10) {
                switch (player.direction) {
                    case 'left':
                        nextPosition = { X: player.X - player.speed, Y: player.Y };
                        if (!isPlayerColliding(nextPosition, player, obstacles)) {
                            player.X -= player.speed;
                        }
                        break;
                    case 'up':
                        nextPosition = { X: player.X, Y: player.Y - player.speed };
                        if (!isPlayerColliding(nextPosition, player, obstacles)) {
                            player.Y -= player.speed;
                        }
                        break;
                    case 'right':
                        nextPosition = { X: player.X + player.speed, Y: player.Y };
                        if (!isPlayerColliding(nextPosition, player, obstacles)) {
                            player.X += player.speed;
                        }
                        break;
                    case 'down':
                        nextPosition = { X: player.X, Y: player.Y + player.speed };
                        if (!isPlayerColliding(nextPosition, player, obstacles)) {
                            player.Y += player.speed;
                        }
                        break;
                }
            }
        }, player.layer);

        $(document).keydown(function (event) {
            if (!playerMoving.isRunning()) {
                switch (event.keyCode) {
                    case 37:
                        player.image.animation('walkingLeft');
                        break;
                    case 38:
                        player.image.animation('walkingUp');
                        break;
                    case 39:
                        player.image.animation('walkingRight');
                        break;
                    case 40:
                        player.image.animation('walkingDown');
                        break;
                }
            }
        });

        $(document).keydown(function (event) {
            switch (event.keyCode) {
                case 32:
                    // space
                    player.shoot();
                    break;
                case 37:
                    if (!playerMoving.isRunning()) {
                        playerMoving.start();
                    }
                    break;
                case 38:
                    if (!playerMoving.isRunning()) {
                        playerMoving.start();
                    }
                    break;
                case 39:
                    if (!playerMoving.isRunning()) {
                        playerMoving.start();
                    }
                    break;
                case 40:
                    if (!playerMoving.isRunning()) {
                        playerMoving.start();
                    }
                    break;
            }
        });

        $(document).keyup(function (event) {
            switch (event.keyCode) {
                case 37:
                    playerMoving.stop();
                    player.image.animation('idleLeft');
                    player.layer.draw();
                    break;
                case 38:
                    playerMoving.stop();
                    player.image.animation('idleUp');
                    player.layer.draw();
                    break;
                case 39:
                    playerMoving.stop();
                    player.image.animation('idleRight');
                    player.layer.draw();
                    break;
                case 40:
                    playerMoving.stop();
                    player.image.animation('idleDown');
                    player.layer.draw();
                    break;
            }
        });
    }

    function gameOver(stage, player) {
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
}