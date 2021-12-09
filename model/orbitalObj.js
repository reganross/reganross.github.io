MODEL.orbitalObj = {};

MODEL.orbitalObj = function(phase){
	this.orbitalCenter = MODEL.player.getLocation();
	this.distance = 15;
	this.size = 5;
	this.phase = phase;
	this.center = new MODEL.location();
	this.color = '#0099FF'; 
	this.update();
	this.speed = .1;
	this.img = new Image();
	this.img.src = "./resources/sprites/wingman.png";
	this.frames = 8;
	this.currentFrame = 0;
	this.changeFrameRate = 1;
	this.counter = this.changeFrameRate;
	this.angle = 0;
}

MODEL.orbitalObj.prototype = {
	update : function(){
		var deltaX = Math.cos(this.phase) * this.distance;
		var deltaY = Math.sin(this.phase) * this.distance;
		this.setAngle(CONTROLLER.HELPER.findAngle(deltaX,deltaY) + Math.PI/2);
		this.center.setX(this.orbitalCenter.getX() + deltaX);
		this.center.setY(this.orbitalCenter.getY() + deltaY);
		this.advanceFrame();
	},
	orbit : function(){
		this.phase += this.speed;
		this.phase %= 360;
		this.update();
	},
	getX: function(){
		return this.center.getX();
	},
	getY: function(){
		return this.center.getY();
	},
	getSize : function(){
		return this.size;
	},
	getColor : function(){
		return this.color;
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