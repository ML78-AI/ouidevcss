const todoItems = document.querySelector(".todo-item");
const form = document.querySelector(".add-todo");
const [input, addButton] = form.children;
const todoList = document.querySelector(".todo-list");
let ID = 0;
let c;

function addRemoveEvent(button) {
	button.addEventListener("click", (e) => {
		todoList.childNodes.forEach((todo) => {
			if (todo.id === e.target.parentElement.id) {
				todoList.removeChild(todo);
				return;
			}
		});
	});
}

function updateButtonStatus(cond) {
	if (cond) {
		addButton.disabled = true;
		addButton.style.background = "grey";
		return;
	}
	addButton.disabled = false;
	addButton.style.background = "#20b2a9";
}

function checkTodo(todoText) {
	const children = todoList.childNodes;
	for (let i = 0; i < children.length; i++) {
		if (children[i].firstChild.childNodes[1].textContent === todoText)
			return true;
	}
	return false;
}

function todoDone(todo) {
	const el = todo.firstChild;
	const input = el.firstChild.firstChild;
	input.addEventListener("change", () => {
		if (input.checked) {
			el.childNodes[1].style["text-decoration"] = "line-through";
		}
	});
}

function createTodo(todoText) {
	if (checkTodo(todoText)) return;

	const todoItem = document.createElement("div");
	const todo = document.createElement("div");
	const cbContainer = document.createElement("div");
	const cb = document.createElement("input");
	const tick = document.createElement("div");
	const task = document.createElement("p");
	const remove = document.createElement("button");

	todoItem.className = "todo-item";
	todo.className = "todo";
	cbContainer.className = "checkbox-container";
	cb.className = "checkbox";
	cb.type = "checkbox";
	tick.className = "tick";
	task.className = "task";
	task.textContent = todoText;
	remove.className = "remove";
	remove.textContent = "remove";
	addRemoveEvent(remove);
	todoItem.id = ID;
	ID++;

	cbContainer.appendChild(cb);
	cbContainer.appendChild(tick);

	todo.appendChild(cbContainer);
	todo.appendChild(task);

	todoItem.appendChild(todo);
	todoItem.appendChild(remove);
	return todoItem;
}

input.addEventListener("input", (e) => {
	c = todoList.childNodes;
	for (let j = 0; j < c.length; j++) {
		if (c[j].firstChild.childNodes[1].textContent === e.target.value) {
			updateButtonStatus(true);
			return;
		} else {
			updateButtonStatus(false);
		}
	}
});

form.addEventListener("submit", (e) => {
	e.preventDefault();
	updateButtonStatus(true);
	const todo = createTodo(e.target[0].value);
	if (todo) {
		todoDone(todo);
		todoList.appendChild(todo);
	}
	e.target[0].value = "";
});
