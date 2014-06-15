function EnemyFactory(enemyImage, enemyLayer) {
	this.image = enemyImage;
    this.layer = enemyLayer;
	
    var enemies = [];
	var maxPositionX = this.layer.getWidth();
	var maxPositionY = this.layer.getHeight();
	
    this.createEnemy = function () {
		var initialPositionX = Math.floor(Math.random() * maxPositionX);
		var initialPositionY = Math.floor(Math.random() * maxPositionY);
	
		var newEnemy = new Enemy(this.image, initialPositionX, initialPositionY);
		
        this.layer.add(newEnemy.image);
        newEnemy.image.start();
		
        enemies.push(newEnemy);

        this.layer.draw();
    };
	
    this.enemiesUpdate = function (shots, player) {
        if (shots.length != 0 && enemies.length != 0) {
            for (var i = 0; i < shots.length; i++) {
				var currentShot = shots[i];
				
				for (var j = 0; j < enemies.length; j++) {
					var currentEnemy = enemies[j];
					if (detectCollision(currentShot.image, currentEnemy.image)) {
						currentShot.isForRemoving = true;
						currentEnemy.isForRemoving = true;
						currentEnemy.image.stop();
						currentEnemy.image.remove();
						player.life += 50;
					}
				}
            }
        }
	}
}