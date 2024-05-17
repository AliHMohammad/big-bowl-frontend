import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

type Props = {
	text: string;
	children: ReactNode;
	linkTo: string;
}

export default function DashboardButton({ text, children, linkTo }: Props) {
	return (
		<Link to={linkTo}>
			<article className="h-32 sm:h-48  w-fit flex flex-col justify-between group">
				{children}
				<Button className="bg-slate-500 font-semibold hover:bg-orange-300 text-xl scale-75 sm:scale-100">{text}</Button>
			</article>
		</Link>
	);
}
