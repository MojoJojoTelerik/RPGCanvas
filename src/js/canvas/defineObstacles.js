function defineObstacles(objectsOnStage) {
    var pinkTreeBottomRectangle = new Kinetic.Rect({
        x: objectsOnStage.pinkTree.getX() + 45,
        y: objectsOnStage.pinkTree.getY() + 100,
        width: 30,
        height: 20
    });

    var greenTreeBottomRectangle = new Kinetic.Rect({
        x: objectsOnStage.greenTree.getX() + 45,
        y: objectsOnStage.greenTree.getY() + 100,
        width: 30,
        height: 20
    });

    var brownTreeBottomRectangle = new Kinetic.Rect({
        x: objectsOnStage.brownTree.getX() + 45,
        y: objectsOnStage.brownTree.getY() + 100,
        width: 30,
        height: 20
    });

    return {
        'pinkTree' : objectsOnStage.pinkTree,
        'brownTree': objectsOnStage.brownTree,
        'greenTree': objectsOnStage.greenTree,
        'pinkTreeBottomRectangle': pinkTreeBottomRectangle,
        'greenTreeBottomRectangle': greenTreeBottomRectangle,
        'brownTreeBottomRectangle': brownTreeBottomRectangle,
        'rock': objectsOnStage.rock
    };
}