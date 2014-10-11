define(['app/Entity'], function (Entity) {
	var Bullet = function () {
		Entity.call(this);
		
		this.name = 'bullet';
		this.width = 5;
		this.height = 5;
		this.x = undefined;
		this.y = undefined;
	}
	.extends(Entity);

	Bullet.prototype.move = function () {
		this.y -= this.moveStepSize;
		return this;
	};

	return Bullet;
});