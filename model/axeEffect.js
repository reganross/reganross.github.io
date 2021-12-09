MODEL.axeEffect = function(){
	this.innerRadius = 5;
	this.duration = 5 * MODEL.framerate; 
}

MODEL.axeEffect.prototype = {
	getInnerRadius : function(){
		return this.innerRadius;
	},
	getOuterRadius : function(){
		return this.innerRadius + 5;
	},
	decay : function(){
		this.innerRadius %= 10;
		this.innerRadius += .5;
		this.innerRadius = Math.max(this.innerRadius, 5);
		this.duration--
	},
	getDuration : function(){
		return this.duration
	},
	getX : function(){
		return MODEL.player.getX();
	},
	getY: function(){
		return MODEL.player.getY();
	},
	getSize: function(){
		return this.getOuterRadius();
	}
}