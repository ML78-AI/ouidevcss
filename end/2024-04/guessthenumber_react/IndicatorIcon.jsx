import React from "react";
import arrowDown from "./arrow_down.svg";
import arrowUp from "./arrow_up.svg";

function ArrowUpIcon({ height, width }) {
	return <img src={arrowUp} alt="Green Arrow Up" style={{ height, width }} />;
}
function ArrowDownIcon({ height, width }) {
	return (
		<img src={arrowDown} alt="Red Arrow Down" style={{ height, width }} />
	);
}

export { ArrowDownIcon, ArrowUpIcon };
