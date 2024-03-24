let nbGuess = 5;
const word = "guess";
const inputs = document.querySelector(".inputs");
const submit = document.querySelector(".submit");
const reset = document.querySelector(".reset");
const remainingVal = document.querySelector(".rem-val");
const wrongVal = document.querySelector(".wr-val");
let childNodes;

(function () {
    for (let i = 0; i < word.length; i++) {
        const input = document.createElement("input");
        input.type = "text";
        input.maxLength = "1";
        input.className = `letter`;
        inputs.appendChild(input);
    }
    childNodes = Object.values(inputs.childNodes);
})();

function updateInput(input, value, color, disabled) {
    input.value = value;
    input.style.color = color;
    input.disabled = disabled;
}

function updateSubmit(submit, disabled, bgColor) {
    submit.disabled = disabled;
    submit.style.background = bgColor;
}

function updateTextContent(htmlElement, value) {
    htmlElement.textContent = value;
}

function compare(wordguess, word) {
    const cpWord = word.toUpperCase();
    let summaryComp = {};
    for (let i = 0; i < word.length; i++) {
        summaryComp = {
            ...summaryComp,
            [i]: wordguess[i] === cpWord[i] ? true : false,
        };
    }
    return summaryComp;
}
function checkGuess(summaryComp, wordguess) {
    let correctLetterCount = 0;
    updateTextContent(wrongVal, "");
    childNodes.map((input, index) => {
        if (wordguess[index] !== " ") {
            if (!summaryComp[index]) {
                wrongVal.textContent += `${input.value}, `;
                input.value = "";
                return;
            }
            correctLetterCount++;
            updateInput(input, wordguess[index], "#00ED64", true);
        }
    });
    if (correctLetterCount === 5) updateSubmit(submit, true, "grey");
}

function handleSubmit(e) {
    e.preventDefault();
    let wordguess = "";
    childNodes.map((input) => {
        wordguess += input.value ? input.value.toUpperCase() : " ";
    });
    checkGuess(compare(wordguess, word), wordguess);
    nbGuess--;
    updateTextContent(remainingVal, nbGuess);
    if (nbGuess === 0) {
        stopAndReveal();
        return;
    }
}

function handleReset(e) {
    e.preventDefault();
    nbGuess = 5;
    childNodes.map((input) => updateInput(input, "", "black", false));
    updateSubmit(submit, false, "#1cb295");
    updateTextContent(wrongVal, "");
    updateTextContent(remainingVal, nbGuess);
}

function stopAndReveal() {
    updateSubmit(submit, true, "grey");
    childNodes.map((input, index) => {
        if (input.value !== word[index].toUpperCase()) {
            updateInput(input, word[index], "red", true);
        }
    });
}

submit.addEventListener("click", handleSubmit);
reset.addEventListener("click", handleReset);
