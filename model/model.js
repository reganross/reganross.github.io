var MODEL = MODEL || {}
MODEL.actors = [];
MODEL.player = {};
MODEL.currentPowerup = {};
MODEL.secondCount = 0;
MODEL.score = 0;
MODEL.loser = false;
MODEL.framerate = 20;
MODEL.backgroundOpacity = 0;
MODEL.powerUpThreshold = 5 * MODEL.framerate;
MODEL.powerUpTimer = 0;
MODEL.consumable = {};