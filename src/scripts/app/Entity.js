define(function () {
	var Entity = function () {
		this.name = 'entity';
		this.width = undefined;
		this.height = undefined;
		this.x = undefined;
		this.y = undefined;
		this.moveStepSize = 20;
	};

	Entity.prototype.setPosition = function (x, y) {
		this.x = parseInt(x, 10);
		this.y = parseInt(y, 10);
		return this;
	};

	Entity.prototype.html = function () {
		return '<div class="entity ' + this.name + '" style="width: ' + this.width + 'px; height: ' + this.height + 'px; top: ' + this.y + 'px; left: ' + this.x + 'px;"></div>';
	};

	return Entity;
});