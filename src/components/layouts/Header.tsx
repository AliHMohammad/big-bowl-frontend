import NavBar from "./NavBar";



export default function Header() {

	return (
		<div className="flex w-full justify-between bg-slate-900 px-10">
			<div className={" py-5"}>
				<h1 className={"text-center font-bold text-lg sm:text-xl lg:text-5xl text-white"}><span className="text-orange-300">XP</span> Bowl</h1>
			</div>
			<NavBar/>
		</div>
	)
}