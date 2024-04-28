const form = document.querySelector("form");
const word = document.querySelector(".word");
const timeLeft = document.querySelector(".time-left");
const checkValue = document.querySelector(".check-value");
const result = document.querySelector(".result");
const retry = document.querySelector(".retry");
const submit = document.querySelector(".submit");

const wordToGuess = "Programming";
const shuffledWord = shuffle();
const TIME = 25;
let timer;
let interval;

function init() {
	timer = TIME;
	word.textContent = shuffledWord;
	timeLeft.textContent = timer;
	checkValue.textContent = "-";
	result.textContent = "";
	submit.style.background = "green";
	submit.disabled = false;
	interval = setInterval(() => {
		if (timer === 0) {
			updateComponents("Defeat", "red");
			endGame(false);
			clearInterval(interval);
			return;
		}
		timer--;
		timeLeft.textContent = timer.toString();
	}, 1000);
}

function shuffle() {
	let a = wordToGuess.split("");
	for (let i = a.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a.join("");
}

function cleanWord(word) {
	return word.toLowerCase().replace(/\s/g, "");
}

function updateComponents(message, messageColor) {
	result.textContent = message;
	result.style.color = messageColor;
	submit.disabled = "true";
	submit.style.background = "grey";
}

function checkDifferences(word1, word2) {
	return Array.from(word1).map((el, index) => !(el === word2[index]));
}

function isWinner(diff, guess) {
	const nbDiff = diff.reduce((prev, curr) => (curr += prev), 0);
	if (guess.length !== wordToGuess.length) return false;
	if (guess.length === wordToGuess.length && nbDiff === 0) return true;
}

function printDifferences(diff, guess) {
	checkValue.textContent = "";
	for (let i = 0; i < guess.length; i++) {
		const span = document.createElement("span");
		span.textContent = guess[i];
		if (i < diff.length)
			diff[i] ? (span.style.color = "red") : (span.style.color = "green");
		else span.style.color = "red";
		checkValue.appendChild(span);
	}
}

function endGame(win) {
	if (win) {
		clearInterval(interval);
		updateComponents("Victory!", "green");
	}
}

retry.addEventListener("click", () => init());
form.addEventListener("submit", (e) => {
	e.preventDefault();
	const guess = e.target.children[1].children[4].value;
	const diff =
		guess.length < wordToGuess.length
			? checkDifferences(cleanWord(guess), cleanWord(wordToGuess))
			: checkDifferences(cleanWord(wordToGuess), cleanWord(guess));
	printDifferences(diff, guess);
	e.target.children[1].children[4].value = "";
	endGame(isWinner(diff, guess));
});

init();
