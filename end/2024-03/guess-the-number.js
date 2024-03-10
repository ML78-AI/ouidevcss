let nbGuess = 5;
const value = 78;
const button = document.querySelector(".submit");
const input = document.querySelector(".guess");
const hint = document.querySelector(".hint");
const result = document.querySelector(".result");
const remVal = document.querySelector(".rem-val");
const allguesses = document.querySelector(".all");

function updateHint(guess, value) {
	if (guess < value) hint.textContent = "Hint : higher";
	else hint.textContent = "Hint : lower";
	input.value = "";
}

button.addEventListener("click", (e) => {
	e.preventDefault();
	const guess = parseInt(input.value, 10);
	if (nbGuess !== 1 && guess !== value) updateHint(guess, value);
	else if (nbGuess === 1 && guess !== value) {
		result.textContent = "You lose";
		result.style.color = "red";
		button.disabled = true;
		button.style.background = "grey";
	} else {
		result.textContent = "You win";
		result.style.color = "green";
		button.disabled = true;
		button.style.background = "grey";
	}
	nbGuess--;
	remVal.textContent = nbGuess;
	allguesses.textContent += `${guess ? guess + ", " : ""} `;
});
