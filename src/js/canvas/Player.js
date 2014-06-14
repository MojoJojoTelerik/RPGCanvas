function Player(playerImage, shotFactory) {
    //var shots = [];
    var life = 200;

    this.image = playerImage;
    this.layer = this.image.getLayer();
    this.speed = 3;

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
        if (val > 0) {
            life = val;
        }
        else {
            life = 0;
        }
    });

    this.__defineGetter__("width", function () {
        return this.image.getWidth();
    });

    this.__defineGetter__("height", function () {
        return this.image.getHeight();
    });

    this.shoot = function () {
        var direction = this.image.animation();
        shotFactory.createShot(this, direction);
    };
}