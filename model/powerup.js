MODEL.powerup = function(x,y){
	this.locale = new MODEL.location(x,y);
	this.lifetime = 12 * MODEL.framerate;
}

MODEL.powerup.prototype = {
	getColor: function(){
		var alpha = this.lifetime/(12 * MODEL.framerate);
		alpha = Math.max(alpha, .4);
		return 'rgba(70, 191, 13, ' + alpha + ')';
	},
	getLifetime: function(){
		return this.lifetime;
	},
	getX: function(){
		return this.locale.getX();
	},
	getY: function(){
		return this.locale.getY();
	},
	reduceLifetime: function(){
		this.lifetime--;
	},
	getSize: function(){
		return 3;
	}
}