define(function () {
	var 
	index = 0;
	Entity = function () {
		this.name = 'entity';
		this.width = undefined;
		this.height = undefined;
		this.x = undefined;
		this.y = undefined;
		this.moveStepSize = 20;
		this.uniqueIndex = ++index;
	};

	Entity.prototype.setPosition = function (x, y) {
		this.x = parseInt(x, 10);
		this.y = parseInt(y, 10);
		return this;
	};

	Entity.prototype.html = function () {
		return '<div id="entity-' + this.uniqueIndex + '" class="entity ' + this.name + '" style="width: ' + this.width + 'px; height: ' + this.height + 'px; top: ' + this.y + 'px; left: ' + this.x + 'px;"></div>';
	};

	Entity.prototype.remove = function () {
		var element = document.querySelector('#entity-' + this.uniqueIndex);
		if (element) {
			element.remove();
		}
	};

	return Entity;
});