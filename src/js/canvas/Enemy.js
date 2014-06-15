function Enemy(enemyImage,xCoord,yCoord){

    this.image = enemyImage.clone();
    this.speed = 3;
    this.layer = new Kinetic.Layer();
    this.isForRemoving = false;
    this.image.setX(xCoord);
    this.image.setY(yCoord);

    stage.add(this.layer);

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


    this.layer.add(this.image);
    this.image.start();
    this.layer.draw();

}