define([], function () {
	var Board = function (config) {
		this.target = config.target;
		this.width = config.width || 600;
		this.height = config.height || 400;
		this.enemies = [];
		this.user = [];
		this.map = {

		};
	};

	Board.prototype.setEnemiesByMap = function (map) {

		// for (var i = 0, l = map.length; i < l; i++) {
		// 	for (var j = 0, l2 = map[i].length; i < l2; j++) {
		// 		if (map[i][j]) {
		// 			this.enemies.push(new Enemy(i, j));
		// 		}
		// 	}
		// }
	};

	Board.prototype.draw = function () {

	};

	return Board;
});