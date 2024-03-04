class Particle {
	constructor(position) {
		this.speed = random(1, 3);
		this.velocity = createVector(random(-1, 1) * this.speed, random(-1, 1) * this.speed);
		this.position = position.copy();
		this.lifespan = 60;
	}

	run() {
		this.update();
		this.display();
	}

	update() {
		this.position.add(this.velocity);
		this.lifespan -= 2;
	}

	display() {
		push();
		stroke(200, this.lifespan);
		strokeWeight(2);
		fill(127, this.lifespan);
		ellipse(this.position.x, this.position.y, 12, 12);
		pop();
	}

	isDead() {
		return this.lifespan < 0;
	}
}