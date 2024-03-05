class Target {
	constructor() {
		this.r = width / 10;
		this.reset();
	}

	draw() {
		push();
		ellipseMode(CENTER);
		fill('white');
		ellipse(this.x, this.y, this.radius);
		if (this.inside(mouseX, mouseY)) {
			fill('black');
		} else {
			fill('red');
		}
		ellipse(this.x, this.y, this.radius - 6);
		pop();
	}

	update() {
		if (score != 0) {
			this.radius -= 1;
		}

		if (this.radius < 0) {
			this.reset();
			if (score > 0) {
				saveScore();
			}
			score = 0;
		}
	}

	inside(x, y) {
		const d = dist(x, y, this.x, this.y);
		return d < this.radius / 2;
	}

	hit() {
		const isHit = this.inside(mouseX, mouseY);

		if (isHit) {
			score += map(this.radius, 0, this.r, 0.0, 1.0);
			score = round(score, 2)
			this.reset();
			playHitSound();
			particleSystem.burst(createVector(mouseX, mouseY));
			return true;
		} else {
			saveScore();
			score = 0;
			this.reset();
			return false;
		}
	}

	reset() {
		this.radius = this.r;
		this.x = random(this.radius, width - this.radius);
		this.y = random(this.radius, height - this.radius);
	}
}