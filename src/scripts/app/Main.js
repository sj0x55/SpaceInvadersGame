define(['lib/Events', 'app/Board'], function(Events, Board) {
	var mainContainer = document.querySelector('#main-container'),
		board = new Board({
			target: mainContainer,
			width: 400,
			height: 400
		});

	board.setEnemiesByMap([
		[1,1,1,0,1,1,1],
		[1,1,1,0,1,1,1],
		[1,1,1,0,1,1,1],
	]);

	board.draw();
});