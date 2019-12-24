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

var spKylin;
function Kylin (x, y, isLeft) {
	this.x = x;
	this.y = y;

	// load image
	this.img = IMG["kylin"];

	// create actions
	this.actions = {
		move: [{
			x: 0,
			y: 428,
			width: 220,
			height: 214
		}, {
			x: 220,
			y: 428,
			width: 220,
			height: 214
		}, {
			x: 440,
			y: 428,
			width: 220,
			height: 214
		}
		, {
			x: 660,
			y: 428,
			width: 220,
			height: 214
		}
		, {
			x: 880,
			y: 428,
			width: 220,
			height: 214
		}, {
			x: 0,
			y: 642,
			width: 220,
			height: 214
		}, {
			x: 220,
			y: 642,
			width: 220,
			height: 214
		}, {
			x: 440,
			y: 642,
			width: 220,
			height: 214
		}, {
			x: 660,
			y: 642,
			width: 220,
			height: 214
		}, {
			x: 880,
			y: 642,
			width: 220,
			height: 214
		}],
		attack: [{
			x: 0,
			y: 0,
			width: 220,
			height: 214
		}, {
			x: 220,
			y: 0,
			width: 220,
			height: 214
		}, {
			x: 440,
			y: 0,
			width: 220,
			height: 214
		}, {
			x: 660,
			y: 0,
			width: 220,
			height: 214
		}, {
			x: 880,
			y: 0,
			width: 220,
			height: 214
		}, {
			x: 0,
			y: 214,
			width: 220,
			height: 214
		}, {
			x: 220,
			y: 214,
			width: 220,
			height: 214
		}, {
			x: 440,
			y: 214,
			width: 220,
			height: 214
		}, {
			x: 660,
			y: 214,
			width: 220,
			height: 214
		}, {
			x: 880,
			y: 214,
			width: 220,
			height: 214
		}]
	}

	// left or right
	if (isLeft) {
		// create a sprite
		this.sprite = new Kinetic.Sprite({
			x: this.x,
			y: this.y,
			image: this.img,
			animations: this.actions,
			frameRate: 6
		});
	} else {
		// create a sprite
		this.sprite = new Kinetic.Sprite({
			x: this.x,
			y: this.y,
			image: this.img,
			scaleX: -1,
			animations: this.actions,
			frameRate: 6
		});
	}

	// set the default animation
	spKylin = this.sprite;
	this.sprite.setAnimation("move");

	// create the move function
	this.start = function() {
		var tweenKylin;
		if (isLeft) {
			tweenKylin = new Kinetic.Tween({
		        node: this.sprite,
		        duration: 5,
		        x: 750,
		        easing: Kinetic.Easings.Linear,
		        onFinish: function() {
		        	// change actions
		        	spKylin.setAnimation("attack");
		        }
		    });
		} else {
			tweenKylin = new Kinetic.Tween({
		        node: this.sprite,
		        duration: 5,
		        x: 450,
		        easing: Kinetic.Easings.Linear,
		        onFinish: function() {
		        	// change actions
		        	spKylin.setAnimation("attack");
		        }
		    });
		}

		// start tween
		tweenKylin.play();

		// start sprite
		this.sprite.start();
	}
}
