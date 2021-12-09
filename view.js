var VIEW = VIEW || {};

VIEW.drawActor = function(actor) {
	var draw = VIEW.draw;

	if(!(Object.keys(actor).length === 0)){
		draw.beginPath();
		draw.arc(actor.getX(),
				 actor.getY(),
				 actor.getSize(),
				 0, 2 * Math.PI, false);
		draw.closePath();
		draw.fillStyle = actor.getColor();
		draw.fill();
		draw.strokeStyle = actor.getColor();
		draw.stroke();
	}
}

VIEW.drawAxeEffect = function(){
	var draw = VIEW.draw;
	var powerup = MODEL.currentPowerup;

	if(!(Object.keys(powerup).length === 0)){
		draw.beginPath();
		draw.arc(powerup.getX(), powerup.getY(), powerup.getOuterRadius(), 0, 2 * Math.PI, false);
		draw.closePath();
		draw.fillStyle = 'rgba(224,221,20,.7)';
		draw.fill();
		draw.strokeStyle = 'rgba(224,221,20,.7)';
		draw.stroke();

		draw.beginPath();
		draw.arc(powerup.getX(), powerup.getY(), powerup.getInnerRadius(), 0, 2 * Math.PI, false);
		draw.closePath();
		draw.fillStyle = 'rgba(255,255,255,1)';
		draw.fill();
	}

}

VIEW.drawEntity = function(entity){
	var draw = VIEW.draw;
	if(!(Object.keys(entity).length === 0)){
		var frameWidth = entity.getImage().width / entity.getNumOfFrames();
		var sx = frameWidth * entity.getCurrentFrame();
		var newSize = entity.getScaledSize();

		draw.save();
		draw.translate(entity.getX(), entity.getY());
		draw.rotate(entity.getAngle());
		draw.drawImage(entity.getImage(), sx, 0, frameWidth - 1, entity.getImage().height,
						-newSize / 2, -newSize / 2, newSize, newSize);
		draw.restore();
	}
}

VIEW.drawBoard = function(){
	var actors = MODEL.actors;
	var axe = MODEL.POWERUP.axeEffected;
	var wing = MODEL.POWERUP.wingMen;
	var pair = MODEL.POWERUP.paired;
	VIEW.drawScore();
	VIEW.drawAxeEffect();
	VIEW.drawEntity(MODEL.player);
	for( var i = 0; i < actors.length; i++){
		VIEW.drawEntity(actors[i]);
	}
	for( var i = 0; i < axe.length; i++){
		VIEW.drawEntity(axe[i]);
	}
	for( var i = 0; i < wing.length; i++){
		VIEW.drawEntity(wing[i]);
	}
	for( var i = 0; i < pair.length; i++){
		VIEW.drawEntity(pair[i]);
	}
	VIEW.drawActor(MODEL.consumable);
}

VIEW.clearBoard = function(){
	CANVAS.width = CANVAS.width;
}

VIEW.setBackgroundBlack = function(){
	var draw = VIEW.draw;

	draw.rect(0,0, CANVAS.width, CANVAS.height);
	draw.fillStyle = 'rgba(10,10,10, ' + MODEL.backgroundOpacity + ')';
	draw.fill();
}

VIEW.displayLoss = function(){
	var draw = VIEW.draw;

	var x = CANVAS.width / 2;
	var y = CANVAS.height / 3;

	draw.font = '30pt Calibri';
    draw.textAlign = 'center';
    draw.fillStyle = 'white';
    draw.fillText('You Lose', x, y);

    draw.font = '16pt Calibri';
    draw.fillText('Restart', x, y + 30);

    draw.fillText('Keep Playing', x, y + 55);
    	VIEW.drawScore();
}

VIEW.drawScore = function(){
	var draw = VIEW.draw;

	var x = CANVAS.width - 1;
	var y = CANVAS.height - 5;

	draw.textAlign = 'right';
	draw.font = '16pt Calibri';
	draw.fillText(MODEL.score, x, y);
}

VIEW.highlightRestart = function(){
	var draw = VIEW.draw;

	var x = CANVAS.width / 2;
	var y = CANVAS.height / 3;

	draw.font = '16pt Calibri';
    draw.textAlign = 'center';
    draw.fillStyle = 'blue';

    draw.fillText('Restart', x, y + 30);
}

VIEW.highlightKeepPlaying = function(){
	var draw = VIEW.draw;

	var x = CANVAS.width / 2;
	var y = CANVAS.height / 3;

	draw.font = '16pt Calibri';
    draw.textAlign = 'center';
    draw.fillStyle = 'blue';

    draw.fillText('Keep Playing', x, y + 55);
}