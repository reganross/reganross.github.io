MODEL.playerObj = {};

MODEL.playerObj = function(x,y){
	MODEL.entityObj.call(this, x,y);
	this.destination = new MODEL.location();
	this.size = 5;
	this.img = MODEL.RESOURCES.dude;
	this.changeFrameRate = this.size / (this.entitySpeed * 2);
}

MODEL.playerObj.prototype = Object.create( MODEL.entityObj.prototype);

MODEL.playerObj.prototype.setDestination = function(x,y){
	this.destination.setLocation(x,y);
}

MODEL.playerObj.prototype.getDestination = function(){
	return this.destination.getLocation();
}
MODEL.playerObj.prototype.getDestinationX = function(){
	return this.destination.getX();
}
MODEL.playerObj.prototype.getDestinationY = function(){
	return this.destination.getY();
}