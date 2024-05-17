import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { useUser, useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { createUserInDB } from "@/services/userApi";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "@/components/ui/use-toast.ts";

export type UserRequest = {
	id: string;
	firstName: string;
	lastName: string;
};

export default function ClerkButtons() {
	const { isSignedIn, user } = useUser();
	const { getToken, userId } = useAuth();


	console.log(user);

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

