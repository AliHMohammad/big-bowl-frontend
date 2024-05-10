import { NavLink } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";


export default function NavBarLinks() {
	const {isSignedIn, user} = useUser();
	const isAdmin = isSignedIn && user?.organizationMemberships[0]?.role;
	const isUser = isSignedIn && !isAdmin;

	return (
		<>
			<NavLink to={"/"}>
				<h3>
					Hjem
				</h3>
			</NavLink>

			{isAdmin && (
				<>
					<NavLink to={"/administration"}>
						<h3>
							Administration
						</h3>
					</NavLink>
				</>
				)}

			{isUser  && (
				<>
					<NavLink to={"/booking"}>
						<h3>
							Book aktivitet
						</h3>
					</NavLink>
					<NavLink to={"/reservations"}>
						<h3>
							Se reservationer
						</h3>
					</NavLink>
				</>
			)}


		</>
	)
}