import { ReactNode } from "react";
import Header from "@/components/layouts/Header.tsx";

type Props = {
	children: ReactNode;
};

export default function PageLayout({ children }: Props) {
	return (
		<>
			<Header />

			<main>{children}</main>
		</>
	);
}
