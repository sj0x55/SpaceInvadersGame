define(['lib/Events', 'app/Board', 'app/Bullet'], function(Events, Board, Bullet) {
	var mainContainer = document.querySelector('#main-container'),
		board = new Board({
			target: mainContainer
		});

	board.setEnemiesMap([
		[1,1,1,0,1,1,1,0,1,1,1],
		[1,1,1,0,1,1,1,0,1,1,1],
		[1,1,1,0,1,1,1,0,1,1,1],
	]);

	board.draw();

	var gameLoop,
		gameIterations = 0,
		gameSpeed = 50,
		gameFunc = function() {
			if (board.isEndOfGame) {
				board.showEndOfGame();
			}
			else if (board.isGameOver) {
				board.showGameOver();
			}
			else {
				board.draw();
				gameLoop = setTimeout(gameFunc, gameSpeed);
			}
		},
		enemiesLoop,
		enemiesIterations = 0,
		enemiesSpeed = 1000,
		enemiesFunc = function() {
			if (enemiesIterations++ >= 10) {
				enemiesIterations = 0;
				board.downEnemies();

				if (enemiesSpeed > 200) {
					enemiesSpeed = enemiesSpeed - 50;
				}
			}

			board.moveEnemies();
			enemiesLoop = setTimeout(enemiesFunc, enemiesSpeed);
		},
		bulletsLoop,
		bulletsSpeed = 20,
		bulletsFunc = function() {
			board.moveBullets();
			bulletsLoop = setTimeout(bulletsFunc, bulletsSpeed);
		},
		userLoop,
		userSpeed = 50,
		userFunc = function() {
			board.moveUser();
			userLoop = setTimeout(userFunc, userSpeed);
		};

	gameLoop = setTimeout(gameFunc, gameSpeed);
	enemiesLoop = setTimeout(enemiesFunc, enemiesSpeed);
	bulletsLoop = setTimeout(bulletsFunc, bulletsSpeed);
	userLoop = setTimeout(userFunc, userSpeed);
});