import React from "react";

export default function InputUser({
	classes,
	dynamicInput,
	win,
	lose,
	onChange,
	onSubmit,
	inputRef,
}) {
	return (
		<div className={classes["actions"]}>
			<input
				type="text"
				className={classes["guess"]}
				onChange={onChange}
				ref={inputRef}
			/>
			<button
				className={classes["submit"]}
				onClick={onSubmit}
				disabled={lose || win || !dynamicInput}
				style={{
					background: `${
						lose || win || !dynamicInput ? "grey" : "#2a70ec"
					}`,
				}}
			>
				Check
			</button>
		</div>
	);
}
