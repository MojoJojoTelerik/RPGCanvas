function EnemyFactory(enemyImage, enemyLayer) {
	this.image = enemyImage;
    this.layer = enemyLayer;
    this.enemies = [];

    var maxEnemies = 5;

	var minPositionX = 15;
	var maxPositionX = this.layer.getWidth() - 15;
	var minPositionY = 15;
	var maxPositionY = this.layer.getHeight() - 15;
	
    this.createEnemy = function () {
		if (this.enemies.length < maxEnemies) {
		    var initialPositionX = Math.floor(Math.random() * (maxPositionX - minPositionX) + minPositionX);
		    var initialPositionY = Math.floor(Math.random() * (maxPositionY - minPositionY) + minPositionY);

		    var newEnemy = new Enemy(this.image, initialPositionX, initialPositionY);

		    this.layer.add(newEnemy.image);

			this.enemies.push(newEnemy);

			this.layer.draw();
		}
    };

    this.createEnemy();
}