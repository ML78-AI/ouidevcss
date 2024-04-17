import React from "react";

function GuessInfo({ classes, nbGuess, allGuesses }) {
	return (
		<>
			<p className={classes["remaining"]}>
				Remaining guess :{" "}
				<span className={classes["rem-val"]}>{nbGuess}</span>
			</p>
			<p className={classes["allguesses"]}>
				All guesses :{" "}
				<span className={classes["all"]}>
					{allGuesses.length !== 0 ? allGuesses.join(", ") : "-"}
				</span>
			</p>
		</>
	);
}

export default GuessInfo;
