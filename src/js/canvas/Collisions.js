function isPlayerColliding(nextPosition, player, obstacles) {
    var isColliding = false;
    var isOutOfFrame = false;
    var isCollidingWithTree = false;
    var isCollidingWithRock = false;

    var playerFootLeftPoint = { x: nextPosition.X, y: nextPosition.Y + player.height };
    var playerFootRightPoint = { x: (nextPosition.X + player.width), y: (nextPosition.Y + player.height) };

    var playerFootRectangle = new Kinetic.Rect({
        x: nextPosition.X,
        y: nextPosition.Y + player.height - 2,
        width: player.width,
        height: 2
    });

    var stage = player.image.getStage();

    switch (player.direction) {
        case 'left':
            if (player.X <= 5) {
                isOutOfFrame = true;
            }
            break;
        case 'up':
            if (player.Y <= 5) {
                isOutOfFrame = true;
            }
            break;
        case 'right':
            if (player.X >= stage.getWidth() - player.width - 10) {
                isOutOfFrame = true;
            }
            break;
        case 'down':
            if (player.Y >= stage.getHeight() - player.height - 20) {
                isOutOfFrame = true;
            }
            break;
    }
    
    if (detectCollision(obstacles.greenTree, player.image)) {
        isCollidingWithTree = checkPlayerTreeCollisions(obstacles.greenTreeBottomRectangle, playerFootRectangle, player);
    }
    else if (detectCollision(obstacles.brownTree, player.image)) {
        isCollidingWithTree = checkPlayerTreeCollisions(obstacles.brownTreeBottomRectangle, playerFootRectangle, player);
    }
    else if (detectCollision(obstacles.pinkTree, player.image)) {
        isCollidingWithTree = checkPlayerTreeCollisions(obstacles.pinkTreeBottomRectangle, playerFootRectangle, player);
    }

    if (obstacles.rock.intersects(playerFootLeftPoint) ||
        obstacles.rock.intersects(playerFootRightPoint)) {
        isCollidingWithRock = true;
    }

    if (isOutOfFrame || isCollidingWithTree || isCollidingWithRock) {
        isColliding = true;
    }

    return isColliding;
}

function detectCollision(rect1, rect2) {
    var status = false;

    var rec1TopY = rect1.getY();
    var rec1BottomY = rect1.getY() + rect1.getHeight();
    var rec1LeftX = rect1.getX();
    var rec1RightX = rect1.getX() + rect1.getWidth();

    var rec2TopY = rect2.getY();
    var rec2BottomY = rect2.getY() + rect2.getHeight();
    var rec2LeftX = rect2.getX();
    var rec2RightX = rect2.getX() + rect2.getWidth();

    if (!(rec1BottomY < rec2TopY ||
     rec2BottomY < rec1TopY ||
     rec1LeftX > rec2RightX ||
     rec2LeftX > rec1RightX)) {
        status = true;
    }

    return status;
}

function checkPlayerTreeCollisions(TreeBottomRectangle, playerFootRectangle, player) {
    var treeHitRegionBottomY = TreeBottomRectangle.getY() + TreeBottomRectangle.getHeight();
    var playerHitRegionBottomY = playerFootRectangle.getY() + playerFootRectangle.getHeight();

    var isPlayerInFrontTree = treeHitRegionBottomY < playerHitRegionBottomY;

    if (isPlayerInFrontTree) {
        if (player.isBehindTrees) {
            player.layer.moveUp();
            player.isBehindTrees = false;
        }
    }
    else {
        if (!player.isBehindTrees) {
            player.layer.moveDown();
            player.isBehindTrees = true;
        }
    }

    var isSteppingOnTree = false;

    if (detectCollision(TreeBottomRectangle, playerFootRectangle)) {
        isSteppingOnTree = true;
    }

    return isSteppingOnTree;
}