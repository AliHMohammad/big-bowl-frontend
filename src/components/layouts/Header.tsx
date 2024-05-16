import NavBar from "./NavBar";

export default function Header() {
	return (
		<div className="flex flex-wrap flex-col w-full justify-center items-center sm:flex-row sm:justify-between bg-slate-900 px-10">
			<div className=" py-5 flex items-center gap-2">
				<img src="/logo.png" className="h-24" />
				<h1 className={"text-center font-bold text-3xl sm:text-5xl  text-white"}>
					<span className="text-orange-300">XP</span> Bowl
				</h1>
			</div>
			<NavBar />
		</div>
	);
}
