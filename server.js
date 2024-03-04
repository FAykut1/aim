// simple express js server

// import express
const express = require('express');
const fs = require('fs');
// create an express app
const app = express();
// set the port
const port = 3000;

let scores = {};

fs.readFile('scores.json', (err, data) => {
	if (!err) {
		scores = JSON.parse(data);
	}
});

app.use(express.static('public'));
app.use(express.json());

// create a route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/api/score', (req, res) => {

	let score = req.body.score;
	let username = req.body.username;

	let prevScore = scores[username] || 0;
	scores[username] = Math.max(score, prevScore);

	fs.writeFileSync('scores.json', JSON.stringify(scores));

  res.send('Score updated');
  console.log('Score updated');
});

app.get('/api/leaderboard', (req, res) => {
	let arr = Object.entries(scores);
	arr.sort((a, b) => b[1] - a[1]);
	res.send(arr);
	console.log('Leaderboard sent');
});

// start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});