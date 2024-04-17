import React from "react";
import Header from "./Header";
import GuessContent from "./GuessContent";
import classes from "./styles.module.css";

function GuessTheNumber() {
	return (
		<div className={classes["guessthenumber"]}>
			<Header classes={classes} />
			<GuessContent classes={classes} />
		</div>
	);
}

export { GuessTheNumber };
