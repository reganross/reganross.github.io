MODEL.axeEffectedObj = {};

MODEL.axeEffectedObj = function(x, y, size, speed, color){
	MODEL.enemyObj.call(this, x, y ,size, speed, color);
	this.countdown = 3.5 * MODEL.framerate;
	this.img.src = "./resources/sprites/dudette.png";
}

MODEL.axeEffectedObj.prototype = Object.create(MODEL.enemyObj.prototype);

MODEL.axeEffectedObj.prototype.getCountdown = function(){
	return this.countdown;
}

MODEL.axeEffectedObj.prototype.decay = function(){
	this.countdown--;
}