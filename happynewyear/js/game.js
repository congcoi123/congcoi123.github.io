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

// initialize your best wishes
var arrTextWish =  ["\nCung chúc tân niên\nVạn sự bình yên\nHạnh phúc vô biên\nVui vẻ triền miên",
					"\nXuân này hơn hẳn mấy xuân qua\nPhúc lộc đưa nhau đến từng nhà\nVài lời cung chúc tân niên mới\nVạn sự an khang vạn sự lành",
					"\nTống cựu nghênh tân\nVạn sự cát tường\nToàn gia an phúc",
					"<<To: All My Friends>>\n\nChúc các bạn có một cái tết vui vẻ và ...\nlành mạnh :v"];

var groupPao, groupDistich, groupWish, tweenPao, arrLeftText, arrRightText, imgLeftText, imgRightText, textWish, imgHelp;
var index = 0;
var direction = -1;
var timeKylin = 16000;
var timeFirework = 8000;
var timeWishAppear = 7000;
var isTouchMatch = false;
var isObjCreated = false;

// create the game
function start() {
	if (!isObjCreated) {
		// add objects
		addObjects();	
		isObjCreated = true;
	}
}

function addObjects() {
	// the array of distich
	arrLeftText = [IMG["distich_1a"], IMG["distich_2a"], IMG["distich_3a"], IMG["distich_4a"], IMG["distich_5a"], IMG["distich_6a"], IMG["distich_7a"], IMG["distich_8a"], IMG["distich_9a"], IMG["distich_10a"]];
	arrRightText = [IMG["distich_1b"], IMG["distich_2b"], IMG["distich_3b"], IMG["distich_4b"], IMG["distich_5b"], IMG["distich_6b"], IMG["distich_7b"], IMG["distich_8b"], IMG["distich_9b"], IMG["distich_10b"]];

	// create a group
	groupPao = new Kinetic.Group({
		x: 0,
		y: -stage.getHeight(),
		width: stage.getWidth(),
		height: stage.getHeight(),
		opacity: 0
	});

	var imgGate = new Kinetic.Image({
		x: 0,
		y: 20,
		width: 1375,
		height: 571,
		image: IMG["gate"]
	});

	groupPao.add(imgGate);

	// add a match
	var match = new Match(270, 300);
	// add a pao
	var pao = new Pao(860, 120);
	// add two kylin(s)
	var ky = new Kylin(1500, stage.getHeight()-200, true);
	var lin = new Kylin(0, stage.getHeight()-200);

	// add the application's information
	var textInfo = new Kinetic.Text({
	    x: 10,
	    y: stage.getHeight()-20,
	    fill: 'white',
	    fontSize: 14,
	    fontFamily: 'Arial',
		text: '(c) 2014 kong <congcoi123@gmail.com>'
	});

	// add all to a layer
	groupPao.add(ky.sprite);
	groupPao.add(lin.sprite);
	groupPao.add(pao.sprite);
	groupPao.add(match.sprite);
	layer.add(groupPao);
	layer.add(textInfo);
	layer.draw();

	// add a help dialog (can be changed here for a new help dialog)
	setTimeout(function() {
		imgHelp = new Kinetic.Image({
			x: 1000,
			y: -100,
			listening: false,
			image: IMG["dotphaode"]
		});

		imgHelp.setOffset({
			x: imgHelp.getWidth()/2,
			y: imgHelp.getHeight()/2
		});

		groupPao.add(imgHelp);
		layer.draw();

		// create a tween
		var tweenHelp = new Kinetic.Tween({
			node: imgHelp,
			duration: 2,
			x: 1000,
			y: stage.getHeight()-80,
			easing: Kinetic.Easings.BounceEaseOut
		});

		// play the tween
		tweenHelp.play();
	}, 3000);

	// add a tween
	tweenPao = new Kinetic.Tween({
		node: groupPao,
		duration: 2,
		opacity: 1,
		y: 0,
		easing: Kinetic.Easings.Linear,
		onFinish: function() {
			// start animations: pao & match
			match.start();
			pao.start();
		}
	});

	// play the tween
	tweenPao.play();

	// check if the fire is on the pao
	match.sprite.on('mouseup', function() {
		// hide the dialog help
		if (!isTouchMatch) {
			// create a tween
			var tweenHelp = new Kinetic.Tween({
				node: imgHelp,
				duration: 1,
				scaleX: 0,
				opacity: 0,
				easing: Kinetic.Easings.Linear,
				onFinish: function() {
					imgHelp.remove();
				}
			});
			// play the tween
			tweenHelp.play();
			// turn off the flag
			isTouchMatch = true;
		}
		// check the condition
		if (match.sprite.getX() >= 880 && match.sprite.getX() <= 1000 && match.sprite.getY() > 300) {
			// set pao explosion
			pao.explosion();
			// run kylin
			ky.start();
			lin.start();
			// run sakura effect
			runSakuraEffect();
			// waiting for running firework effect
			runFireworkEffect();
			// remove match
			match.sprite.remove();
			
			// repaint
			layer.draw();
			// play sound
			RAW.muaxuanoi.loop = true;
			RAW.muaxuanoi.play();

			RAW.pao.loop = true;
			RAW.pao.volume = 1;
			RAW.pao.play();
		}
	});
}

function runSakuraEffect() {
	// set new z-index
	var cvcanvas = document.getElementById('cvcanvas');
	cvcanvas.style.zIndex = "1";
	// run effect
	startSakura();
}

// run firework
function runFireworkEffect() {
	setTimeout(function(){
		// remove sakura effect
		$('canvas:nth-of-type(2)').remove();
		// reverse tweenPao
		tweenPao.reverse();
		// run firework effect
		startFirework();
		// run wishscreen
		setTimeout(function() {
			// destroy group pao
			tweenPao.destroy();
			groupPao.destroy();
			// run wish screen
			runWishScreen();
		}, timeFirework);
		
		// pause sound
		RAW.muaxuanoi.pause();
		RAW.pao.pause();
		
		// play new sound
		RAW.happynewyear.loop = true;
		RAW.happynewyear.play();
		RAW.firework.loop = true;
		RAW.firework.play();
	}, timeKylin);
}

function runWishScreen() {
	// create the welcome horse
	var imgHorse = new Kinetic.Image({
		x: stage.getWidth()*3,
		y: stage.getHeight()/2,
		image: IMG["chucmungnammoi"]
	});

	imgHorse.setOffset({
		x: imgHorse.getWidth()/2,
		y: imgHorse.getHeight()/2
	});

	// play sound
	RAW.horse.play();

	// add to layer
	layer.add(imgHorse);
	layer.draw();

	// create tween
	var tweenHorseCome = new Kinetic.Tween({
		node: imgHorse,
		x: stage.getWidth()/2,
		y: stage.getHeight()/2,
		duration: 5,
		easing: Kinetic.Easings.BackEaseOut,
		onFinish: function() {
			var tweenHorseOut = new Kinetic.Tween({
				node: imgHorse,
				x: -stage.getWidth(),
				y: stage.getHeight()/2,
				duration: 5,
				easing: Kinetic.Easings.BackEaseIn,
				onFinish: function() {
					// remove
					tweenHorseCome.destroy();
					tweenHorseOut.destroy();
					imgHorse.remove();
					// run wishes
					addWishes();
				}
			});
			// play tween
			tweenHorseOut.play();
		}
	});
	// play tween
	tweenHorseCome.play();
}

function addWishes() {
	// create image bamboo
	var imgFrameBamboo = new Kinetic.Image({
		x: 0,
		y: 0,
		image: IMG["framebamboo"]
	});
	imgFrameBamboo.setSize(imgFrameBamboo.getWidth()*0.8, imgFrameBamboo.getHeight()*0.8);

	// create text
	textWish = new Kinetic.Text({
		x: imgFrameBamboo.getWidth()/2,
		y: imgFrameBamboo.getHeight()/2-20,
		width: 620,
		height: 240,
		lineHeight: 1.5,
		text: arrTextWish[0],
		fontSize: 30,
		align: 'center',
		fontFamily: 'Arial',
		fontStyle: 'bold',
		fill: 'black'
	});

	textWish.setOffset({
		x: textWish.getWidth()/2,
		y: textWish.getHeight()/2
	});

	// create group
	groupWish = new Kinetic.Group({
		width: imgFrameBamboo.getWidth(),
		height: imgFrameBamboo.getHeight(),
		x: stage.getWidth()*1.5,
		y: stage.getHeight()/2,
		opacity: 0,
	});

	groupWish.setOffset({
		x: groupWish.getWidth()/2,
		y: groupWish.getHeight()/2
	});

	groupWish.add(imgFrameBamboo);
	groupWish.add(textWish);

	layer.add(groupWish);
	layer.draw();

	// create tween wishes
	var tweenWishesIn = new Kinetic.Tween({
		node: groupWish,
		x: stage.getWidth()/2,
		y: stage.getHeight()/2,
		duration: 3,
		opacity: 1,
		easing: Kinetic.Easings.EaseOut,
		onFinish: function() {
			setTimeout(function() {
				// new tween
				var tweenWishesOut = new Kinetic.Tween({
					node: groupWish,
					x: -stage.getWidth()*1.5,
					y: stage.getHeight()/2,
					duration: 3,
					opacity: 0,
					easing: Kinetic.Easings.EaseIn,
					onFinish: function() {
						// remove tween
						// tweenWishesIn.destroy();
						// tweenWishesOut.destroy();
						// repeat change wishes
						changeWishes();
					}
				});
				// run tween
				tweenWishesOut.play();
			}, timeWishAppear);
		}
	});
	// play tween
	tweenWishesIn.play();
}

// run distich theme
function runMainTheme() {
	// main theme
	presentation();
	// pause sound
	RAW.happynewyear.pause();
	RAW.firework.pause();
	// play new sound
	RAW.ngaytetqueem.loop = true;
	RAW.ngaytetqueem.play();
	
}

// final
function presentation() {
	// reset group
	var groupPre = new Kinetic.Group({
		x: 0,
		y: 0,
		width: stage.getWidth(),
		height: stage.getHeight(),
		opacity: 0
	});

	// add images
	var imgVinhHoa = new Kinetic.Image({
		x: 0,
		y: 150,
		image: IMG["vinhhoa"]
	});

	var imgPhuQuy = new Kinetic.Image({
		x: stage.getWidth()-200,
		y: 150,
		image: IMG["phuquy"]
	});

	var imgMain = new Kinetic.Image({
		x: stage.getWidth()/2,
		y: stage.getHeight()/2,
		image: IMG["bg_container"]
	});

	imgMain.setOffset({
		x: imgMain.getWidth()/2,
		y: imgMain.getHeight()/2
	});

	var imgPhucLocTho = new Kinetic.Image({
		x: stage.getWidth()/2-4,
		y: stage.getHeight()/2-72,
		image: IMG["phucloctho"]
	});

	imgPhucLocTho.setOffset({
		x: imgPhucLocTho.getWidth()/2,
		y: imgPhucLocTho.getHeight()/2
	});

	// add distich
	var imgLeftDis = new Kinetic.Image({
		x: 240,
		y: 90,
		image: IMG["distich"],
		shadowColor: 'black',
        shadowBlur: 2,
        shadowOffset: 10,
        shadowOpacity: 0.5
	});

	var imgRightDis = new Kinetic.Image({
		x: stage.getWidth()-380,
		y: 90,
		image: IMG["distich"],
		shadowColor: 'black',
        shadowBlur: 2,
        shadowOffset: 10,
        shadowOpacity: 0.5
	});

	// run text
	imgLeftText = new Kinetic.Image({
		x: 240,
		y: 90,
		image: arrLeftText[0],
	});

	imgRightText = new Kinetic.Image({
		x: stage.getWidth()-380,
		y: 90,
		image: arrRightText[0],
	});

	groupDistich = new Kinetic.Group({
		width: imgLeftDis.getWidth(),
		height: imgLeftDis.getHeight(),
		scaleY: 0
	});

	groupDistich.add(imgRightDis);
	groupDistich.add(imgLeftDis);
	groupDistich.add(imgLeftText);
	groupDistich.add(imgRightText);

	// add info
	var textInfo = new Kinetic.Text({
	    x: 10,
	    y: stage.getHeight()-20,
	    fill: 'white',
	    fontSize: 14,
	    fontFamily: 'Arial',
		text: '(c) 2014 kong <congcoi123@gmail.com>'
	});

	// add to group
	groupPre.add(imgMain);
	groupPre.add(imgPhucLocTho);
	groupPre.add(imgPhuQuy);
	groupPre.add(imgVinhHoa);
	groupPre.add(groupDistich);
	layer.add(groupPre);
	layer.add(textInfo);
	layer.draw();

	// create new tween
	var tweenDistich = new Kinetic.Tween({
		node: groupDistich,
		duration: 2,
		scaleY: 1,
		easing: Kinetic.Easings.ElasticEaseOut,
		onFinish: function() {
			// start run repeat
			setTimeout(function(){
				changeDistich();
			}, 5000);
		}
	});

	var tweenPre = new Kinetic.Tween({
		node: groupPre,
		duration: 2,
		opacity: 1,
		y: 0,
		easing: Kinetic.Easings.Linear,
		onFinish: function() {
			// run tween distich
			tweenDistich.play();
		}
	});

	// play tween
	tweenPre.play();

}

function changeDistich() {
	index++;
	if (index >= 10) index = 0;

	var tweenDistichClose = new Kinetic.Tween({
		node: groupDistich,
		duration: 2,
		scaleY: 0,
		easing: Kinetic.Easings.Linear,
		onFinish: function() {
			/* start run next distich */
			// change image
			imgLeftText.setImage(arrLeftText[index]);
			imgRightText.setImage(arrRightText[index]);
			// create new tween
			var tweenDistichOpen = new Kinetic.Tween({
				node: groupDistich,
				duration: 2,
				scaleY: 1,
				easing: Kinetic.Easings.ElasticEaseOut,
				onFinish: function() {
					setTimeout(function() {
						// remove
						// tweenDistichClose.destroy();
						// tweenDistichOpen.destroy();
						// change distich
						changeDistich();
					}, 5000);
				}
			});
			// play tween
			tweenDistichOpen.play();
		}
	});
	// play tween
	tweenDistichClose.play();
}

function changeWishes() {
	index++;
	direction *= -1;

	if (index >= arrTextWish.length) {
		// reset params
		index = 0;
		// change screen
		runMainTheme();
	} else {
		// reset
		textWish.setText(arrTextWish[index]);
		// repeat
		var tweenWishesIn = new Kinetic.Tween({
			node: groupWish,
			x: stage.getWidth()/2,
			y: stage.getHeight()/2,
			duration: 3,
			opacity: 1,
			easing: Kinetic.Easings.EaseOut,
			onFinish: function() {
				setTimeout(function() {
					// new tween
					var tweenWishesOut = new Kinetic.Tween({
						node: groupWish,
						x: stage.getWidth()*1.5*direction,
						y: stage.getHeight()/2,
						duration: 3,
						opacity: 0,
						easing: Kinetic.Easings.EaseIn,
						onFinish: function() {
							// remove
							// tweenWishesIn.destroy();
							// tweenWishesOut.destroy();
							// repeat change wishes
							changeWishes();
						}
					});
					// run tween
					tweenWishesOut.play();
				}, timeWishAppear);
			}
		});
		// play tween
		tweenWishesIn.play();
	}
}
