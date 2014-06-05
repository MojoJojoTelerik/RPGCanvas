var stage = function () {
    var frameLayer = new Kinetic.FastLayer();
    var backgroundLayer = new Kinetic.Layer();
    var playerLayer = new Kinetic.Layer();
    var landscapeLayer = new Kinetic.Layer();

    function loadImages(sources, callback) {
        var assetDir = './img/';
        var images = {};
        var loadedImages = 0;
        var numImages = 0;
        for (var src in sources) {
            numImages++;
        }
        for (var src in sources) {
            images[src] = new Image();
            images[src].onload = function () {
                if (++loadedImages >= numImages) {
                    callback(images);
                }
            };
            images[src].src = assetDir + sources[src];
        }
    }

    function buildStage(images) {
        stage.add(frameLayer);
        stage.add(backgroundLayer);
        stage.add(playerLayer);
        stage.add(landscapeLayer);

        // Frame Layer
        var frame = new Kinetic.Image({
            x: 0,
            y: 0,
            image: images.frame,
            width: stage.width(),
            height: stage.height()
        });

        // Background Layer
        var backgroundImage = new Kinetic.Image({
            x: 0,
            y: 0,
            image: images.map,
            width: stage.width(),
            height: stage.height()
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

        backgroundLayer.add(backgroundImage);
        backgroundLayer.add(bush);
        backgroundLayer.add(rock);

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

        frameLayer.add(frame);

        landscapeLayer.add(pinkTree);
        landscapeLayer.add(greenTree);
        landscapeLayer.add(brownTree);

        backgroundImage.cache();
        bush.cache();
        rock.cache();
        pinkTree.cache();
        greenTree.cache();
        brownTree.cache();

        backgroundImage.filters([Kinetic.Filters.Brighten]);
        bush.filters([Kinetic.Filters.Brighten]);
        rock.filters([Kinetic.Filters.Brighten]);
        pinkTree.filters([Kinetic.Filters.Brighten]);
        greenTree.filters([Kinetic.Filters.Brighten]);
        brownTree.filters([Kinetic.Filters.Brighten]);

        var slider = document.getElementById('slider');

        slider.onchange = function () {
            backgroundImage.brightness(slider.value);
            backgroundLayer.batchDraw();

            pinkTree.brightness(slider.value);
            greenTree.brightness(slider.value);
            brownTree.brightness(slider.value);
            landscapeLayer.batchDraw();

            rock.brightness(slider.value);
            bush.brightness(slider.value);
            backgroundLayer.batchDraw();
        };

        // Player layer
        var player = new Kinetic.Sprite({
            x: 300,
            y: 400,
            width: 32,
            height: 48,
            image: images.player,
            animation: 'idleDown',
            animations: {
                // x, y, width, height (3 x 4 frames) - 32 x 48
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
            frameIndex: 0,
            //drawHitFunc: function(context) {
            //    var hitWidth = 50;
            //    context.beginPath();
            //    context.moveTo(this.getPoints()[0].x, this.getPoints()[0].y);
            //    context.lineTo(this.getPoints()[1].x, this.getPoints()[1].y);
            //    context.closePath();
            //    var orgWidth = this.getStrokeWidth();
            //    this.setStrokeWidth(hitWidth);
            //    context.fillStrokeShape(this);
            //    this.setStrokeWidth(orgWidth);
            //}
        });

        var shot = new Kinetic.Image({
            x: -100,
            y: -100,
            image: images.shot,
            width: 16,
            height: 16,
            offset: [8, 8]
        });

        playerLayer.add(player);
        playerLayer.setZIndex(10000);

        player.start();

        frameLayer.moveToTop();

        frameLayer.draw();
        backgroundLayer.draw();
        playerLayer.draw();
        landscapeLayer.draw();

        // in order to ignore transparent pixels in an image when detecting
        rock.drawHitFromCache();
        pinkTree.drawHitFromCache();
        greenTree.drawHitFromCache();
        brownTree.drawHitFromCache();

        // next, we need to redraw the layer hit graph
        backgroundLayer.drawHit();
        landscapeLayer.drawHit();

        var objectsToPass = {
            'stage': stage,
            'frameLayer': frameLayer,
            'backgroundLayer': backgroundLayer,
            'landscapeLayer': landscapeLayer,
            'playerLayer': playerLayer,
            'playerImage': player,
            'rock': rock,
            'pinkTree': pinkTree,
            'greenTree': greenTree,
            'brownTree': brownTree,
            'bush': bush,
            'shotImage': shot,
        };

        playerFunctions(objectsToPass);
    }

    Array.prototype.remove = function (item) {
        var indexOfItem = this.indexOf(item);

        if (indexOfItem > -1) {
            for (var index = 0; index < this.length; index++) {
                if (index === indexOfItem) {
                    array.splice(i, 1);
                }
            }
        }
    }

    //Kinetic.Image.prototype.getBounds = function () {
    //    return {
    //        x1: this.getX() - (this.getOffset().x * this.getScale().x),
    //        y1: this.getY() - (this.getOffset().y * this.getScale().y),
    //        x2: this.getX() - (this.getOffset().x * this.getScale().y) + (this.attrs.width * this.getScale().x),
    //        y2: this.getY() - (this.getOffset().y * this.getScale().y) + (this.attrs.height * this.getScale().y)
    //    }
    //}

    //Kinetic.Image.prototype.overlap = function (image) {
    //    // does the source image overlap the target (passed in) image
    //    var sourceBounds = this.getBounds();
    //    var targetBounds = image.getBounds();
    //    var sourcePoints = [{ x: sourceBounds.x1, y: sourceBounds.y1 },	// upper left
    //    { x: sourceBounds.x2, y: sourceBounds.y1 },	// upper right
    //    { x: sourceBounds.x2, y: sourceBounds.y2 },	// bottom right
    //    { x: sourceBounds.x1, y: sourceBounds.y2 }]	// bottom left

    //    // check all 4 boundary points on source, if any one of them is in the target bounds, it's an overlap
    //    for (point in sourcePoints) {
    //        if (sourcePoints[point].x >= targetBounds.x1
    //        && sourcePoints[point].x <= targetBounds.x2
    //        && sourcePoints[point].y >= targetBounds.y1
    //        && sourcePoints[point].y <= targetBounds.y2)
    //            return true;
    //    }

    //    // if the source width is larger than the target width, check if the source image "horizontally surrounds" the target image
    //    if (sourceBounds.x1 < targetBounds.x1 && sourceBounds.x2 > targetBounds.x2 &&
    //    ((sourceBounds.y1 >= targetBounds.y1 && sourceBounds.y1 <= targetBounds.y2) ||
    //    (sourceBounds.y2 >= targetBounds.y1 && sourceBounds.y2 <= targetBounds.y2)))
    //        return true;

    //    // if the source height is larger than the target height, check if the source image "vertically surrounds" the target image
    //    if (sourceBounds.y1 < targetBounds.y1 && sourceBounds.y2 > targetBounds.y2 &&
    //    ((sourceBounds.x1 >= targetBounds.x1 && sourceBounds.x1 <= targetBounds.x2) ||
    //    (sourceBounds.x2 >= targetBounds.x1 && sourceBounds.x2 <= targetBounds.x2)))
    //        return true;

    //    // if the source width & height is larger than the target width & height, check if the source image "vertically & horizontally surrounds" the target image
    //    if (sourceBounds.y1 < targetBounds.y1 && sourceBounds.y2 > targetBounds.y2 && sourceBounds.x1 < targetBounds.x1 && sourceBounds.x2 > targetBounds.x2)
    //        return true;
    //    return false;
    //}

    var stage = new Kinetic.Stage({
        container: 'canvas',
        width: 1024,
        height: 768
    });

    var sources = {
        frame: 'frame.png',
        map: 'map.png',
        rock: 'rock.png',
        greenTree: 'green_tree.png',
        brownTree: 'brown_tree.png',
        pinkTree: 'pink_tree.png',
        bush: 'bush.png',
        player: 'sprites/laila.png',
        shot: 'shot.png'
    };

    loadImages(sources, buildStage);
}