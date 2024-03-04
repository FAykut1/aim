class Target {
	constructor() {
		this.r = width / 10;
		this.reset();
	}

	draw() {
		push();
		fill('white');
		ellipse(this.x, this.y, this.radius);
		fill('red');
		ellipse(this.x, this.y, this.radius - 6);
		pop();
	}

	update() {
		this.radius -= 1;

		if (this.radius < 0) {
			this.reset();
			if (score > 0) {
				saveScore();
			}
			score = 0;
		}
	}

	hit() {
		const distance = dist(this.x, this.y, mouseX, mouseY);
		const isHit = distance < this.radius;

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
			return false;
		}
	}

	reset() {
		this.radius = this.r;
		this.x = random(this.radius, width - this.radius);
		this.y = random(this.radius, height - this.radius);
	}
}