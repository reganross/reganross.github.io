var CANVAS;
document.addEventListener('DOMContentLoaded',function(){
    CANVAS = document.getElementById("gameArea");
	VIEW.draw = CANVAS.getContext("2d");
    VIEW.drawBoard();
    cm = new CM();
    cm.loadController(new initController());
},false);