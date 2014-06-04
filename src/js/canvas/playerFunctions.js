function playerFunctions(objects) {
    var playerImage = objects.playerImage;
    var playerLayer = objects.playerLayer;
    var shotImage = objects.shotImage;

    function Shot(direction) {
        this.image = shotImage.clone();
        this.lifespan = 250;
        this.speed = 6;
        this.direction = direction;
        this.originalPosition = [];
        this.isForRemoving = false;

        this.__defineGetter__("X", function () {
            return this.image.getX();
        });

        this.__defineSetter__("X", function (val) {
            this.image.setX(val);
        });

        this.__defineGetter__("Y", function () {
            return this.image.getY();
        });

        this.__defineSetter__("Y", function (val) {
            this.image.setY(val);
        });

        this.animate;
    }

    function Player(playerImage) {
        this.image = playerImage;

        this.lastShotTimeInSeconds = new Date().getTime() / 1000;
        this.shotReuseTime = 1;

        this.__defineGetter__("X", function () {
            return this.image.getX();
        });

        this.__defineSetter__("X", function (val) {
            this.image.setX(val);
        });

        this.__defineGetter__("Y", function () {
            return this.image.getY();
        });

        this.__defineSetter__("Y", function (val) {
            this.image.setY(val);
        });

        this.__defineGetter__("width", function () {
            return this.image.getWidth();
        });

        this.__defineGetter__("height", function () {
            return this.image.getHeight();
        });

        this.shoot = function () {
            var currentTimeInSeconds = new Date().getTime() / 1000;

            if (currentTimeInSeconds > this.lastShotTimeInSeconds + this.shotReuseTime)
            {
                this.lastShotTimeInSeconds = currentTimeInSeconds;

                var shot;

                switch(this.image.animation()){
                    case 'idleLeft':
                    case 'walkingLeft':
                        shot = new Shot('left');
                        shot.X = this.X + this.width / 2 - 20;
                        shot.Y = this.Y + this.height / 2;
                        shot.originalPosition = [shot.X, shot.Y];
                        break;
                    case 'idleUp':
                    case 'walkingUp':
                        shot = new Shot('up');
                        shot.X = this.X + this.width / 2;
                        shot.Y = this.Y + this.height / 2;
                        shot.originalPosition = [shot.X, shot.Y];
                        break;
                    case 'idleRight':
                    case 'walkingRight':
                        shot = new Shot('right');
                        shot.X = this.X + this.width / 2;
                        shot.Y = this.Y + this.height / 2;
                        shot.originalPosition = [shot.X, shot.Y];
                        break;
                    case 'idleDown':
                    case 'walkingDown':
                        shot = new Shot('down');
                        shot.X = this.X + this.width / 2 - 8;
                        shot.Y = this.Y + this.height / 2;
                        shot.originalPosition = [shot.X, shot.Y];
                        break;
                }

                playerLayer.add(shot.image);
                playerLayer.draw();
            
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

                }, playerLayer);

                shot.animate.start();
                
                shots.push(shot);
            }
        }
    }

    var shots = [];

    var player = new Player(playerImage);

    mainLoop(player, shots);

    playerEvents(player, playerLayer);


    /* var mousePos = stage.getPointerPosition();
    var x = mousePos.x - 190;
    var y = mousePos.y - 40; */

    //stage.getIntersections(mousePos);

    //var result = 5;

    //var text = new Kinetic.Text({
    //    x: 10,
    //    y: 10,
    //    fontFamily: 'Calibri',
    //    fontSize: 24,
    //    text: 'Life:' + result,
    //    fill: 'black'
    //});

    //playerLayer.add(text);
    //playerLayer.draw();
}