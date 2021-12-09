MODEL.enemyObj = {};


MODEL.enemyObj = function(x, y, size, speed, color){
	MODEL.entityObj.call(this, x,y);
	this.color = color;
	this.size = size;
	this.entitySpeed = speed;
	this.img = MODEL.RESOURCES.dudette;
	this.changeFrameRate = size / (speed * 2);
}

MODEL.enemyObj.prototype = Object.create(MODEL.entityObj.prototype);