import { NavLink } from "react-router-dom";
import NavBar from "./NavBar";

export default function Header() {
	return (
		<div className="flex flex-wrap flex-col w-full justify-center items-center sm:flex-row sm:justify-between bg-slate-900 px-10">
			<NavLink to="/">
				<div className=" py-5 flex items-center gap-2 group">
					<img src="/logo.png" className="h-24 group-hover:scale-105 group-active:scale-100 transition-all ease-in" />
					<h1 className={"text-center font-bold text-3xl sm:text-5xl text-white"}>
						<span className="text-orange-300">XP</span> Bowl
					</h1>
				</div>
			</NavLink>
			<NavBar />
		</div>
	);
}
