MODEL.entityObj = function(x, y){
	this.location = new MODEL.location(x,y);
	this.size = 5;
	this.color = '#0099FF'; 
	this.xSpeed = 0;
	this.ySpeed = 0;
	this.entitySpeed = 5;
	this.img = MODEL.RESOURCES.wingman;
	this.frames = 8;
	this.currentFrame = 0;
	this.changeFrameRate = this.size / (this.entitySpeed * 2);
	this.counter = this.changeFrameRate;
	this.angle = 0;
}

MODEL.entityObj.prototype = {
	setX: function(x){
		this.location.setX(x);
	},
	setY: function(y){
		this.location.setY(y);
	},
	setLocation: function(x,y){
		this.location.setLocation(x,y);
	},
	getX: function(){
		return this.location.getX();
	},
	getY: function(){
		return this.location.getY();
	},
	getLocation: function(){
		return this.location.getLocation();
	},
	getSize: function(){
		return this.size;
	},
	getColor: function(){
		return this.color;
	},
	getXSpeed: function(){
		return this.xSpeed;
	},
	getYSpeed: function(){
		return this.ySpeed;
	},
	getEntitySpeed: function(){
		return this.entitySpeed;
	},
	setXSpeed: function(x){
		this.xSpeed = x;
	},
	setYSpeed: function(y){
		this.ySpeed = y;
	},
	getAngle: function(){
		return this.angle;
	},
	setAngle: function(theta){
		this.angle = theta;
	},
	getImage: function(){
		return this.img;
	},
	getNumOfFrames: function(){
		return this.frames;
	},
	getCurrentFrame: function(){
		return this.currentFrame;
	},
	advanceFrame: function(){
		this.counter--;

		if(this.counter < 0){
			this.currentFrame++;
			this.currentFrame %= this.frames;
			this.counter = this.changeFrameRate;
		}
	},
	standStill: function(){
		this.currentFrame = 3;
	},
	getScaledSize: function(){
		return 40 * (this.size/10);
	}
}