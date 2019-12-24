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

function Match(x, y) {
	// set the position
	this.x = x;
	this.y = y;

	// get the image
	this.img = IMG["match"];
	// get actions
	this.actions = {
		burn: [{
			x: 0,
			y: 0,
			width: 130,
			height: 300
		}, {
			x: 130,
			y: 0,
			width: 130,
			height: 300
		}, {
			x: 260,
			y: 0,
			width: 130,
			height: 300
		}, {
			x: 390,
			y: 0,
			width: 130,
			height: 300
		}, {
			x: 520,
			y: 0,
			width: 130,
			height: 300
		}, {
			x: 650,
			y: 0,
			width: 130,
			height: 300
		}, {
			x: 780,
			y: 0,
			width: 130,
			height: 300
		}, {
			x: 910,
			y: 0,
			width: 130,
			height: 300
		}, {
			x: 1040,
			y: 0,
			width: 130,
			height: 300
		}]
	}

	// create a sprite
	this.sprite = new Kinetic.Sprite({
		x: this.x,
		y: this.y,
		image: this.img,
		scale: 0.5,
		animations: this.actions,
		draggable: true,
		frameRate: 9
	});

	this.sprite.setAnimation("burn");

	this.start = function() {
		this.sprite.start();
	}
}
