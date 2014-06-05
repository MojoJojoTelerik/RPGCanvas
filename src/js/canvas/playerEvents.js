function playerEvents(player, obstacles) {
    var pinkTreeBottomRectangle = new Kinetic.Rect({
        x: obstacles.pinkTree.getX() + 45,
        y: obstacles.pinkTree.getY() + 100,
        width: 30,
        height: 20
    });

    var greenTreeBottomRectangle = new Kinetic.Rect({
        x: obstacles.greenTree.getX() + 45,
        y: obstacles.greenTree.getY() + 100,
        width: 30,
        height: 20
    });

    var brownTreeBottomRectangle = new Kinetic.Rect({
        x: obstacles.brownTree.getX() + 45,
        y: obstacles.brownTree.getY() + 100,
        width: 30,
        height: 20
    });

    var objects =  {
        'pinkTreeBottomRectangle': pinkTreeBottomRectangle,
        'greenTreeBottomRectangle': greenTreeBottomRectangle,
        'brownTreeBottomRectangle': brownTreeBottomRectangle,
        'rock': obstacles.rock
    };

    var playerMoving = new Kinetic.Animation(function (frame) {
        var timeDiff = frame.timeDiff;
        var nextPosition;

        if (timeDiff > 10) {
            switch (player.image.animation()) {
                case 'idleLeft':
                case 'walkingLeft':
                    nextPosition = { X: player.X - player.speed, Y: player.Y};
                    if (!isPlayerColliding(nextPosition, player, objects)) {
                        player.X -= player.speed;
                    }
                    break;
                case 'idleUp':
                case 'walkingUp':
                    nextPosition = { X: player.X, Y: player.Y - player.speed };
                    if (!isPlayerColliding(nextPosition, player, objects)) {
                        player.Y -= player.speed;
                    }
                    break;
                case 'idleRight':
                case 'walkingRight':
                    nextPosition = { X: player.X + player.speed, Y: player.Y };
                    if (!isPlayerColliding(nextPosition, player, objects)) {
                        player.X += player.speed;
                    }
                    break;
                case 'idleDown':
                case 'walkingDown':
                    nextPosition = { X: player.X, Y: player.Y + player.speed };
                    if (!isPlayerColliding(nextPosition, player, objects)) {
                        player.Y += player.speed;
                    }
                    break;
            }
        }
    }, player.image.getLayer());

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
                player.image.getLayer().draw();
                break;
            case 38:
                playerMoving.stop();
                player.image.animation('idleUp');
                player.image.getLayer().draw();
                break;
            case 39:
                playerMoving.stop();
                player.image.animation('idleRight');
                player.image.getLayer().draw();
                break;
            case 40:
                playerMoving.stop();
                player.image.animation('idleDown');
                player.image.getLayer().draw();
                break;
        }
    });
}