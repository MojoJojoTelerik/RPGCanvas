function events(player, obstacles, isGameOver) {
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
        if (isGameOver()) {
            event.preventDefault();
            return false;
        }
        else if (!playerMoving.isRunning()) {
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
        if (isGameOver()) {
            event.preventDefault();
            return false;
        }
        else {
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
        }
    });

    $(document).keyup(function (event) {
        if (isGameOver()) {
            event.preventDefault();
            return false;
        } else {
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
        }
    });

    return {
        'playerMoving': playerMoving
    }
}