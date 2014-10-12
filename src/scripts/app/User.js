define(['app/Entity'], function (Entity) {
	var User = function () {
		Entity.call(this);

		this.name = 'user';
		this.width = 60;
		this.height = 20;
		this.x = undefined;
		this.y = undefined;
		this.activeDirection = undefined;
		this.moveStepSize = 10;
	}
	.extends(Entity);

	User.prototype.move = function (maxX) {
		if (this.activeDirection === 'left') {
			if (this.x >= this.moveStepSize) {
				this.x -= this.moveStepSize;
			}
		}
		else if (this.activeDirection === 'right') {
			if (this.x <= maxX - this.width - this.moveStepSize) {
				this.x += this.moveStepSize;
			}
		}

		return this;
	};

	return User;
});