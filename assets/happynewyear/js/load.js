/*
The MIT License

Copyright (c) 2014 kong <congcoi123@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

var IMG = {}, RAW = {};
var numberItemLoaded = 0, numberRequire = 0;
var stage, layer, groupLoad, tweenLoad, textDay, textWait;

$(document).ready(function() {
	$('body').show();
	loadAssets();
});

function load(sound) {
	// increase items
	numberItemLoaded++;

	// set text
	var displayText = Math.floor(numberItemLoaded*30/numberRequire);
	textDay.setText(displayText);
	textDay.setOffset({
    	x: textDay.getWidth()/2
    });
	textDay.setPosition(stage.getWidth()/2, stage.getHeight()/2-20);
    layer.draw();

	// change page
	if (numberItemLoaded >= numberRequire) {
		// destroy text
		textWait.destroy();
		// run tween
		tweenLoad.play();
		start();
	}
}

function loadAssets() {
	
	var imgObj = new Image();
	imgObj.onload = function() {
		// create a stage
		stage = new Kinetic.Stage({
			container: 'container',
			width: window.innerWidth,
			height: window.innerHeight
		});

		// create a layer
		layer = new Kinetic.Layer();
		groupLoad = new Kinetic.Group();

		var imgCalendar = new Kinetic.Image({
			image: imgObj,
			width: 300,
			height: 300,
			x: stage.getWidth()/2,
			y: stage.getHeight()/4
		});

		imgCalendar.setOffset({
			x: imgCalendar.getSize().width/2
		});

	    textDay = new Kinetic.Text({
	    	x: stage.getWidth()/2,
	    	y: stage.getHeight()/2-10,
	    	text: '0',
	    	fontSize: 100,
	    	fontFamily: 'Arial',
	    	fontStyle: 'bold',
	    	fill: 'black'
	    });

	    textDay.setOffset({
	    	x: textDay.getWidth()/2
	    });

	    // text wait
     	textWait = new Kinetic.Text({
      		x: stage.getWidth()/2,
      		y: 100,
        	fill: 'black',
        	fontSize: '24',
        	fontFamily: 'Arial',
        	shadowBlur: 3,
        	shadowOffsetX: 2,
        	shadowOffsetY: 2,
        	textStyle: 'bold',
        	text: 'Cùng đợi nào ...',
      	});

      	textWait.setOffset({
      		x: textWait.getWidth()/2,
      		y: textWait.getHeight()/2
      	});

	    // add text to image
	    groupLoad.add(imgCalendar);
	    groupLoad.add(textDay);

		// add to layer
		layer.add(groupLoad);
		layer.add(textWait);
		layer.draw();
		
		// add to stage
		stage.add(layer);

		tweenLoad = new Kinetic.Tween({
	        node: groupLoad,
	        duration: 1,
	        opacity: 0,
	        scaleX: 2.0,
	        scaleY: 2.0,
	        easing: Kinetic.Easings.Linear,
	        onFinish: function() {
	        	// destroy group
	        	groupLoad.destroy();
	        }
	    });

		// create an array of assets
		images = {
			gate: "gate.png",
			sakura: "sakura.png",
			bg_container: "bg-container.jpg",
			kylin: "kylin.png",
			distich: "distich.png",
			lixi: "lixi.png",
			match: "match.png",
			pao: "pao.png",
			phuquy: "phuquy.jpg",
			vinhhoa: "vinhhoa.jpg",
			distich_1a: "distich-1a.png",
			distich_1b: "distich-1b.png", 
			distich_2a: "distich-2a.png", 
			distich_2b: "distich-2b.png", 
			distich_3a: "distich-3a.png", 
			distich_3b: "distich-3b.png",
			distich_4a: "distich-4a.png",
			distich_4b: "distich-4b.png", 
			distich_5a: "distich-5a.png", 
			distich_5b: "distich-5b.png", 
			distich_6a: "distich-6a.png", 
			distich_6b: "distich-6b.png",
			distich_7a: "distich-7a.png",
			distich_7b: "distich-7b.png", 
			distich_8a: "distich-8a.png", 
			distich_8b: "distich-8b.png", 
			distich_9a: "distich-9a.png", 
			distich_9b: "distich-9b.png",
			distich_10a: "distich-10a.png",
			distich_10b: "distich-10b.png",
			phucloctho: "phucloctho.png",
			framebamboo: "framebamboo.png",
			chucmungnammoi: "chucmungnammoi2014.png",
			dotphaode: "dotphaode.png"
		}

		sounds = {
			firework: "firework.wav",
			happynewyear: "happynewyear.wav",
			muaxuanoi: "muaxuanoi.wav",
			ngaytetqueem: "ngaytetqueem.wav",
			pao: "pao.wav",
			horse: "horse.wav"
		}

		// count the number of items
		for (var img in images) {
			numberRequire++;
		}
		for (var sound in sounds) {
			numberRequire++;
		}

		// load assets: images, sounds
		for (var img in images) {
			IMG[img] = new Image();
			IMG[img].src = "assets/image/"+images[img];
			$(IMG[img]).ready(load());
		}

		for (var sound in sounds) {
			RAW[sound] = document.createElement("audio");
			RAW[sound].src = "assets/sound/"+sounds[sound];
			RAW[sound].addEventListener('canplaythrough', load, false);
		}
	};
	imgObj.src = 'assets/background/calendar.png';
}
