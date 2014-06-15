function Player(playerImage, shotFactory) {
    var life = 200;

    this.image = playerImage;
    this.layer = this.image.getLayer();
    this.speed = 3;
    this.isBehindTrees = false;

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

    this.__defineGetter__("life", function () {
        return life;
    });

    this.__defineSetter__("life", function (val) {
        if (val > 0 && val < 200) {
            life = val;
        }
        else if (val < life) {
            life = 0;
        }
        else if (val > life) {
            life = 200;
        }
    });

    this.__defineGetter__("width", function () {
        return this.image.getWidth();
    });

    this.__defineGetter__("height", function () {
        return this.image.getHeight();
    });

    this.__defineGetter__("direction", function () {
        var directionFacing;

        var animationName = this.image.animation();
        switch (animationName) {
            case 'idleLeft':
            case 'walkingLeft':
                directionFacing = 'left';
                break;
            case 'idleUp':
            case 'walkingUp':
                directionFacing = 'up';
                break;
            case 'idleRight':
            case 'walkingRight':
                directionFacing = 'right';
                break;
            case 'idleDown':
            case 'walkingDown':
                directionFacing = 'down';
        }

        return directionFacing;
    });

    this.shoot = function () {
        shotFactory.createShot(this);
    };
}