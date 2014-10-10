define(['app/Enemy', 'app/User', 'app/Bullet', 'lib/Events'], function (Enemy, User, Bullet, Events) {
	var Board = function (config) {
		this.target = config.target;

		this.animation = true;
		this.pointSize = 10;
		this.pointsWidth = config.pointsWidth || 60;
		this.pointsHeight = config.pointsHeight || 40;

		this.target.setAttribute('style', 'position: relative; margin: 0 auto; border: 1px solid red; width: ' + (this.pointsWidth * this.pointSize) + 'px; height: ' + (this.pointsHeight * this.pointSize) + 'px;')

		this.enemies = [];

		this.user = new User();
		this.user.setPointPositions(this.pointsWidth / 2, this.pointsHeight - this.user.pointsHeight);

		this.map = [];
		this.colors = {
			enemy: 'red',
			user: 'blue',
			bullet: 'black'
		};
	};

	Board.prototype.setEnemiesByMatrix = function (matrix) {
		var enemy, enemyMap;

		for (var i = 0, len = matrix.length; i < len; i++) {
			for (var j = 0, len2 = matrix[i].length; j < len2; j++) {
				if (matrix[i][j]) {
					enemy = new Enemy();
					enemy.setPointMatrixPositions(j, i);

					this.enemies.push(enemy);
				}
			}
		}
	};

	Board.prototype.addToMap = function (points, index) {
		for (var i = 0, len = points.length; i < len; i++) {
			this.map[points[i][1]] = this.map[points[i][1]] || [];
			this.map[points[i][1]][points[i][0]] = index;
		}
	};

	Board.prototype.moveEnemies = function () {
		var enemy, detected;

		for (var i = 0, len = this.enemies.length; i < len; i++) {
			enemy = this.enemies[i];
			detected = false;

			for (var j = 0, len2 = enemy.lastMap.length; j < len2; j++) {
				if (
					((enemy.lastMap[j][0] * this.pointSize >= (this.pointsWidth * this.pointSize) - ((enemy.pointsWidth + enemy.gapX * 2) * this.pointSize)) && enemy.direction === 'right')
					||
					((enemy.lastMap[j][0] * this.pointSize <= this.pointSize) && enemy.direction === 'left')
				) {
					if (enemy.direction === 'right') {
						this.revertEnemiesDirection('left');
					}
					else {
						this.revertEnemiesDirection('right');
					}

					detected = true;
					break;
				}
			}

			if (detected) {
				break;
			}
		}

		for (var i = 0, len = this.enemies.length; i < len; i++) {
			if (this.enemies[i].direction === 'right') {
				this.enemies[i].setPointMatrixPositions(this.enemies[i].pointX + 1, this.enemies[i].pointY);
			}
			else {
				this.enemies[i].setPointMatrixPositions(this.enemies[i].pointX - 1, this.enemies[i].pointY);
			}
		}
	};

	Board.prototype.revertEnemiesDirection = function (direction) {
		for (var i = 0, len = this.enemies.length; i < len; i++) {
			this.enemies[i].direction = direction;
		}
	};

	Board.prototype.draw = function () {
		var enemyMap, html = [], that = this;

		this.map = [];

		for (var i = 0, len = this.enemies.length; i < len; i++) {
			enemyMap = this.enemies[i].calculateMap();
			if (typeof enemyMap === 'object') {
				this.addToMap(enemyMap, this.colors.enemy);
			}
		}

		this.addToMap(this.user.calculateMap(), this.colors.user);

		for (var i = 0, len = this.map.length; i < len; i++) {
			if (this.map[i]) {
				for (var j = 0, len2 = this.map[i].length; j < len2; j++) {
					if (this.map[i][j]) {
						console.log(this.map[i][j])
						html.push('<div style="position: absolute; background: ' + this.map[i][j] + '; top: ' + (i * this.pointSize) + 'px; left: ' + (j * this.pointSize) + 'px; width: ' + this.pointSize + 'px; height: ' + this.pointSize + 'px;"></div>');
					}
				}
			}
		}

		this.target.innerHTML = html.join('');

		Events.on('keypress', document, function (e) {
			var bullet;
			
			if (e.charCode == 32) {
				bullet = new Bullet();
				bullet.setPointPositions(that.user.pointX, that.user.pointY - 2);

				that.addToMap.apply(that, [bullet.calculateMap(), that.colors.bullet]);
			}
		});
	};

	return Board;
});