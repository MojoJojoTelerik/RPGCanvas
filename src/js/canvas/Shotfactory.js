function ShotFactory(shotImage, shotLayer) {
    var shots = [];

    this.layer = shotLayer;
    this.lastShotTimeInSeconds = new Date().getTime() / 1000;
    this.shotReuseTime = 1;

    this.createShot = function (player, direction) {
        var currentTimeInSeconds = new Date().getTime() / 1000;

        if (currentTimeInSeconds > this.lastShotTimeInSeconds + this.shotReuseTime) {
            this.lastShotTimeInSeconds = currentTimeInSeconds;

            var shot;

            switch (direction) {
                case 'idleLeft':
                case 'walkingLeft':
                    shot = new Shot(shotImage, 'left');
                    shot.X = player.X + player.width / 2 - 20;
                    shot.Y = player.Y + player.height / 2;
                    shot.originalPosition = [shot.X, shot.Y];
                    break;
                case 'idleUp':
                case 'walkingUp':
                    shot = new Shot(shotImage, 'up');
                    shot.X = player.X + player.width / 2;
                    shot.Y = player.Y + player.height / 2;
                    shot.originalPosition = [shot.X, shot.Y];
                    break;
                case 'idleRight':
                case 'walkingRight':
                    shot = new Shot(shotImage, 'right');
                    shot.X = player.X + player.width / 2;
                    shot.Y = player.Y + player.height / 2;
                    shot.originalPosition = [shot.X, shot.Y];
                    break;
                case 'idleDown':
                case 'walkingDown':
                    //var originalShotXPosition = 
                    shot = new Shot(shotImage, 'down');
                    shot.X = player.X + player.width / 2 - 8;
                    shot.Y = player.Y + player.height / 2;
                    shot.originalPosition = [shot.X, shot.Y];
                    break;
            }

            this.layer.add(shot.image);
            this.layer.draw();

            shot.animate = new Kinetic.Animation(function (frame) {
                var timeDiff = frame.timeDiff;

                // one revolution per 4 seconds
                var angularSpeed = 360 / 1;

                var angleDiff = frame.timeDiff * angularSpeed / 1000;
                shot.image.rotate(angleDiff);

                if (timeDiff > 8) {
                    switch (shot.direction) {
                        case 'left':
                            shot.X -= shot.speed;
                            break;
                        case 'up':
                            shot.Y -= shot.speed;
                            break;
                        case 'right':
                            shot.X += shot.speed;
                            break;
                        case 'down':
                            shot.Y += shot.speed;
                            break;
                    }
                }

                if (Math.abs(shot.X - shot.originalPosition[0]) > shot.lifespan ||
                    Math.abs(shot.Y - shot.originalPosition[1]) > shot.lifespan) {
                    shot.isForRemoving = true;
                }

            }, this.layer);

            shot.animate.start();

            shots.push(shot);
        }
    };

    this.checkShotsLifeTimeElapsed = function () {
        var shotIndexesForRemoval = [];

        for (var key in shots) {
            var currentShot = shots[key];

            if (currentShot.isForRemoving) {
                currentShot.animate.stop();
                currentShot.image.remove();
                shotIndexesForRemoval.push(key);
            }
        }

        for (var index in shotIndexesForRemoval) {
            // TO DO: remove correctly from shots!
        }
    };
}