import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { useUser, useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { createUserInDB } from "@/services/api.ts";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "@/components/ui/use-toast.ts";

export type UserRequest = {
	id: string,
	firstName: string,
	lastName: string
}


export default function ClerkBar() {
	const {isSignedIn, user} = useUser();
	const {getToken, userId} = useAuth();

	console.log(user);

	useEffect(() => {
		if (!isSignedIn) {
			return;
		}

		createUserInDB(
			{
				id: userId,
				firstName: user.firstName,
				lastName: user.lastName
			} as UserRequest
		).then((res: AxiosResponse) => {
			console.log(res);
			console.log("created: OK");
		}).catch((e: AxiosError) => {
			console.log(e.response?.data);
		})

	}, [userId]);

	return (
		<div>
			<SignedOut>
				<SignInButton mode={"modal"} />
			</SignedOut>
			<SignedIn>
				<UserButton />
			</SignedIn>
		</div>
	)
}