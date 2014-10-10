define(function () {
	var Enemy = function () {
		this.pointsWidth = 2;
		this.pointsHeight = 1;
		this.gapX = 1;
		this.gapY = 1;
		this.pointX;
		this.pointY;
		this.direction = 'right';
		this.lastMap = [];
	};

	Enemy.prototype.setPointMatrixPositions = function (pointX, pointY) {
		this.pointX = parseInt(pointX, 10);
		this.pointY = parseInt(pointY, 10);
	};

	Enemy.prototype.calculateMap = function () {
		if (typeof this.pointX !== 'number' || typeof this.pointY !== 'number') return false;

		this.lastMap = [];
		for (var i = 0; i < this.pointsWidth; i++) {
			for (var j = 0; j < this.pointsHeight; j++) {
				this.lastMap.push([
					((this.pointX * (this.gapX * 1)) + (this.pointX * (this.pointsWidth))) + this.gapX + i,
					((this.pointY * (this.gapY * 1)) + (this.pointY * (this.pointsHeight))) + this.gapY + j
				]);
			}
		}

		return this.lastMap;
	};

	return Enemy;
});