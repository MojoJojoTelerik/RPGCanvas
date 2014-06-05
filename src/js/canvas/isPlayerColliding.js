function isPlayerColliding(nextPosition, player, obstacles) {
    var isColliding = false;

    var playerFootLeftPoint = { x: nextPosition.X, y: nextPosition.Y + player.height };
    var playerFootRightPoint = { x: (nextPosition.X + player.width), y: (nextPosition.Y + player.height) };

    var playerFootRectangle = new Kinetic.Rect({
        x: nextPosition.X,
        y: nextPosition.Y + player.height - 2,
        width: player.width,
        height: 2
    });

    if (detectCollision(obstacles.pinkTreeBottomRectangle, playerFootRectangle) ||
        detectCollision(obstacles.greenTreeBottomRectangle, playerFootRectangle) ||
        detectCollision(obstacles.brownTreeBottomRectangle, playerFootRectangle) ||
        obstacles.rock.intersects(playerFootLeftPoint) ||
        obstacles.rock.intersects(playerFootRightPoint)) {
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