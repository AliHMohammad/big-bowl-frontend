import { ReactNode } from "react";
import NavBar from "@/components/layouts/NavBar.tsx";
import Header from "@/components/layouts/Header.tsx";

type Props = {
	children: ReactNode
}


export default function PageLayout({children}: Props) {
	return (
		<>
			<Header/>
			<NavBar/>
			<main className={"m-8"}>
				{children}
			</main>
		</>
	);
}