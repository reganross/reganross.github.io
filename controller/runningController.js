CONTROLLER = {};
CONTROLLER.PRIVATE = {};
CONTROLLER.POWERUP =  CONTROLLER.POWERUP || {};

runningController = function(){
	this.clock;
	this.powerups;
}

runningController.prototype = { 
	build: function(){
		this.animate();
		this.powerups = new CONTROLLER.POWERUP.powerUpControllerObj();
		MODEL.player = new MODEL.playerObj(40.7, 40);
		MODEL.actors = [];
		MODEL.secondCount = 0;
		MODEL.score = 0;
		MODEL.loser = false;
		MODEL.backgroundOpacity = 0;
		MODEL.started = false;
	},

	destroy: function(){
		clearInterval(this.clock);
		CANVAS.removeEventListener('mousedown', CONTROLLER.PRIVATE.move);
	},

	suspend: function(){
		this.destroy();
	},

	animate: function(){
		CANVAS.addEventListener("mousedown", CONTROLLER.PRIVATE.move ,false);
		var self = this;
		this.clock = setInterval(function(){
			self.update.call(self); 
		}, 1000 / MODEL.framerate);
	},

	update : function(){
		VIEW.clearBoard();

		if(MODEL.started){
			this.updatePlayerLocation();
			this.calculateActorSpeed();
			this.actorHitDetection();
			this.updateActorLocations();
			this.powerups.execute();
			this.generateActors();
			this.playerHitDetection();
		}

		VIEW.drawBoard();
	},

	updatePlayerLocation : function(){
		var player = MODEL.player;

		player.setLocation(player.getX() + player.getXSpeed(),
							player.getY() + player.getYSpeed());
		
		player.advanceFrame();
		if((Math.abs(player.getX() - player.getDestinationX()) < 2)
			&& (Math.abs(player.getY() - player.getDestinationY()) < 2)){
			player.setX(player.getDestinationX());
			player.setY(player.getDestinationY());
			player.setXSpeed(0);
			player.setYSpeed(0);
			player.standStill();
		}
	},

	calculateActorSpeed : function(){
		var player = MODEL.player;

		for(var i = 0; i < MODEL.actors.length; i++){
			var actor = MODEL.actors[i];
			var deltaX = player.getX() - actor.getX();
			var deltaY = player.getY() - actor.getY();

			actor.setAngle(CONTROLLER.HELPER.findAngle(deltaX,deltaY));
			actor.advanceFrame();

			actor.setXSpeed(CONTROLLER.HELPER.calculateSpeed(deltaX, deltaY, actor.getEntitySpeed()));
			actor.setYSpeed(CONTROLLER.HELPER.calculateSpeed(deltaY, deltaX, actor.getEntitySpeed()));
		}
		
	},

	updateActorLocations : function(){
		MODEL.secondCount++;
		for(var i = 0; i < MODEL.actors.length; i++){
			var actor = MODEL.actors[i];

			actor.setX(actor.getX() + actor.getXSpeed());
			actor.setY(actor.getY() + actor.getYSpeed());
		}
	},

	actorHitDetection : function(){
		var player = MODEL.player;

		for(var i = 0; i < MODEL.actors.length; i++){
			var actor1 = MODEL.actors[i];
			for (var j = i + 1; j < MODEL.actors.length; j++){
				var actor2 = MODEL.actors[j];
				if(CONTROLLER.HELPER.detectHit(actor1, actor2)){
					var distance1 = CONTROLLER.HELPER.calculateDistance(player, actor1);
					var distance2 = CONTROLLER.HELPER.calculateDistance(player, actor2);

					if(distance1 <= distance2){
						actor2.setXSpeed(0);
						actor2.setYSpeed(0);
					}else{
						actor1.setXSpeed(0);
						actor1.setYSpeed(0);
					}
				}
			}
		}
	},

	generateActors : function(){
		if(MODEL.secondCount >= MODEL.framerate){
			var side = Math.floor(Math.random() * 4) + 1;
			var size = Math.floor(Math.random() * 9) + 3;
			var speed = Math.floor(Math.random() * 3) + 1;
			var coord = {};
			switch (side) {
				case 1:
					coord.x = 0 - size;
					coord.y = Math.floor(Math.random() * CANVAS.height);
					break;

				case 2:
					coord.x = CANVAS.width; + size;
					coord.y = Math.floor(Math.random() * CANVAS.height);
					break;

				case 3:
					coord.x = Math.floor(Math.random() * CANVAS.width);
					coord.y = 0 - size;
					break;

				case 4:
					coord.x = Math.floor(Math.random() * CANVAS.width);
					coord.y = CANVAS.height; + size;
					break;	
			}

			MODEL.actors.push(new MODEL.enemyObj(coord.x, coord.y, size, speed, '#FF3399'));
			MODEL.secondCount = 0;
			if(!MODEL.loser)
				MODEL.score++;
		}
	},

	playerHitDetection : function(){
		var player = MODEL.player;

		for( var i = 0; i < MODEL.actors.length; i++){
			var actor = MODEL.actors[i];
			
			if(CONTROLLER.HELPER.detectHit(player, actor) && !MODEL.loser){
				MODEL.loser = true;
				var menu = new menuController();
				cm.pushModalController(new menuController());
			}

		}
	}
}

CONTROLLER.PRIVATE.move = function(event){
	var player = MODEL.player;

	var x, y;
	x = CONTROLLER.HELPER.scaleX(event.pageX);
	y = CONTROLLER.HELPER.scaleY(event.pageY);

	if((Math.abs((x - player.getX())) < 2) && Math.abs(((y - player.getY() < 2)))){
		return;
	}

	player.setDestination(x, y);

	var deltaX = x - player.getX();
	var deltaY = y - player.getY();

	player.setAngle(CONTROLLER.HELPER.findAngle(deltaX,deltaY));

	player.setXSpeed(CONTROLLER.HELPER.calculateSpeed(deltaX, deltaY, player.getEntitySpeed()));
	player.setYSpeed(CONTROLLER.HELPER.calculateSpeed(deltaY, deltaX, player.getEntitySpeed()));
	MODEL.started = true;
}