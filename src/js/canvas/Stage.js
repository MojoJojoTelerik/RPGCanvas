function Stage(images) {
    this.stage = new Kinetic.Stage({
        container: 'canvas',
        width: 1024,
        height: 768
    });

    this.frameLayer = new Kinetic.FastLayer();
    this.backgroundLayer = new Kinetic.Layer();
    this.playerLayer = new Kinetic.Layer();
    this.enemyLayer = new Kinetic.Layer({
        width: 1024,
        height: 768
	});
    this.landscapeLayer = new Kinetic.Layer();
    this.objectsOnStage = {};

    this.stage.add(this.frameLayer);
    this.stage.add(this.backgroundLayer);
    this.stage.add(this.playerLayer);
    this.stage.add(this.enemyLayer);
    this.stage.add(this.landscapeLayer);

    // Frame Layer
    var frame = new Kinetic.Image({
        x: 0,
        y: 0,
        image: images.frame,
        width: this.stage.width(),
        height: this.stage.height()
    });

    // Background Layer
    var backgroundImage = new Kinetic.Image({
        x: 0,
        y: 0,
        image: images.map,
        width: this.stage.width(),
        height: this.stage.height()
    });

    var bush = new Kinetic.Image({
        x: 670,
        y: 270,
        image: images.bush,
        width: 33,
        height: 33
    });

    var rock = new Kinetic.Image({
        x: 0,
        y: 0,
        image: images.rock,
        width: 319,
        height: 237
    });

    this.backgroundLayer.add(backgroundImage);
    this.backgroundLayer.add(bush);
    this.backgroundLayer.add(rock);

    // Landscape Layer
    var pinkTree = new Kinetic.Image({
        x: 570,
        y: 50,
        image: images.pinkTree,
        width: 124,
        height: 120
    });

    var greenTree = new Kinetic.Image({
        x: 155,
        y: 490,
        image: images.greenTree,
        width: 120,
        height: 123
    });

    var brownTree = new Kinetic.Image({
        x: 220,
        y: 140,
        image: images.brownTree,
        width: 115,
        height: 119
    });

    this.frameLayer.add(frame);

    this.landscapeLayer.add(pinkTree);
    this.landscapeLayer.add(greenTree);
    this.landscapeLayer.add(brownTree);

    backgroundImage.cache();
    bush.cache();
    rock.cache();
    pinkTree.cache();
    greenTree.cache();
    brownTree.cache();

    var objectsToBrighten = [backgroundImage, pinkTree, greenTree, brownTree, rock, bush];
    var layersToRedrawAfterBrightening = [this.backgroundLayer, this.landscapeLayer];

    addBrightnessSlider(objectsToBrighten, layersToRedrawAfterBrightening);

    // Player layer
    this.playerImage = new Kinetic.Sprite({
        x: 300,
        y: 400,
        width: 32,
        height: 48,
        image: images.player,
        animation: 'idleDown',
        animations: {
            // x, y, width, height
            idleDown: [
                33, 0, 32, 48
            ],
            idleLeft: [
                33, 49, 32, 48
            ],
            idleRight: [
                33, 97, 32, 48
            ],
            idleUp: [
                33, 145, 32, 48
            ],
            walkingDown: [
                0, 0, 32, 48,
                33, 0, 32, 48,
                65, 0, 32, 48
            ],
            walkingLeft: [
                0, 49, 32, 48,
                33, 49, 32, 48,
                65, 49, 32, 48
            ],
            walkingRight: [
                0, 97, 32, 48,
                33, 97, 32, 48,
                65, 97, 32, 48
            ],
            walkingUp: [
                0, 145, 32, 48,
                33, 145, 32, 48,
                65, 145, 32, 48
            ]
        },
        frameRate: 4,
        frameIndex: 0
    });

    // Enemy layer
    this.enemyImage = new Kinetic.Image({
        x: -100,
        y: -100,
        image: images.enemy,
        width: 32,
        height: 32
    });

    this.shotImage = new Kinetic.Image({
        x: -100,
        y: -100,
        image: images.shot,
        width: 16,
        height: 16
    });

    this.playerLayer.add(this.playerImage);
    this.playerLayer.setZIndex(10000);

    this.playerImage.start();

    this.frameLayer.moveToTop();

    this.frameLayer.draw();
    this.backgroundLayer.draw();
    this.playerLayer.draw();
    this.landscapeLayer.draw();

    // in order to ignore transparent pixels in an image when detecting
    rock.drawHitFromCache();
    pinkTree.drawHitFromCache();
    greenTree.drawHitFromCache();
    brownTree.drawHitFromCache();

    // next, we need to redraw the layer hit graph
    this.backgroundLayer.drawHit();
    this.landscapeLayer.drawHit();

    this.objectsOnStage = {
        'rock': rock,
        'pinkTree': pinkTree,
        'greenTree': greenTree,
        'brownTree': brownTree,
        'bush': bush
    };

    function addBrightnessSlider(affectedObjects, layers) {
        var slider = document.getElementById('slider');

        for (var key in affectedObjects) {
            affectedObjects[key].filters([Kinetic.Filters.Brighten]);
        }

        slider.onchange = function () {
            for (var obj in affectedObjects) {
                if (affectedObjects[obj].nodeType === 'Shape') {
                    affectedObjects[obj].brightness(slider.value);
                }
            }

            for (var key in layers) {
                if (layers[key].nodeType === 'Layer') {
                    layers[key].batchDraw();
                }
            }
        };
    }
}
