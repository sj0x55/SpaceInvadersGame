define(['app/Entity'], function (Entity) {
	var Enemy = function () {
		Entity.call(this);

		this.name = 'enemy';
		this.width = 40;
		this.height = 15;
		this.margin = 30;
		this.x = undefined;
		this.y = undefined;
		this.direction = 'right';
	}
	.extends(Entity);

	Enemy.prototype.move = function () {

		if (this.direction == 'right') {
			this.x += this.moveStepSize;
		}
		else {
			this.x -= this.moveStepSize;
		}

		return this;
	};

	Enemy.prototype.down = function () {
		this.y += this.height + this.margin;

		return this;
	};

	Enemy.prototype.contain = function (x, y) {
		if ((x >= this.x && x <= (this.x + this.width)) && (y >= this.y && y <= (this.y + this.height))) {
			return true;
		}

		return false;
	};

	Enemy.prototype.revertDirection = function () {
		if (this.direction === 'right') {
			this.direction = 'left';
		}
		else {
			this.direction = 'right';
		}
	};

	return Enemy;
});