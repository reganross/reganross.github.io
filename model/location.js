MODEL.location = function(x, y){
	this.x = x;
	this.y = y;
}

MODEL.location.prototype = {
	setX: function(x){
		this.x = x;
	},
	setY: function(y){
		this.y = y;
	},
	setLocation: function(x,y){
		this.setX(x);
		this.setY(y);
	},
	getX: function(){
		return this.x;
	},
	getY: function(){
		return this.y;
	},
	getLocation: function(){
		return this;
	}
}