import React from "react";

function Header({ classes }) {
	return (
		<>
			<h1 className={classes["title"]}>Guess the Number</h1>
			<header className={classes["rule"]}>
				Guess the number between{" "}
				<span className={classes["min"]}>1</span> and
				<span className={classes["max"]}> 100</span>
			</header>
		</>
	);
}

export default Header;
