MODEL.RESOURCES = MODEL.RESOURCES || {};


initController = function(){

}

initController.prototype = {
	build : function(){
		MODEL.RESOURCES.TOTAL = 3;
		MODEL.RESOURCES.COUNT = 0;
		this.loadAllImages();
		this.loadAllSounds();
	},

	destroy : function(){

	},

	suspend : function(){

	},

	animate : function(){

	},

	loadAllImages : function(){
		MODEL.RESOURCES.dude = new Image();
		MODEL.RESOURCES.dude.onload = MODEL.RESOURCES.loadResourceListener;
		MODEL.RESOURCES.dude.src = "./resources/sprites/dude.png";

		MODEL.RESOURCES.dudette = new Image();
		MODEL.RESOURCES.dudette.onload = MODEL.RESOURCES.loadResourceListener;
		MODEL.RESOURCES.dudette.src = "./resources/sprites/dudette.png";

		MODEL.RESOURCES.wingman = new Image();
		MODEL.RESOURCES.wingman.onload = MODEL.RESOURCES.loadResourceListener;
		MODEL.RESOURCES.wingman.src = "./resources/sprites/wingman.png";
	},

	loadAllSounds : function(){

	}
}

MODEL.RESOURCES.loadResourceListener = function(){
	MODEL.RESOURCES.COUNT++;
	if(MODEL.RESOURCES.COUNT == MODEL.RESOURCES.TOTAL){
		cm.loadController(new runningController());
	}
}