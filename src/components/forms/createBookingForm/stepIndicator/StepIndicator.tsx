import React from "react";

type Props = {
	children: React.ReactNode;
};

export default function StepIndicator({ children }: Props) {
	return (
		<div className=" flex justify-center p-4 my-5 hover:cursor-default">
			<div className="bg-white w-fit h-11 flex justify-evenly rounded-full overflow-hidden outline outline-2 outline-white select-none shadow-lg">
				{children}
			</div>
		</div>
	);
}
