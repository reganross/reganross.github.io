CONTROLLER.HELPER = {};

CONTROLLER.HELPER.calculateSpeed = function(deltaX, deltaY, totalSpeed){
	return (deltaX/(Math.abs(deltaX) + Math.abs(deltaY)) * totalSpeed);
}

CONTROLLER.HELPER.detectHit = function(actor1, actor2){
	var distance = CONTROLLER.HELPER.calculateDistance(actor1, actor2);

	if(distance <= Math.pow(actor1.getSize() + actor2.getSize(), 2)){
		return true;
	}else {
		return false;
	}
}

CONTROLLER.HELPER.calculateDistance = function(actor1, actor2){
	var dX = actor1.getX() - actor2.getX();
	var dY = actor1.getY() - actor2.getY();

	return Math.pow(dX, 2) + Math.pow(dY, 2);
}

CONTROLLER.HELPER.scaleX = function(x)
{
	var scale = window.innerWidth / CANVAS.width;
	return x  / scale;
}

CONTROLLER.HELPER.scaleY = function(y)
{
	var scale = window.innerHeight / CANVAS.height;
	return y  / scale;
}

CONTROLLER.HELPER.findAngle = function(x,y){
	var angle = Math.atan2(x,y);

	return -angle;
}