import { NavLink } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";


export default function NavBarLinks() {
	const {isSignedIn, user} = useUser();
	const isAdmin = isSignedIn && user?.organizationMemberships[0]?.role;
	const isUser = isSignedIn && !isAdmin;

	return (
		<>
			<NavLink className="hover:text-orange-300 hover:scale-105 transition-all" to={"/"}>
				<h3>Hjem</h3>

			</NavLink>
			{isAdmin && (
				<>

					<NavLink className="hover:text-orange-300 hover:scale-105 transition-all" to={"/administration"}>
						<h3>Administration</h3>
					</NavLink>
				</>
			)}

			{isUser && (
				<>
					<NavLink className="hover:text-orange-300 hover:scale-105 transition-all text-center" to={"/booking"}>
						<h3>Book Aktivitet</h3>
					</NavLink>
					<NavLink className="hover:text-orange-300 hover:scale-105 transition-all text-center" to={"/reservations"}>
						<h3>Se Reservationer</h3>
					</NavLink>
				</>
			)}
		</>
	);
}