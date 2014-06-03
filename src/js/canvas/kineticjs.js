var kineticjs = function(){
    var backgroundLayer = new Kinetic.Layer();
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
        var backgroundImage = new Kinetic.Image({
            x: 0,
            y: 0,
            image: images.map,
            width: 1024,
            height: 768
        });

        backgroundLayer.add(backgroundImage);
        stage.add(backgroundLayer);
        backgroundLayer.setZIndex(0);

        backgroundImage.cache();
        backgroundImage.filters([Kinetic.Filters.Brighten]);
        backgroundLayer.draw();

        var slider = document.getElementById('slider');
        slider.onchange = function () {
            backgroundImage.brightness(slider.value);
            backgroundLayer.batchDraw();
        };

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
        stage.add(playerLayer);
        playerLayer.setZIndex(1000);

        var playerEventsCall = playerEvents(player, playerLayer);

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
        map: 'map.jpg',
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