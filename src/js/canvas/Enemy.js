function Enemy(enemyImage){
    this.image = enemyImage;
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

    this.__defineGetter__("width", function () {
        return this.image.getWidth();
    });

    this.__defineGetter__("height", function () {
        return this.image.getHeight();
    });
    this.image.start();
    this.layer.draw();
}