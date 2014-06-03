function playerEvents(player, playerLayer) {
    var move = 3;

    var fired = false;

    $(document).keydown(function (evt) {
        switch (evt.keyCode) {
            case 37:
                player.setX(player.getPosition().x - move);
                break;
            case 38:
                player.setY(player.getPosition().y - move);
                break;
            case 39:
                player.setX(player.getPosition().x + move);
                break;
            case 40:
                player.setY(player.getPosition().y + move);
                break;
        }
    });

    $(document).keydown(function (evt) {
        if (!fired) {
            fired = true;
            switch (evt.keyCode) {
                case 37:
                    player.animation('walkingLeft');
                    player.start();
                    break;
                case 38:
                    player.animation('walkingUp');
                    player.start();
                    break;
                case 39:
                    player.animation('walkingRight');
                    player.start();
                    break;
                case 40:
                    player.animation('walkingDown');
                    player.start();
                    break;
            }
        }
    });

    $(document).keyup(function (evt) {
        fired = false;
        player.stop();
        switch (evt.keyCode) {
            case 37:
                player.animation('idleLeft');
                playerLayer.draw();
                break;
            case 38:
                player.animation('idleUp');
                playerLayer.draw();
                break;
            case 39:
                player.animation('idleRight');
                playerLayer.draw();
                break;
            case 40:
                player.animation('idleDown');
                playerLayer.draw();
                break;
        }
    });
}