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

function Pao(x, y) {
	// set the position
	this.x = x;
	this.y = y;

	// get a image
	this.img = IMG["pao"];
	// get actions
	this.actions = {
		normal: [{
			x: 0,
			y: 0,
			width: 120,
			height: 305
		}],
		explosion: [{
			x: 120,
			y: 0,
			width: 120,
			height: 305
		}, {
			x: 240,
			y: 0,
			width: 120,
			height: 305
		}, {
			x: 360,
			y: 0,
			width: 120,
			height: 305
		}, {
			x: 480,
			y: 0,
			width: 120,
			height: 305
		}]
	}

	// create sprite
	this.sprite = new Kinetic.Sprite({
		x: this.x,
		y: this.y,
		image: this.img,
		animations: this.actions,
		frameRate: 8
	});

	this.sprite.setAnimation("normal");

	this.start = function() {
		this.sprite.start();
	}

	this.explosion = function() {
		this.sprite.setAnimation("explosion");
	}
}
