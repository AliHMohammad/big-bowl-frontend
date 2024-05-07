import { NavLink } from "react-router-dom";
import ClerkButtons from "@/components/layouts/ClerkButtons.tsx";
import NavBarLinks from "@/components/layouts/NavBarLinks.tsx";


export default function NavBar() {
	return (
		<>
			<nav className={"flex flex-wrap gap-7 bg-red-300 p-2 text-sm sm:text-lg"}>
				<NavBarLinks/>
				<ClerkButtons/>
			</nav>
		</>
	);
}