define(['lib/Events', 'app/Board'], function(Events, Board) {
	var mainContainer = document.querySelector('#main-container'),
		board = new Board({
			target: mainContainer
		});

	board.setEnemiesByMatrix([
		[1,1,1,0,1,1,1,0,0,0,0,0,0],
		[1,1,1,0,1,1,1,0,0,0,0,0,0]
	]);

	board.draw();

	var interval = setInterval(function() {
		if (!board.animation) {
			clearInterval(interval);
			interval = null;
		}

		board.moveEnemies();
		board.draw();
	}, 1000);
});