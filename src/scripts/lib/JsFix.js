Function.prototype.extends = function(parent) {
	this.prototype = Object.create(parent.prototype);
	this.prototype.super = parent.prototype;

	return this;
};