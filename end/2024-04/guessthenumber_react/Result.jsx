import React from "react";

function Result({ classes, win, lose }) {
	return (
		<p
			className={classes["result"]}
			style={{ color: `${win ? "#00ED64" : "red"}` }}
		>
			{win || lose ? (win ? "You win" : "You lose") : null}
		</p>
	);
}

export default Result;
