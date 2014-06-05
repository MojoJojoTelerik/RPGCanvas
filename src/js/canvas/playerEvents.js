function playerEvents(player, playerLayer) {
    var speed = 3;

    var playerMoving = new Kinetic.Animation(function (frame) {
        var timeDiff = frame.timeDiff;

        if (timeDiff > 10) {
            switch (player.image.animation()) {
                case 'idleLeft':
                case 'walkingLeft':
                    player.X -= speed;
                    break;
                case 'idleUp':
                case 'walkingUp':
                    player.Y -= speed;
                    break;
                case 'idleRight':
                case 'walkingRight':
                    player.X += speed;
                    break;
                case 'idleDown':
                case 'walkingDown':
                    player.Y += speed;
                    break;
            }
        }
    }, playerLayer);

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
                playerLayer.draw();
                break;
            case 38:
                playerMoving.stop();
                player.image.animation('idleUp');
                playerLayer.draw();
                break;
            case 39:
                playerMoving.stop();
                player.image.animation('idleRight');
                playerLayer.draw();
                break;
            case 40:
                playerMoving.stop();
                player.image.animation('idleDown');
                playerLayer.draw();
                break;
        }
    });
}