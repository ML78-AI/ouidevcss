import React from "react";
import { ArrowDownIcon, ArrowUpIcon } from "./IndicatorIcon";

export default function Hint({ classes, guess, value }) {
	return (
		<p className={classes["hint"]}>
			Hint :{" "}
			{guess && guess !== value ? (
				guess < value ? (
					<>
						higher <ArrowUpIcon height="16px" width="16px" />
					</>
				) : (
					<>
						lower <ArrowDownIcon height="16px" width="16px" />
					</>
				)
			) : (
				"-"
			)}
		</p>
	);
}
