import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";



export default function ClerkBar() {
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