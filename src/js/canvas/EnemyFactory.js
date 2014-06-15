function EnemyFactory(enemyImage, enemyLayer) {
	this.image = enemyImage;
    this.layer = enemyLayer;
	
    var enemies = [];
	var maxEnemies = 5;
	var currentEnemiesCount = 0;
	
	var maxPositionX = this.layer.getWidth();
	var maxPositionY = this.layer.getHeight();
	
    this.createEnemy = function () {
		if (currentEnemiesCount < maxEnemies) {
			currentEnemiesCount++;
			
			var initialPositionX = Math.floor(Math.random() * maxPositionX);
			var initialPositionY = Math.floor(Math.random() * maxPositionY);
		
			var newEnemy = new Enemy(this.image, initialPositionX, initialPositionY);
			
			this.layer.add(newEnemy.image);
			
			enemies.push(newEnemy);

			this.layer.draw();
		}
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
						currentEnemy.image.remove();
						currentEnemiesCount--;
						player.life += 50;
					}
				}
            }
        }
		
		// TO DO IT CORRECTLY
		var enemiesIndexesForRemoval = [];
		
        for (var key in enemies) {
            var currentEnemy = enemies[key];

            if (currentEnemy.isForRemoving) {
                enemiesIndexesForRemoval.push(key);
            }
        }

        for (var index in enemiesIndexesForRemoval) {
            enemies.splice(index, 1);
            enemiesIndexesForRemoval.splice(index, 1);
        }
	}
}