define(function () {
	var User = function () {
		this.pointsWidth = 2;
		this.pointsHeight = 1;
		this.pointX;
		this.pointY;
		this.lastMap = [];
	};

	User.prototype.setPointPositions = function (pointX, pointY) {
		this.pointX = parseInt(pointX, 10);
		this.pointY = parseInt(pointY, 10);
	};

	User.prototype.calculateMap = function () {
		if (typeof this.pointX !== 'number' || typeof this.pointY !== 'number') return false;

		this.lastMap = [];
		for (var i = 0; i < this.pointsWidth; i++) {
			for (var j = 0; j < this.pointsHeight; j++) {
				this.lastMap.push([
					this.pointX + i,
					this.pointY + j
				]);
			}
		}

		return this.lastMap;
	};

	return User;
});