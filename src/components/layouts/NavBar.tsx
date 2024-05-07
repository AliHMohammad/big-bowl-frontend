import { NavLink } from "react-router-dom";
import ClerkBar from "@/components/layouts/ClerkBar.tsx";

export default function NavBar() {
	

	return (
		<>
			<nav className={"flex flex-wrap gap-7 bg-red-300 p-2 text-sm sm:text-lg"}>
				<NavLink to={"/"}>
					<h3>
						Home
					</h3>
				</NavLink>
				<ClerkBar/>
			</nav>
		</>
	);
}