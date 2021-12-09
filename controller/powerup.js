CONTROLLER.POWERUP = {};

MODEL.POWERUP = {};
MODEL.POWERUP.axeEffected = [];
MODEL.POWERUP.wingMen = [];
MODEL.POWERUP.paired = [];

CONTROLLER.POWERUP.powerUpControllerObj = function(){
	this.CONSTANTS = {};

	this.CONSTANTS.MAXTIMEFORNEWPOWERUP = 10;
	this.CONSTANTS.MINTIMEFORNEWPOWERUP = 5;
	this.CONSTANTS.NUMBEROFWINGMEN = 5;

	this.state = 'generatePowerUp';
	this.functions = ['axeEffect', 'wingMen'];
	this.powerUpTimer = 0;
	this.powerUpThreshold = this.CONSTANTS.MINTIMEFORNEWPOWERUP * MODEL.framerate;
	this.gameReset();
}

CONTROLLER.POWERUP.powerUpControllerObj.prototype = {
	execute : function(){
		this[this.state]();
		this.axeEffectedController();
		this.wingMenController();
		this.pairedController();
	},
	reset: function(){
		MODEL.currentPowerup = {};
		MODEL.consumable = {};
		this.powerUpTimer = 0;
		this.powerUpThreshold = (Math.floor(Math.random() * this.CONSTANTS.MAXTIMEFORNEWPOWERUP)
									 + this.CONSTANTS.MINTIMEFORNEWPOWERUP) * MODEL.framerate;
		this.state = 'generatePowerUp';

	},
	gameReset: function(){
		this.reset();
		MODEL.POWERUP.axeEffected.length = 0;
		this.powerUpThreshold = this.CONSTANTS.MINTIMEFORNEWPOWERUP * MODEL.framerate;
		MODEL.POWERUP.wingMen.length = 0;
		MODEL.POWERUP.paired.length = 0;
	},
	generatePowerUp : function(){
		if(this.powerUpTimer == this.powerUpThreshold){
			var x = Math.floor(Math.random() * CANVAS.width);
			var y = Math.floor(Math.random() * CANVAS.height);
			MODEL.consumable = new MODEL.powerup(x,y);
			this.state = 'hitDetection';
		}else{
			this.powerUpTimer++;
		}
	},
	hitDetection : function(){
		if(CONTROLLER.HELPER.detectHit(MODEL.player, MODEL.consumable)){
			var power = Math.floor(Math.random() * this.functions.length);
			MODEL.consumable = {};
			this.state = this.functions[power];
		}else if(MODEL.consumable.getLifetime() <= 0){
			this.reset();
		}else{
			MODEL.consumable.reduceLifetime();
		}
	},
	axeEffect: function(){
		var player = MODEL.player
		if((Object.keys(MODEL.currentPowerup).length === 0))
			MODEL.currentPowerup = new MODEL.axeEffect();

		if(MODEL.currentPowerup.getDuration() > 0){
			for (var i = 0; i < MODEL.actors.length; i++){
				var actor = MODEL.actors[i]
				if(CONTROLLER.HELPER.detectHit(MODEL.currentPowerup, actor)){
					MODEL.actors.splice(i, 1);
					i--;

					var deltaX = player.getX() - actor.getX();
					var deltaY = player.getY() - actor.getY();

					var axeEffected = new MODEL.axeEffectedObj(actor.getX(), actor.getY(),
													actor.getSize(), actor.getEntitySpeed(), actor.getColor());

					axeEffected.setAngle(CONTROLLER.HELPER.findAngle(deltaX,deltaY));

					axeEffected.setXSpeed(CONTROLLER.HELPER.calculateSpeed(deltaX, deltaY, 5.1));
					axeEffected.setYSpeed(CONTROLLER.HELPER.calculateSpeed(deltaY, deltaX, 5.1));

					MODEL.POWERUP.axeEffected.push(axeEffected);
				}
			}

			MODEL.currentPowerup.decay();
		}else{
			this.reset();		
		}	
	},
	axeEffectedController: function(){
		for (var i = 0; i < MODEL.POWERUP.axeEffected.length; i++){
			var actor = MODEL.POWERUP.axeEffected[i];
			actor.setX(actor.getX() - actor.getXSpeed());
			actor.setY(actor.getY() - actor.getYSpeed());
			actor.decay();
			actor.advanceFrame();
			if(actor.getCountdown()<= 0){
				MODEL.POWERUP.axeEffected.splice(i, 1);
				MODEL.actors.push(new MODEL.enemyObj(actor.getX(), actor.getY(),
													actor.getSize(), actor.getEntitySpeed(), actor.getColor()));
			}
		}
	},
	wingMen: function(){
		MODEL.POWERUP.wingMen = [];
		for (var i = 0; i < this.CONSTANTS.NUMBEROFWINGMEN; i++){
			var phaseDistance = (2 * Math.PI) / this.CONSTANTS.NUMBEROFWINGMEN;
			var phase = phaseDistance * i;
			var wingman = new MODEL.orbitalObj(phase);
			MODEL.POWERUP.wingMen.push(wingman);
		}
		this.reset();
	},
	wingMenController: function(){
		for(var i = 0; i < MODEL.POWERUP.wingMen.length; i++){
			MODEL.POWERUP.wingMen[i].orbit();
		}
		for( var i = 0; i < MODEL.POWERUP.wingMen.length; i++){
			var wingman = MODEL.POWERUP.wingMen[i];
			for ( var j = 0; j < MODEL.actors.length; j++){
				var enemy = MODEL.actors[j];
				if(CONTROLLER.HELPER.detectHit(wingman, enemy)){
					MODEL.POWERUP.wingMen.splice(i,1);
					MODEL.actors.splice(j,1);

					var deltaX = MODEL.player.getX() - enemy.getX();
					var deltaY = MODEL.player.getY() - enemy.getY();

					var speedX = CONTROLLER.HELPER.calculateSpeed(deltaX, deltaY, enemy.getEntitySpeed());
					var speedY = CONTROLLER.HELPER.calculateSpeed(deltaY, deltaX, enemy.getEntitySpeed());

					var paired = new MODEL.entityObj(wingman.getX(), wingman.getY());

					var angle = CONTROLLER.HELPER.findAngle(deltaX, deltaY);

					enemy.setXSpeed(speedX);
					enemy.setYSpeed(speedY);
					enemy.setAngle(angle);

					paired.setXSpeed(speedX);
					paired.setYSpeed(speedY);
					paired.setAngle(angle);

					MODEL.POWERUP.paired.push(enemy);
					MODEL.POWERUP.paired.push(paired);
				}
			}
		}
	},
	pairedController: function(){
		for (var i = 0; i < MODEL.POWERUP.paired.length; i++){
			var actor = MODEL.POWERUP.paired[i];
			actor.setX(actor.getX() - actor.getXSpeed());
			actor.setY(actor.getY() - actor.getYSpeed());
			actor.advanceFrame();
		}
	}
}