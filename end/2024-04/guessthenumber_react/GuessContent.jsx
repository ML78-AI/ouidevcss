import React, { useState, useRef } from "react";
import GuessInfo from "./GuessInfo";
import Result from "./Result";
import InputUser from "./InputUser";
import Hint from "./Hint";

function GuessContent({ classes }) {
	const value = 42;
	const inputRef = useRef("");
	const [guess, setGuess] = useState(null);
	const [dynamicInput, setDynamicInput] = useState(null);
	const [nbGuess, setNbGuess] = useState(5);
	const [allGuesses, setAllGuesses] = useState([]);
	const [win, setWin] = useState(false);
	const lose = nbGuess === 0 && !win;

	const onSubmit = () => {
		setGuess(dynamicInput);
		setAllGuesses([...allGuesses, dynamicInput]);
		if (dynamicInput === value) {
			setWin(true);
			return;
		} else {
			inputRef.current.focus();
		}
		setNbGuess((nb) => nb - 1);
		inputRef.current.value = "";
		setDynamicInput(null);
	};
	const onChange = (e) => {
		const dInput = parseInt(e.target.value, 10);
		if (Number.isInteger(dInput)) setDynamicInput(dInput);
	};
	return (
		<>
			<Hint classes={classes} guess={guess} value={value} />
			<InputUser
				classes={classes}
				dynamicInput={dynamicInput}
				win={win}
				lose={lose}
				onChange={onChange}
				onSubmit={onSubmit}
				inputRef={inputRef}
			/>
			<GuessInfo
				classes={classes}
				nbGuess={nbGuess}
				allGuesses={allGuesses}
			/>
			<Result classes={classes} win={win} lose={lose} />
		</>
	);
}

export default GuessContent;
