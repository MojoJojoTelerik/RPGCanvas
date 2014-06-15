function EnemyFactory(enemyImage, enemyLayer) {
	this.image = enemyImage;
    this.layer = enemyLayer;
	
	console.log(this.layer);
	
    var enemies = [];
	var maxPositonX = this.layer.getWidth();
	var maxPositionY = this.layer.getHeight();
	
    this.createEnemy = function () {
		var initialPositionX = Math.floor(Math.random() * maxPositonX);
		var initialPositionY = Math.floor(Math.random() * maxPositonY);
	
		var newEnemy = new Enemy(this.image, initialPositionX, initialPositionY);
		
        this.layer.add(newEnemy.image);
		
        newEnemy.animate.start();
        enemies.push(newEnemy);

        this.layer.draw();
    };
	
    this.enemiesUpdate = function (shots) {
        if (shots.length != 0 && enemies.length != 0) {
            for (var i = 0; i < shots.length; i++) {
				var currentShot = shots[i];
				
				for (var j = 0; j < enemies.length; j++) {
					var currentEnemy = enemies[j];
					if (detectCollision(currentShot.image, currentEnemy.image)) {
						currentShot.isForRemoving = true;
						currentEnemy.isForRemoving = true;
						currentEnemy.animate.stop();
						currentEnemy.image.remove();
					}
				}
            }
        }
		
		//var enemiesIndexesForRemoval = [];
		//
        //for (var key in this.enemies) {
        //    var currentEnemy = this.enemies[key];
        //
        //    if (currentEnemy.isForRemoving) {
        //        shotIndexesForRemoval.push(key);
        //    }
        //}
        //
        //for (var index in shotIndexesForRemoval) {
        //    this.shots.splice(index, 1);
        //    shotIndexesForRemoval.splice(index, 1);
        //}
	}
}