CM = function(){
	this.currentController;
	this.controllerStack = [];
}

CM.prototype = {
	loadController : function(controller){
		if(this.controllerStack.length > 0){
			throw "Modal Active";
		}
		if(this.currentController){
			this.currentController.destroy();
		}
		this.currentController = controller;
		this.currentController.build();
	},

	pushModalController : function(controller){
		this.currentController.suspend();
		this.controllerStack.push(this.currentController);
		this.currentController = controller;
		this.currentController.build();
	},

	popModalController : function(){
		this.currentController.destroy();
		this.currentController = this.controllerStack.pop();
		this.currentController.animate();
	}
}