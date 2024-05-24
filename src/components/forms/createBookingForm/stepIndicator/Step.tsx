import React, { ReactNode } from "react";

type Props = {
	step: number;
	highlightAt: number;
	children: ReactNode;
};

export default function Step({ step, highlightAt, children }: Props) {
	const color = step >= highlightAt ? 'bg-orange-300 text-black' : 'bg-slate-800 text-white'

	return <div className={`font-semibold px-10 flex items-center border-r-2 ${color} transition-all`}>{children}</div>;
}
