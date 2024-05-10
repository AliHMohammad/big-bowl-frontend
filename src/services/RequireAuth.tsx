import { useAuth, useUser } from "@clerk/clerk-react";
import { ReactNode } from "react";
import { Navigate, useNavigate } from "react-router-dom";

type Props = {
	isAdmin?: boolean
	children: ReactNode
}

export default function RequireAuth({children, isAdmin = false}: Props) {
	const {isSignedIn, user} = useUser();

	if(!isSignedIn) {
		return <Navigate to={"/"} replace={true}/>

	}

	if (isAdmin) {
		if (user.organizationMemberships[0]?.role !== "org:admin") {
			return <Navigate to={"/"} replace={true}/>
		}
	}

	return children;
}