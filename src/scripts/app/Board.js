define(['app/Enemy', 'app/User', 'app/Bullet', 'lib/Events'], function (Enemy, User, Bullet, Events) {
	var Board = function (config) {
		this.target = config.target;

		this.width = config.width || 800;
		this.height = config.height || 400;
		this.segmentSize = 10;
		this.gameOver = false;


		this.enemies = [];
		this.bullets = [];
		this.user = undefined;

		this.map = [];
		this.names = {
			enemy: 'enemy',
			user: 'user',
			bullet: 'bullet'
		};

		this.initBoard();
		this.initUser();
		this.initEvents();
	};

	Board.prototype.initBoard = function () {
		this.target.setAttribute('style', 'width: ' + this.width + 'px; height: ' + this.height + 'px;');
	};

	Board.prototype.initUser = function () {
		this.user = new User();
		this.user.setPosition((this.width / 2 - (this.user.height / 2)), this.height - this.user.height);
	};

	Board.prototype.initEvents = function () {
		var that = this;

		Events.on('keyup', document, function (e) {
			var bullet;

			if (e.keyCode == 32) {
				bullet = new Bullet();
				that.bullets.push(
					bullet.setPosition(that.user.x + (that.user.width / 2 - bullet.width / 2), that.user.y)
				);
			}
			else if (e.keyCode == 37 || e.keyCode == 39) {
				that.user.activeDirection = undefined;
			}
		});

		Events.on('keydown', document, function (e) {
			if (!that.user.activeDirection) {
				if (e.keyCode == 37) {	// left
					that.user.activeDirection = 'left';
				}
				else if (e.keyCode == 39) {	// right
					that.user.activeDirection = 'right';
				}
			}
		});
	};

	Board.prototype.setEnemiesMap = function (map) {
		var enemy, enemyMap;

		for (var i = 0, len = map.length; i < len; i++) {
			for (var j = 0, len2 = map[i].length; j < len2; j++) {
				if (map[i][j]) {
					enemy = new Enemy();

					enemy.setPosition(
						(j * enemy.width) + (j * enemy.margin) + enemy.margin,
						(i * enemy.height) + (i * enemy.margin) + enemy.margin
					);

					this.enemies.push(enemy);
				}
			}
		}
	};

	Board.prototype.downEnemies = function () {
		for (var i = 0, len = this.enemies.length; i < len; i++) {
			this.enemies[i].down();
		}
	};

	Board.prototype.moveEnemies = function () {
		var enemy, revertDirection = false, i, len;

		for (i = 0, len = this.enemies.length; i < len; i++) {
			enemy = this.enemies[i];
			detected = false;

			if (
				((enemy.x + enemy.width + enemy.margin >= (this.width - enemy.margin)) && enemy.direction === 'right') ||
				((enemy.x - enemy.margin <= enemy.margin) && enemy.direction === 'left')
			) {
				revertDirection = true;
				break;
			}
		}


		for (i = 0, len = this.enemies.length; i < len; i++) {
			if (revertDirection) {
				this.enemies[i].revertDirection();
			}

			this.enemies[i].move();
		}
	};

	Board.prototype.moveBullets = function () {
		for (var i = 0, len = this.bullets.length; i < len; i++) {
			this.bullets[i].move();
		}
	};

	Board.prototype.moveUser = function () {
		this.user.move(this.width);
	};

	Board.prototype.draw = function () {
		var enemyMap, html = [], that = this, len, i;

		this.map = [];

		for (i = 0, len = this.enemies.length; i < len; i++) {
			html.push(that.enemies[i].html());
		}

		for (i = 0, len = this.bullets.length; i < len; i++) {
			html.push(that.bullets[i].html());
		} 

		html.push(that.user.html());

		this.target.innerHTML = html.join('');
	};

	
	Board.prototype.isGameOver = function () {
		return this.gameOver;
	};
	
	Board.prototype.showGameOver = function () {
		this.target.innerHTML = '<div class="game-over">Game Over</div>';
	};

	return Board;
});