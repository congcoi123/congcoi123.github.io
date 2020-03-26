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

var ccanvas;
var cstage;
var cproton;
var cbitmap;
var crenderer;
var cstats;

function startSakura() {
	ccanvas = document.getElementById("cvcanvas");
	ccanvas.width = window.innerWidth;
	ccanvas.height = window.innerHeight;
	cstage = new createjs.Stage(ccanvas);
	cbitmap = new createjs.Bitmap(IMG["sakura"]);
	addCStats();

	createCProton();
	createjs.Ticker.setFPS(60);
	createjs.Ticker.addListener(window);
}

function addCStats() {
	cstats = new Stats();
	cstats.setMode(2);
}

function createCProton() {
	cproton = new Proton();
	emitter = new Proton.Emitter();
	emitter.rate = new Proton.Rate(new Proton.Span(30, 40), new Proton.Span(.5, 2));
	emitter.addInitialize(new Proton.ImageTarget(cbitmap));

	emitter.addInitialize(new Proton.Mass(1, 5));
	emitter.addInitialize(new Proton.Radius(20));
	emitter.addInitialize(new Proton.Position(new Proton.LineZone(0, -40, ccanvas.width, -40)));
	emitter.addInitialize(new Proton.V(0, new Proton.Span(.1, 1)));

	emitter.addBehaviour(new Proton.CrossZone(new Proton.LineZone(0, ccanvas.height, ccanvas.width, ccanvas.height + 20, 'down'), 'dead'));
	emitter.addBehaviour(new Proton.Rotate(new Proton.Span(0, 360), new Proton.Span(-.5, .5), 'add'));
	emitter.addBehaviour(new Proton.Scale(new Proton.Span(.2, 1)));
	emitter.addBehaviour(new Proton.RandomDrift(5, 0, .15));
	emitter.addBehaviour(new Proton.Gravity(0.9));
	emitter.emit();
	cproton.addEmitter(emitter);

	crenderer = new Proton.Renderer('easel', cproton, cstage);
	crenderer.start();
}

function tick() {
	cstats.begin();
	cproton.update();
	cstage.update();
	cstats.end();
}
