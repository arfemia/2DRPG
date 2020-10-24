var viewManager   = require('../viewManager');
var TextBox       = require('../TextBox');
var Texture = require('pixelbox/Texture');


var ASSET = assets.fade.frame1;
var frame = 0;
var SCREEN_W = settings.screen.width;
var SCREEN_H = settings.screen.height;
var playerCenter = {};
var playerOffset = {};


//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
var textbox = new TextBox(160, 24, assets.font.tetris).setColor(3);
//var img = new Texture(screen.settings.w)
var timer = 0;
var camera = {x : 0, y : 0};


//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
exports.open = function (params) {
	params = params || {};
    this.params = params;
	textbox.clear();

	camera = {x: this.params.camera.x, y : this.params.camera.y}
	
	// TODO center text ?
	//textbox.addText('CHAPTER ' + params.chapter, 8, 0);
	//textbox.addText(params.title, 8, 16);
	//if (params.camera) {camera(params.camera.x, params.camera.y);}

	playerCenter = {
		x : this.params.player.x + this.params.player.w / 2,
		y : this.params.player.y + this.params.player.h / 2
	}

	playerOffset = {
		x : camera.x + 1
	}
		

	//draw(textbox.texture, 0, 64);
	this.params.player.draw();
	timer = 0;
	frame = 0;
};

//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
exports.update = function () {
	// lock screen for few frames
	if (++timer < 10) {
		
        //draw(textbox.texture, 0, 64);
        this.params.player.draw();
		return;
	};	

	
	
	paper(0); 
	var speed = 2;
	//top
	if (speed * timer < playerCenter.y - camera.y) {
		rectf(camera.x, camera.y - 2, SCREEN_W, speed * timer);
	}
	
	// left
	if (speed * timer < playerCenter.x - camera.x) {
		rectf(camera.x - 2, camera.y, speed * timer, SCREEN_H);
	}
	
	//right
	if (speed * timer < SCREEN_W + camera.x - playerCenter.x) {
		rectf(camera.x + SCREEN_W + 2, camera.y, speed * -timer, SCREEN_H);
	}
	
	//bottom
	if (speed * timer < SCREEN_H + camera.y - playerCenter.y) {
		rectf(camera.x, camera.y + SCREEN_H + 2, SCREEN_W, speed * -timer);
	}
	
	

	this.params.player.draw();
	// action

	if (timer >= 88) {
		rectf (camera.x, camera.y, SCREEN_W, SCREEN_H);
	}
	if (timer >= 95
		|| gamepad.btnp.A
		|| gamepad.btnp.B
	 || gamepad.btnp.start) viewManager.open('game', this.params);
};