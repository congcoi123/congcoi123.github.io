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

var canvas;
var context;
var proton;
var renderer;
var emitter;
var stats;

function startFirework() {
	canvas = document.getElementById("canvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	context = canvas.getContext('2d');

	// draw the background
	context.fillStyle = '#000000';
	context.fill();
	addStats();

	createProton();
	ftick();
}

function addStats() {
	stats = new Stats();
	stats.setMode(2);
}

function createProton(image) {
	proton = new Proton;
	emitter = new Proton.Emitter();
	emitter.rate = new Proton.Rate(new Proton.Span(1, 3), 1);
	emitter.addInitialize(new Proton.Mass(1));
	emitter.addInitialize(new Proton.Radius(2, 4));
	emitter.addInitialize(new Proton.P(new Proton.LineZone(10, canvas.height, canvas.width - 10, canvas.height)));
	emitter.addInitialize(new Proton.Life(1, 1.5));
	emitter.addInitialize(new Proton.V(new Proton.Span(4, 6), new Proton.Span(0, 0, true), 'polar'));
	emitter.addBehaviour(new Proton.Gravity(1));
	emitter.addBehaviour(new Proton.Color('#ff0000', 'random'));
	emitter.emit();
	proton.addEmitter(emitter);

	renderer = new Proton.Renderer('canvas', proton, canvas);
	renderer.onProtonUpdate = function() {
		context.fillStyle = "rgba(0, 0, 0, 0.1)";
		context.fillRect(0, 0, canvas.width, canvas.height);
	};
	renderer.start();

	emitter.addEventListener(Proton.PARTICLE_DEAD, function(e) {
		if (Math.random() < .7) {
			createFirstEmitter(e.particle);
		} else {
			createSecendEmitter(e.particle);
		}
	});
}

function createFirstEmitter(particle) {
	var subemitter = new Proton.Emitter();
	subemitter.rate = new Proton.Rate(new Proton.Span(250, 300), 1);
	subemitter.addInitialize(new Proton.Mass(1));
	subemitter.addInitialize(new Proton.Radius(1, 2));
	subemitter.addInitialize(new Proton.Life(1, 3));
	subemitter.addInitialize(new Proton.V(new Proton.Span(2, 4), new Proton.Span(0, 360), 'polar'));
	subemitter.addBehaviour(new Proton.RandomDrift(10, 10, .05));
	subemitter.addBehaviour(new Proton.Alpha(1, 0));
	subemitter.addBehaviour(new Proton.Gravity(3));
	var color = Math.random() > .3 ? Proton.MathUtils.randomColor() : 'random';
	subemitter.addBehaviour(new Proton.Color(color));
	subemitter.p.x = particle.p.x;
	subemitter.p.y = particle.p.y;
	subemitter.emit('once', true);
	proton.addEmitter(subemitter);
}

function createSecendEmitter(particle) {
	var subemitter = new Proton.Emitter();
	subemitter.rate = new Proton.Rate(new Proton.Span(100, 120), 1);
	subemitter.addInitialize(new Proton.Mass(1));
	subemitter.addInitialize(new Proton.Radius(4, 8));
	subemitter.addInitialize(new Proton.Life(1, 2));
	subemitter.addInitialize(new Proton.V([1, 2], new Proton.Span(0, 360), 'polar'));
	subemitter.addBehaviour(new Proton.Alpha(1, 0));
	subemitter.addBehaviour(new Proton.Scale(1, .1));
	subemitter.addBehaviour(new Proton.Gravity(1));
	var color = Proton.MathUtils.randomColor();
	subemitter.addBehaviour(new Proton.Color(color));
	subemitter.p.x = particle.p.x;
	subemitter.p.y = particle.p.y;
	subemitter.emit('once', true);
	proton.addEmitter(subemitter);
}

function ftick() {
	requestAnimationFrame(ftick);
	stats.begin();
	proton.update();
	stats.end();
}
