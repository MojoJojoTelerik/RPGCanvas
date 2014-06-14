function Shot(shotImage, direction) {
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

    this.animate = function () { };
}