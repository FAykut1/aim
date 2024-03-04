class ParticleSystem {
	constructor() {
		this.particles = [];
	}
	
	addParticle() {
		this.particles.push(new Particle(this.origin));
	}

	burst(position) {
		this.origin = position.copy();
		for (let i = 0; i < 30; i++) {
			this.addParticle();
		}
	}

	run() {
		for (let i = 0; i < this.particles.length; i++) {
			if (this.particles[i].isDead()) {
				this.particles.splice(i, 1);
			} else {
				this.particles[i].run();
			}
		}
	}
}