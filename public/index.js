

const width = 900;
const height = 900;

let gameStarted = false;
let target;
let score;
let username;

let inputUsername;
let inputButton;

let leaderboard;

// sound
let hitSound;


// 
let particleSystem;


function setup() {
	createCanvas(width, height);
	inputUsername = createInput()
		.position(window.innerWidth / 2 - 100, window.innerHeight / 2 - 50)
		.size(200, 40)
		.attribute('placeholder', 'Enter your name')
		.attribute('maxlength', 20);
	inputButton = createButton('Save')
		.position(window.innerWidth / 2 - 50, window.innerHeight / 2)
		.size(100, 40)
		.mousePressed(() => {
			username = inputUsername.value();
			localStorage.setItem('username', username);
			inputUsername.remove();
			inputButton.remove();
			gameStarted = true;
		});
	leaderboard = new p5.Table();
	leaderboard.addColumn('username');
	leaderboard.addColumn('score');

	target = new Target(120);
	score = 0;

	username = localStorage.getItem('username');
	sound = loadSound('assets/hit.mp3');
	sound.setVolume(0.2);

	particleSystem = new ParticleSystem();
}

function draw() {
	background('black');

	if (gameStarted === false) {
		return;
	}

	// 5 sec
	if (frameCount % 120 === 0) {
		loadJSON('/api/leaderboard', getLeaderboard);
	}

	push();
	fill('white');
	textAlign(CENTER, CENTER);
	textSize(32);
	text(`Score: ${score}`, width / 2, 100);
	pop();

	// draw table
	push();
	fill('white');
	textSize(24);
	text('Leaderboard', width - 200, 100);
	pop();

	for (let i = 0; i < leaderboard.getRowCount(); i++) {
		let username = leaderboard.getString(i, 'username');
		let score = leaderboard.getNum(i, 'score');
		push();
		fill('white');
		textSize(16);
		text(`${username.substring(0, 10)} - ${score}`, width - 200, 150 + i * 30);
		pop();
	}

	target.update();
	target.draw();

	particleSystem.run();
}

function mouseClicked() {
	target.hit();
}

function saveScore() {
	if (score > 0 && username) {
		fetch('/api/score', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ username, score })
		});
	}
}

function getLeaderboard(scores) {
	leaderboard.clearRows();
	for (let data of scores) {
		let row = leaderboard.addRow();
		row.setString('username', data[0]);
		row.setNum('score', data[1]);
	}
}

function playHitSound() {
	if (sound.isPlaying()) {
		sound.stop();
		sound.play();
	} else {
		sound.play();
	}
}

function mute() {
	if (sound.getVolume() === 0) {
		sound.setVolume(0.2);
	} else {
		sound.setVolume(0);
	}
}