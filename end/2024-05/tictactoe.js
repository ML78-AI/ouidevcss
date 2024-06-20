class XIcon extends HTMLElement {
	constructor() {
		super();
		this.svg = document.createElement("img");
		this.svg.setAttribute("class", "X");
		this.svg.src = "../../assets/images/cross.svg";
	}
	connectedCallback() {
		this.appendChild(this.svg);
	}
}
class OIcon extends HTMLElement {
	constructor() {
		super();
		this.svg = document.createElement("img");
		this.svg.setAttribute("class", "O");
		this.svg.src = "../../assets/images/circle.svg";
	}
	connectedCallback() {
		this.appendChild(this.svg);
	}
}
customElements.define("x-icon", XIcon);
customElements.define("o-icon", OIcon);

function checkValue(children, index, symbol) {
	return children[index]?.children?.[0]?.children[0].className === symbol;
}
function checkRowColumnDiagonal(children, arrayOfIndexes, symbol) {
	return arrayOfIndexes.every((value) => checkValue(children, value, symbol));
}

function player(className, symbol) {
	const span = document.createElement("span");
	span.setAttribute("class", className);
	span.textContent = symbol;
	return span;
}

function checkWinner() {
	const { children } = grid;
	for (let i = 0; i < 9; i += 3) {
		// horizontal
		if (checkRowColumnDiagonal(children, [i, i + 1, i + 2], "X")) {
			return "X";
		} else if (checkRowColumnDiagonal(children, [i, i + 1, i + 2], "O")) {
			return "O";
		}
	}
	for (let i = 0; i < 3; i++) {
		// vertical
		if (checkRowColumnDiagonal(children, [i, i + 3, i + 6], "X")) {
			return "X";
		} else if (checkRowColumnDiagonal(children, [i, i + 3, i + 6], "O")) {
			return "O";
		}
	}
	if (
		checkRowColumnDiagonal(children, [0, 4, 8], "X") ||
		checkRowColumnDiagonal(children, [2, 4, 6], "X")
	)
		return "X";
	else if (
		checkRowColumnDiagonal(children, [0, 4, 8], "O") ||
		checkRowColumnDiagonal(children, [2, 4, 6], "O")
	)
		return "O";
	return "";
}

function printResult() {
	const g = checkWinner();
	if (g === "X") {
		result.textContent = "Winner is ";
		result.appendChild(player("blue", "X"));
	} else if (g === "O") {
		result.textContent = "Winner is ";
		result.appendChild(player("red", "O"));
	} else if (v === 9 && g === "") result.textContent = "No winner";
	else return;
	grid.removeEventListener("click", wrapperHandler);
}

function handleEvent(e) {
	const { srcElement } = e;
	if (!srcElement.firstChild) {
		if (v % 2 === 0) {
			srcElement.appendChild(document.createElement("o-icon"));
		} else {
			srcElement.appendChild(document.createElement("x-icon"));
		}
		return "ok";
	}
	return "ko";
}

function wrapperHandler(e) {
	e.preventDefault();
	const status = handleEvent(e, v);
	if (status === "ko") return;
	v++;
	turn.textContent = "Turn : ";
	v % 2 === 1
		? turn.appendChild(player("blue", "X"))
		: turn.appendChild(player("red", "O"));
	printResult();
}

function start() {
	turn.textContent = "Turn : ";
	turn.appendChild(player("red", "O"));
	grid.addEventListener("click", wrapperHandler);
}

const turn = document.querySelector(".turn");
const grid = document.querySelector(".grid");
const button = document.querySelector("button");
let result = document.querySelector(".result");
let v = 0;

button.addEventListener("click", () => {
	v = 0;
	result.textContent = "";
	grid.removeEventListener("click", wrapperHandler);
	const gridChildren = document.querySelector(".grid").children;
	Object.values(gridChildren).forEach((child) => (child.innerHTML = ""));
	start();
});
start();
