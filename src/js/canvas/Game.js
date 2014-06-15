﻿function Game(images) {
    var stage = new Stage(images);
    var enemies = [
        new Enemy(stage.enemyImage,300,300),
        new Enemy(stage.enemyImage,300,500)
    ];
    var shotFactory = new ShotFactory(stage.shotImage, stage.playerLayer, enemies);
    var player = new Player(stage.playerImage, shotFactory);
    var obstacles = defineObstacles(stage.objectsOnStage);
    var gameSvgStatistics = gameStats(player.life);

    player.layer.moveDown();
    player.isBehindTrees = true;

    events(player, obstacles);

    var mainLoop = setInterval(function () {
        shotFactory.checkShotsLifeTimeElapsed();
    }, 50);

    var playerLifeDown = setInterval(function () {
        player.life--;
        gameSvgStatistics.setPlayerLife(player.life);
        gameSvgStatistics.lifeBarUpdate();
    }, 100);

    var addNewEnemy = setInterval(function () {
        enemies += new Enemy(stage.enemyImage,250,450);
    }, 5000);

    function events(player, obstacles) {
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

        $(document).keydown(function (evt) {
            if (!playerMoving.isRunning()) {
                switch (evt.keyCode) {
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

        $(document).keydown(function (evt) {
            switch (evt.keyCode) {
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

        $(document).keyup(function (evt) {
            switch (evt.keyCode) {
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
}
