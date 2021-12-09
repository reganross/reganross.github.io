menuController = function(){
	this.clock;
}

menuController.prototype = {
	build : function(){
		var self = this;
		this.clock = setInterval(function(){
			self.fadeToMenu.call(self);
		}, 1000 / MODEL.framerate);
	},	

	destroy : function(){
		//CANVAS.parentNode.replaceChild(CANVAS.cloneNode(true), CANVAS);
		CANVAS.removeEventListener("mousemove", this.triggerHighlight);
		CANVAS.removeEventListener("mousedown", CONTROLLER.MENU.selectOption);
		clearInterval(this.clock);
		delete CONTROLLER.MENU.selectOption;
	},

	suspend : function(){
		this.destroy();
	},

	animate :  function(){
		var self = this;
		CONTROLLER.MENU.selectOption = function(){
			self.selectOption.call(self, event);
		}
		CANVAS.addEventListener("mousemove", this.triggerHighlight);
		CANVAS.addEventListener("mousedown", CONTROLLER.MENU.selectOption);
	},

	fadeToMenu : function(){
		VIEW.drawBoard();
		VIEW.setBackgroundBlack();
		if(MODEL.backgroundOpacity <.8){
			MODEL.backgroundOpacity += .04
		}else{
			clearInterval(this.clock);
			VIEW.displayLoss();
			this.animate();
		}
	},

	triggerHighlight : function(event) {
		VIEW.drawBoard();
		VIEW.setBackgroundBlack();
		VIEW.displayLoss();	

		var y;
		y = CONTROLLER.HELPER.scaleY(event.pageY);

		if((y > (CANVAS.height / 3) + 15)
		 && (y < ((CANVAS.height / 3) + 40))){
			VIEW.highlightRestart();
		} else if ((y > (CANVAS.height / 3) + 40)
		 && (y < ((CANVAS.height / 3) + 65))){
			VIEW.highlightKeepPlaying();
		}
	},

	selectOption : function(event){
		var y;
		y = CONTROLLER.HELPER.scaleY(event.pageY);

		if((y > (CANVAS.height / 3) + 15)
		 && (y < ((CANVAS.height / 3) + 40))){
			this.restart();
		} else if ((y > (CANVAS.height / 3) + 40)
		 && (y < ((CANVAS.height / 3) + 65))){
			this.keepPlaying();
		}
	},

	restart : function(){
		VIEW.clearBoard();
		cm.popModalController();
		cm.loadController(new runningController());
	},

	keepPlaying : function(){
		VIEW.clearBoard();
		cm.popModalController();
	    VIEW.drawBoard();    
	}
}

CONTROLLER.MENU = {};