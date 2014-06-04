var kineticjs = function () {
    var frameLayer = new Kinetic.FastLayer();
    var backgroundLayer = new Kinetic.Layer();
    var landscapeLayer = new Kinetic.Layer();
    var playerLayer = new Kinetic.Layer();

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
        stage.add(landscapeLayer);
        stage.add(playerLayer);

        // Frame Layer
        var frame = new Kinetic.Image({
            x: 0,
            y: 0,
            image: images.frame,
            width: 1024,
            height: 768
        });

        frameLayer.add(frame);

        // Background Layer
        var backgroundImage = new Kinetic.Image({
            x: 0,
            y: 0,
            image: images.map,
            width: 1024,
            height: 768
        });

        backgroundLayer.add(backgroundImage);
        backgroundImage.cache();
        backgroundImage.filters([Kinetic.Filters.Brighten]);

        var slider = document.getElementById('slider');
        slider.onchange = function () {
            backgroundImage.brightness(slider.value);
            backgroundLayer.batchDraw();
        };

        // Landscape Layer
        var pinkTree = new Kinetic.Image({
            x: 570,
            y: 50,
            image: images.pinkTree,
            width: 132,
            height: 128
        });

        var greenTree = new Kinetic.Image({
            x: 155,
            y: 490,
            image: images.greenTree,
            width: 125,
            height: 133
        });

        var brownTree = new Kinetic.Image({
            x: 220,
            y: 140,
            image: images.brownTree,
            width: 132,
            height: 128
        });

        var rock = new Kinetic.Image({
            x: 0,
            y: 0,
            image: images.rock,
            width: 319,
            height: 237
        });

        var bush = new Kinetic.Image({
            x: 670,
            y: 270,
            image: images.bush,
            width: 33,
            height: 33
        });

        landscapeLayer.add(rock);
        landscapeLayer.add(pinkTree);
        landscapeLayer.add(greenTree);
        landscapeLayer.add(brownTree);
        landscapeLayer.add(bush);

        //backgroundImage.setZIndex(0);
        //rock.setZIndex(2000);
        //pinkTree.setZIndex(2000);
        //greenTree.setZIndex(2000);
        //brownTree.setZIndex(2000);
        //bush.setZIndex(2000);
        
        // Player layer
        var player = new Kinetic.Sprite({
            x: 300,
            y: 400,
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
            frameIndex: 0
        });

        playerLayer.add(player);
        playerLayer.setZIndex(1000);

        playerLayer.draw();

        frameLayer.moveToTop();
        frameLayer.draw();
        backgroundLayer.draw();
        landscapeLayer.draw();

        playerEvents(player, playerLayer);

        //// in order to ignore transparent pixels in an image when detecting
        //// events, we first need to cache the image
        //player.cache();

        //// next, we need to redraw the hit graph using the cached image
        //player.drawHitFromCache();

        //// finally, we need to redraw the layer hit graph
        //layer.drawHit();
    }

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
        player: 'sprites/laila.png'
    };

    loadImages(sources, buildStage);

    //var text = new Kinetic.Text({
    //    x: 10,
    //    y: 10,
    //    fontFamily: 'Calibri',
    //    fontSize: 24,
    //    text: '',
    //    fill: 'black'
    //});
}