define(['app/Enemy', 'app/User', 'app/Bullet', 'lib/Events', 'lib/Utils'], function (Enemy, User, Bullet, Events, Utils) {
	var
	KEYS = { SPACE: 32, LEFT: 37, RIGHT: 39 },
	Board = function (config) {
		this.target = config.target;

		this.width = config.width || window.innerWidth - 60;
		this.height = config.height || window.innerHeight - 60;
		this.segmentSize = 10;
		this.isGameOver = false;
		this.isEndOfGame = false;

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

			if (e.keyCode == KEYS.SPACE) {
				if (that.bullets.length < 3) {
					bullet = new Bullet();
					that.bullets.push(
						bullet.setPosition(that.user.x + (that.user.width / 2 - bullet.width / 2), that.user.y)
					);
				}
			}
			else if (e.keyCode == KEYS.LEFT || e.keyCode == KEYS.RIGHT) {
				that.user.activeDirection = undefined;
			}
		});

		Events.on('keydown', document, function (e) {
			if (!that.user.activeDirection) {
				if (e.keyCode == KEYS.LEFT) {
					that.user.activeDirection = 'left';
				}
				else if (e.keyCode == KEYS.RIGHT) {
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
		var enemy, i, len;
		for (i = 0, len = this.enemies.length; i < len; i++) {
			if (this.enemies[i]) {
				enemy = this.enemies[i];
				enemy.down();

				if (enemy.y + enemy.height >= this.height) {
					this.isGameOver = true;
					break;
				}
			}
		}
	};

	Board.prototype.moveEnemies = function () {
		var enemy, revertDirection = false, i, len;

		for (i = 0, len = this.enemies.length; i < len; i++) {
			if (this.enemies[i]) {
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
		}

		for (i = 0, len = this.enemies.length; i < len; i++) {
			if (this.enemies[i]) {
				if (revertDirection) {
					this.enemies[i].revertDirection();
				}

				this.enemies[i].move();
			}
		}
	};

	Board.prototype.moveBullets = function () {
		var enemiesLength = this.enemies.length, i, len, j;

		mainLoop:
		for (i = 0, len = this.bullets.length; i < len; i++) {
			secondLoop:
			for (j = 0; j < enemiesLength; j++) {
				if (this.enemies[j] && this.bullets[i] && this.enemies[j].contain(this.bullets[i].x, this.bullets[i].y)) {
					this.removeBullet(i);
					this.removeEnemy(j);

					if (--enemiesLength === 0) {
						this.isEndOfGame = true;
						break mainLoop;
					}

					continue secondLoop;
				}
			}

			if (this.bullets[i]) {
				this.bullets[i].move();

				if (this.bullets[i].y <= 0) {
					this.bullets.splice(i, 1);
				}
			}
		}
	};

	Board.prototype.removeBullet = function (index) {
		this.bullets[index].remove();
		this.bullets.splice(index, 1);
	};

	Board.prototype.removeEnemy = function (index) {
		this.enemies[index].remove();
		this.enemies.splice(index, 1);
	};

	Board.prototype.moveUser = function () {
		this.user.move(this.width);
	};

	Board.prototype.draw = function () {
		var enemyMap, html = [], that = this, len, i;

		this.map = [];

		for (i = 0, len = this.enemies.length; i < len; i++) {
			if (that.enemies[i]) {
				html.push(that.enemies[i].html());
			}
		}

		for (i = 0, len = this.bullets.length; i < len; i++) {
			if (that.bullets[i]) {
				html.push(that.bullets[i].html());
			}
		} 

		html.push(that.user.html());

		this.target.innerHTML = html.join('');
	};
	
	Board.prototype.showGameOver = function () {
		this.target.innerHTML = '<div class="game-over">Game Over</div>';
	};
	
	Board.prototype.showEndOfGame = function () {
		this.target.innerHTML = '<div class="end-of-game">You Win!</div>';
	};

	return Board;
});