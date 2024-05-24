import { SignedIn, SignedOut, SignInButton, useAuth, UserButton, useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { createUserInDB } from "@/services/userApi";
import { AxiosError, AxiosResponse } from "axios";

export type UserRequest = {
	id: string;
	firstName: string;
	lastName: string;
};

export default function ClerkButtons() {
	const { isSignedIn, user } = useUser();
	const { getToken, userId } = useAuth();

	useEffect(() => {
		if (!isSignedIn) {
			return;
		}

		createUserInDB({
			id: userId,
			firstName: user.firstName,
			lastName: user.lastName,
		} as UserRequest)
			.then((res: AxiosResponse) => {
				console.log(res);
				console.log("created: OK");
			})
			.catch((e: AxiosError) => {
				console.log(e.response?.data);
			});
	}, [userId]);

	return (
		<div className="flex item">
			<SignedOut>
				<SignInButton mode={"modal"}>
					<span className="hover:text-orange-300 hover:scale-105 transition-all cursor-pointer">Log ind</span>
				</SignInButton>
			</SignedOut>
			<SignedIn>
				<UserButton />
			</SignedIn>
		</div>
	);
}

