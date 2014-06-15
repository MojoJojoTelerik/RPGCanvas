﻿function ShotFactory(shotImage, shotLayer, shotEnemy) {
    var shots = [];

    this.layer = shotLayer;
    this.lastShotTimeInSeconds = new Date().getTime() / 1000;
    this.shotReuseTime = 1;

    this.createShot = function (player) {
        var currentTimeInSeconds = new Date().getTime() / 1000;

        if (currentTimeInSeconds > this.lastShotTimeInSeconds + this.shotReuseTime) {
            this.lastShotTimeInSeconds = currentTimeInSeconds;

            var shotDirection = player.direction;
            var shotPositionX = player.X + player.width / 2;
            var shotPositionY = player.Y + player.height / 2;

            switch (shotDirection) {
                case 'left':
                    shotPositionX -= 20;
                    break;
                case 'down':
                    shotPositionX -= 8;
                    break;
            }

            var shot = new Shot(shotImage, shotPositionX, shotPositionY, shotDirection);

            this.layer.add(shot.image);

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

            this.layer.draw();
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
            shots.splice(index, 1);
            shotIndexesForRemoval.splice(index, 1);
        }
        if (shots.length != 0) {
            for (var i = 0; i < shotEnemy.length; i = i + 1) {
                if (detectCollision(currentShot.image, shotEnemy[i].image)) {
                    currentShot.isForRemoving = true;
                    shotEnemy[i].image.remove();
                    shotEnemy.splice(i, 1);
                    console.log('Impact');
                }
            }
        }
    };
}